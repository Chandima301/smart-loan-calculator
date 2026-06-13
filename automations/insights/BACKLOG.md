# Backlog

Actionable, stable-ID suggestion list maintained by the **Analyst** routine and consumed by the **Builder** routine. To build an item, in Slack `#sla-dev` reply `build SLA-###` (or react 🔨 on its suggestion message). The Builder only acts on items with status `open`.

**Status:** `open` (proposed, not started) · `in-progress` (Builder claimed it / PR open) · `shipped` (merged — detected by the Analyst from git) · `dropped` (won't do).

| ID | Title | Why (metric) | Effort | Status | First seen | Last seen | PR |
|----|-------|--------------|--------|--------|-----------|-----------|----|
| SLA-001 | Direct Subsidized/Unsubsidized breakdown on student-loan-calculator | Page 514 imp / 0 clicks / pos 78.7; "direct subsidized loan calculator" 3 imp pos 60, "direct unsubsidized loan calculator" 3 imp pos 69 | M | shipped | 2026-06-07 | 2026-06-09 | [PR #1](https://github.com/Chandima301/smart-loan-calculator/pull/1) merged `a5dfa8b` (feat `e26208c`) |
| SLA-002 | EMI mode/terminology on auto-loan-calculator (legacy /car-loan-calculator 301→here) | Live `/auto-loan-calculator` pos 18.9 (9 imp) + legacy `/car-loan-calculator` 76 imp pos 68.4; "automobile loan emi calculator" 26 imp pos 94 + 20+ "car emi" variants | M | open | 2026-06-07 | 2026-06-13 | |
| SLA-003 | "26 biweekly = 13 monthly payments" explainer on biweekly-mortgage-calculator | Striking distance: "biweekly payments 26 payments per year equals 13 monthly payments" pos 6 (1 imp); page 82 imp / 0 clicks / pos 80.9; "biweekly mortgage calculator with extra payments" 14 imp pos 96.5 | S | shipped | 2026-06-07 | 2026-06-13 | `403baf2` (SSR "26 Biweekly = 13 Monthly" H2 + extra-per-payment support) |
| SLA-004 | Refinance break-even point section on refinance-calculator | "calculate refinance break even point" 2 imp pos 94; page 12 imp / pos 31.5 | S | shipped | 2026-06-07 | 2026-06-13 | `403baf2` ("realistic break-even point" title/answer/FAQ) |
| SLA-005 | Discretionary-income / IDR repayment plans for student loan tooling | "discretionary income calculator" pos 61, "calculate student loan payoff" 4 imp pos 67.8, "debt payoff calculator student loan" 3 imp pos 64; student-loan-payoff 324 imp / 0 clicks / pos 71.1 | M | open | 2026-06-07 | 2026-06-13 | |
| SLA-006 | Improve personal-loan-calculator (EMI mode + intent match) | Page 33 imp / 0 clicks / pos 94.7 (worst-ranked page with demand); "100000 emi for personal loan" pos 81, "calculation of personal loan" pos 98 | M | open | 2026-06-09 | 2026-06-13 | |
