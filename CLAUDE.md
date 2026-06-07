# SmartLoanalyzer — project guide for Claude

A Next.js (App Router) loan-calculator SaaS (smartloanalyzer.com). Pure TypeScript financial math in `src/lib/`, client-component UI on top, state in Zustand + `localStorage`. No backend/database. Stack: Next.js + TS, Tailwind v4, shadcn on **`@base-ui/react`**, Recharts, Zustand v5, jsPDF.

## Read before building — required workflow
Before implementing or changing a feature:
1. Read **`docs/ARCHITECTURE.md`** (folder map, data flow, "how to add a calculator route", conventions).
2. Read **`docs/FEATURES.md`** (what already exists — don't duplicate it).
3. Read **`docs/UTILS.md`** (reusable math/formatters/currencies/stores/hooks — reuse, don't reinvent).

After implementing, **update the relevant `docs/` file(s) in the same change**: new/changed feature → `FEATURES.md`; new exported helper/type/store/hook → `UTILS.md`; new folder/convention/data-flow change → `ARCHITECTURE.md`. Keeping these accurate is part of the task, not optional.

## Gotchas (cost real time if missed)
- **Slider types**: `@base-ui/react` Slider `onValueChange` returns `number | readonly number[]`, NOT `number[]`. Normalize: `const sv = (v: number | readonly number[]) => Array.isArray(v) ? v[0] : v`.
- **`calculateRestructure(schedule, params)`** takes the amortization schedule as its first argument.
- Affordability function is **`checkAffordability`** (not `calculateAffordability`).
- **Zustand persist keys** are stable contracts: `loan-comparison-store`, `loan-settings`. Don't rename without a migration.
- Heavy charts/tables/tabs are lazy-loaded with `dynamic(..., { ssr: false })` — keep them client-only.
- Money rendering: use the `useCurrencyFormat()` hook, not a hard-coded currency.
- Pure math lives in `src/lib/*` with no React imports — keep it that way.
- New calculator routes must be registered in `src/components/calculator/RelatedCalculators.tsx` (`ALL` + `RELATIONS` + `CATEGORIES`).

## Verify
- `npm run build` (must pass, zero TS errors) and `npm run lint`. `npm run dev` for local.

## Automations (`automations/`)
Two Claude Code routines, documented in `automations/README.md`:
- **Analyst** (daily): GA4 + GSC → ranked suggestions to Slack `#sla-dev`; maintains `automations/insights/` (`LOG.md`, `BACKLOG.md`, `state.json`). Read-only on app code.
- **Builder** (polls `#sla-dev`): on a `build SLA-###` confirmation, implements that backlog item into a PR — following this same read-before/update-after workflow.
Insights/backlog files under `automations/insights/` are routine-maintained; don't hand-edit unless fixing them.
