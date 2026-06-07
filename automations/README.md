# SmartLoanalyzer — daily GA + GSC insights routine (OAuth auth)

A daily Claude Code cloud routine that pulls Google Analytics 4 + Search Console data,
turns it into ranked feature/UX suggestions, and posts them to your dev Slack channel.
Analysis only — it never changes the app.

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
  ROUTINE_PROMPT.md    # paste this into the routine
  out/                 # generated each run (gitignore it)
```

This `automations/` folder lives in your SmartLoanalyzer repo and is committed.
Add `automations/out/`, `automations/oauth-client.json`, and `automations/.env` to `.gitignore`.

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

## Create the routine (claude.ai/code/routines -> New routine)

- **Repository**: your SmartLoanalyzer repo.
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
- **Connectors**: Slack (set the channel name in ROUTINE_PROMPT.md).
- **Prompt**: paste ROUTINE_PROMPT.md (replace `#CHANGE-ME-dev`).
- **Trigger**: Scheduled -> Daily -> pick a time (e.g. 08:00).

## First run

Click **Run now**, watch the session: it should `npm install`, run both fetch scripts,
write the two JSON files, then post the shortlist to your dev channel.

## Local test before the routine

```
cd automation && npm install
export GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... GOOGLE_REFRESH_TOKEN=...
export GA4_PROPERTY_ID=... GSC_SITE_URL=...
npm run fetch:ga && npm run fetch:gsc
```
Open out/ga.json and out/gsc.json and confirm real data.

## Notes

- `oauth-client.json` and the refresh token are secrets — never commit them.
- `npm install` runs each session; move it to the routine setup script to speed runs up.
  (The routine doesn't need the dev dependency, only `googleapis`.)
- GSC data lags ~2 days; the script accounts for that.
