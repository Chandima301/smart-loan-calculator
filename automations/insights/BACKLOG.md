# Backlog

Actionable, stable-ID suggestion list maintained by the **Analyst** routine and consumed by the **Builder** routine. To build an item, in Slack `#sla-dev` reply `build SLA-###` (or react 🔨 on its suggestion message). The Builder only acts on items with status `open`.

**Status:** `open` (proposed, not started) · `in-progress` (Builder claimed it / PR open) · `shipped` (merged — detected by the Analyst from git) · `dropped` (won't do).

| ID | Title | Why (metric) | Effort | Status | First seen | Last seen | PR |
|----|-------|--------------|--------|--------|-----------|-----------|----|
| SLA-001 | Direct Subsidized/Unsubsidized breakdown on student-loan-calculator | Page 514 imp / 0 clicks / pos 78.7; "direct subsidized loan calculator" 3 imp pos 60, "direct unsubsidized loan calculator" 3 imp pos 69 | M | shipped | 2026-06-07 | 2026-06-09 | [PR #1](https://github.com/Chandima301/smart-loan-calculator/pull/1) merged `a5dfa8b` (feat `e26208c`) |
| SLA-002 | EMI mode/terminology on car-loan-calculator | "automobile loan emi calculator" 27 imp pos 93 + 20+ "car emi" variants ("car loan emi calculator" 2 imp pos 63); page 83 imp / 0 clicks / pos 65.5 | M | open | 2026-06-07 | 2026-06-11 | |
| SLA-003 | "26 biweekly = 13 monthly payments" explainer on biweekly-mortgage-calculator | Striking distance: "biweekly payments 26 payments per year equals 13 monthly payments" pos 6 (1 imp); page 82 imp / 0 clicks / pos 80.9; "biweekly mortgage calculator with extra payments" 14 imp pos 96.5 | S | shipped | 2026-06-07 | 2026-06-11 | `403baf2` (SSR "26=13" H2 + extraPerPayment support) |
| SLA-004 | Refinance break-even point section on refinance-calculator | "calculate refinance break even point" 2 imp pos 94; page 12 imp / pos 31.5 | S | shipped | 2026-06-07 | 2026-06-11 | `403baf2` ("realistic break-even point" title/answer/FAQ) |
| SLA-005 | Discretionary-income / IDR repayment plans for student loan tooling | "discretionary income calculator" pos 61, "calculate student loan payoff" 4 imp pos 67.8, "debt payoff calculator student loan" 3 imp pos 64, "consolidation of student loans calculator" 2 imp pos 95; student-loan-payoff 303 imp / 0 clicks / pos 70.4 | M | open | 2026-06-07 | 2026-06-11 | |
| SLA-006 | Improve personal-loan-calculator (EMI mode + intent match) | Page 33 imp / 0 clicks / pos 94.7 (worst-ranked page with demand); "100000 emi for personal loan" pos 81, "calculation of personal loan" pos 98 | M | open | 2026-06-09 | 2026-06-11 | |
| SLA-007 | PSLF/IDR eligibility + forgiveness-countdown clarity on pslf-calculator | Page 33 imp / pos 56.6 (best-positioned student-cluster page w/ demand; pslf-vs-IDR guide now funnels here); "does paye qualify for pslf" pos 67 | M | open | 2026-06-11 | 2026-06-11 | |
| SLA-008 | EMI mode/terminology on home-loan-calculator (mirror of SLA-002) | Page 15 imp / pos 62.3; "calculate emi for home loan" pos 87, "calculation of home loan" 2 imp pos 88.5 | S | open | 2026-06-11 | 2026-06-11 | |
