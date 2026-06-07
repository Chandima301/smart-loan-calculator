# SmartLoanalyzer — GA + GSC insights + feature builder routines

Two Claude Code cloud routines that turn analytics into shipped features:

- **Analyst** (daily): pulls Google Analytics 4 + Search Console data, produces a ranked,
  ID'd feature/UX shortlist, posts it to Slack `#sla-dev`, and maintains a durable log +
  backlog under `automations/insights/`. **Read-only on app code** (only writes `insights/`).
- **Builder** (polls `#sla-dev` ~every 15 min): when you confirm an item with `build SLA-###`
  (or a 🔨 reaction), it implements that backlog item on a branch and opens a **PR** for review.
  It never merges — you do.

The two share `automations/insights/BACKLOG.md` (stable IDs + status), which is how a Slack
confirmation maps to a specific build, and how shipped items get marked (the Analyst detects
the merge commit). End-to-end loop: Analyst suggests `SLA-007` → you reply `build SLA-007`
→ Builder opens a PR → you merge → next Analyst run marks `SLA-007` shipped.

Auth note: this uses **OAuth as your own Google account** instead of a service account,
to sidestep Google's April-2026 bug that blocks adding new service accounts to GA4/GSC.
Your account already has access to both, so there is no "add user" step at all.

## Layout

```
automations/
  package.json
  generate-token.mjs   # ONE-TIME, run locally to mint a refresh token
  fetch-ga.mjs         # GA4 Data API  -> out/ga.json
  fetch-gsc.mjs        # Search Console API -> out/gsc.json
  ROUTINE_PROMPT.md    # paste into the ANALYST routine
  BUILDER_PROMPT.md    # paste into the BUILDER routine
  insights/            # committed, routine-maintained state:
    LOG.md             #   daily human-readable log (newest on top)
    BACKLOG.md         #   stable-ID suggestion list + status (the build queue)
    state.json         #   machine state: lastRunDate, lastCommitSha, nextId, lastShortlist
  out/                 # generated each run (gitignored)
```

This `automations/` folder lives in your SmartLoanalyzer repo and is committed — **including
`insights/`** (the routines read/update it across runs). Only `automations/out/`,
`automations/oauth-client.json`, and `automations/.env` are gitignored.

## One-time Google setup (you do this)

1. In Google Cloud, on the project, enable **Google Analytics Data API** and **Search Console API**.
2. Configure the **OAuth consent screen** (APIs & Services -> OAuth consent screen):
   - User type: **Internal** if this is a Google Workspace account (simplest, no warnings),
     otherwise **External**.
   - Fill app name + support email.
   - IMPORTANT: set publishing status to **In production**. If you leave it in "Testing",
     the refresh token expires after 7 days and the routine breaks weekly. For External +
     sensitive scopes you'll see an "unverified app" screen during consent — since it's your
     own account, click through it (Advanced -> Go to app).
3. Create an **OAuth client ID** (APIs & Services -> Credentials -> Create credentials ->
   OAuth client ID), type **Desktop app**. Download the JSON, save it next to the scripts
   as `oauth-client.json`.
4. Mint the refresh token locally:
   ```
   cd automations
   npm install
   npm run token        # opens a browser; sign in with the account that has GA4 + GSC access
   ```
   It prints `GOOGLE_REFRESH_TOKEN=...`. Note your `client_id` and `client_secret` too
   (they're inside oauth-client.json).
5. Note your **GA4 numeric property ID** (Admin -> Property details) and your
   **GSC site URL**. This site is verified as a **domain property**, so use
   `sc-domain:smartloanalyzer.com` (not the `https://` URL-prefix form — that property
   doesn't exist and returns 403). Confirm with `sites.list()` if unsure.

## Routine 1 — Analyst (claude.ai/code/routines -> New routine)

- **Repository**: your SmartLoanalyzer repo (`Chandima301/smart-loan-calculator`).
- **Prompt**: paste `ROUTINE_PROMPT.md`.
- **Trigger**: Scheduled -> Daily -> pick a time (e.g. 08:07).
- **Environment variables / secrets** (5):
  - `GOOGLE_CLIENT_ID`     = from oauth-client.json
  - `GOOGLE_CLIENT_SECRET` = from oauth-client.json
  - `GOOGLE_REFRESH_TOKEN` = from `npm run token`
  - `GA4_PROPERTY_ID`      = e.g. 123456789
  - `GSC_SITE_URL`         = sc-domain:smartloanalyzer.com  (domain property)
- **Network access (outbound allowlist)**:
  - analyticsdata.googleapis.com
  - searchconsole.googleapis.com
  - oauth2.googleapis.com
  - www.googleapis.com
  - registry.npmjs.org
  - **github.com**  (the Analyst commits its log/backlog to main)
- **Connectors**: Slack (posts to `#sla-dev`).
- **GitHub**: the Claude GitHub App must allow **push** to the repo (Analyst pushes to `main`).
  If push is blocked, it can fall back to opening a PR for the `insights/` change.

## Routine 2 — Builder (claude.ai/code/routines -> New routine)

- **Repository**: same repo.
- **Prompt**: paste `BUILDER_PROMPT.md`.
- **Trigger**: Scheduled -> every ~15 min (off-minute, e.g. `*/15`). Cheap when idle — it exits
  immediately if there's no `open` confirmation.
- **Secrets**: none of the GA/GSC ones.
- **Network access (outbound allowlist)**:
  - registry.npmjs.org  (installs + builds the Next.js app)
  - github.com           (pushes branches, opens PRs)
- **Connectors**: Slack (reads `#sla-dev` for `build SLA-###` / 🔨, posts PR links).
- **GitHub**: the Claude GitHub App must allow **push + pull request** on the repo.

Both routines need the Slack connector's bot to be a **member of `#sla-dev`** (`/invite` it).

## First run

- **Analyst**: click **Run now** — it should `npm install`, run both fetch scripts, post the
  shortlist (with `SLA-###` IDs) to `#sla-dev`, and commit an `insights/` update to `main`.
- **Builder**: reply `build SLA-###` on an `open` item in `#sla-dev`, then **Run now** (or wait
  for the next poll) — it should ack in-thread, open a PR, and reply the PR link.

## Local test before the routines

PowerShell (bash `export` is ignored on Windows). Put the 5 secrets in a gitignored
`automations/.env` and run:
```
cd automations
npm install
node --env-file=.env fetch-ga.mjs
node --env-file=.env fetch-gsc.mjs
```
Open `out/ga.json` and `out/gsc.json` and confirm real data. (Don't bake `--env-file` into the
npm scripts — the cloud routine supplies its own secrets and runs plain `node fetch-ga.mjs`.)

## Notes

- `oauth-client.json` and the refresh token are secrets — never commit them.
- `npm install` runs each session; move it to the routine setup script to speed runs up.
  (The routine doesn't need the dev dependency, only `googleapis`.)
- GSC data lags ~2 days; the script accounts for that.
