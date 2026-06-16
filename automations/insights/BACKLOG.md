# Backlog

Actionable, stable-ID suggestion list maintained by the **Analyst** routine and consumed by the **Builder** routine. To build an item, in Slack `#sla-dev` reply `build SLA-###` (or react 🔨 on its suggestion message). The Builder only acts on items with status `open`.

**Status:** `open` (proposed, not started) · `in-progress` (Builder claimed it / PR open) · `shipped` (merged — detected by the Analyst from git) · `dropped` (won't do).

| ID | Title | Why (metric) | Effort | Status | First seen | Last seen | PR |
|----|-------|--------------|--------|--------|-----------|-----------|----|
| SLA-001 | Direct Subsidized/Unsubsidized breakdown on student-loan-calculator | Page 514 imp / 0 clicks / pos 78.7; "direct subsidized loan calculator" 3 imp pos 60, "direct unsubsidized loan calculator" 3 imp pos 69 | M | shipped | 2026-06-07 | 2026-06-09 | [PR #1](https://github.com/Chandima301/smart-loan-calculator/pull/1) merged `a5dfa8b` (feat `e26208c`) |
| SLA-002 | EMI mode/terminology on car-loan-calculator | "automobile loan emi calculator" 27 imp pos 94.1 + 15+ "car/auto emi" variants; page 74 imp / 0 clicks / pos 67.6 | M | open | 2026-06-07 | 2026-06-16 | |
| SLA-003 | "26 biweekly = 13 monthly payments" explainer on biweekly-mortgage-calculator | Striking distance: "biweekly payments 26 payments per year equals 13 monthly payments" pos 6 (1 imp); page 82 imp / 0 clicks / pos 80.9; "biweekly mortgage calculator with extra payments" 14 imp pos 96.5 | S | shipped | 2026-06-07 | 2026-06-16 | commit `403baf2` (real extra-payment support + SSR'd "26 Biweekly = 13 Monthly" H2) |
| SLA-004 | Refinance break-even point section on refinance-calculator | "calculate refinance break even point" 2 imp pos 94; page 12 imp / pos 31.5 | S | shipped | 2026-06-07 | 2026-06-16 | commit `403baf2` ("realistic break-even point" title/answer/FAQ) |
| SLA-005 | Discretionary-income / IDR repayment plans for student loan tooling | "calculate student loan payoff" 5 imp pos 66.6, "debt payoff calculator student loan" 3 imp pos 64, "discretionary income calculator" pos 61, "10 year standard repayment plan calculator" 2 imp pos 72.5; student-loan-payoff 380 imp / 0 clicks / pos 72.1 | M | open | 2026-06-07 | 2026-06-16 | |
| SLA-006 | Improve personal-loan-calculator (EMI mode + intent match) | Page 34 imp / 0 clicks / pos 95.1 (worst-ranked page with demand); "calculation of personal loan" pos 98 | M | open | 2026-06-09 | 2026-06-16 | |
| SLA-007 | PSLF qualification/forgiveness clarity on pslf-calculator | Page 41 imp / 0 clicks / pos 56 (best-ranked high-imp page w/ unmet demand, +24% imp); "does paye qualify for pslf" pos 67; new pslf-vs-IDR guide already converting (1 click / 4 imp / 25% CTR / pos 41) | M | open | 2026-06-16 | 2026-06-16 | |
