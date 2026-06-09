# Backlog

Actionable, stable-ID suggestion list maintained by the **Analyst** routine and consumed by the **Builder** routine. To build an item, in Slack `#sla-dev` reply `build SLA-###` (or react 🔨 on its suggestion message). The Builder only acts on items with status `open`.

**Status:** `open` (proposed, not started) · `in-progress` (Builder claimed it / PR open) · `shipped` (merged — detected by the Analyst from git) · `dropped` (won't do).

| ID | Title | Why (metric) | Effort | Status | First seen | Last seen | PR |
|----|-------|--------------|--------|--------|-----------|-----------|----|
| SLA-001 | Direct Subsidized/Unsubsidized breakdown on student-loan-calculator | Page 514 imp / 0 clicks / pos 78.7; "direct subsidized loan calculator" 3 imp pos 60, "direct unsubsidized loan calculator" 3 imp pos 69 | M | shipped | 2026-06-07 | 2026-06-09 | [PR #1](https://github.com/Chandima301/smart-loan-calculator/pull/1) merged `a5dfa8b` (feat `e26208c`) |
| SLA-002 | EMI mode/terminology on car-loan-calculator | "automobile loan emi calculator" 17 imp pos 93 + 20+ "car emi" variants; page 82 imp / 0 clicks / pos 61.1 | M | open | 2026-06-07 | 2026-06-09 | |
| SLA-003 | "26 biweekly = 13 monthly payments" explainer on biweekly-mortgage-calculator | Striking distance: query pos 6 (1 imp) & pos 11.5 (2 imp); page 83 imp / 0 clicks / pos 79 | S | open | 2026-06-07 | 2026-06-09 | |
| SLA-004 | Refinance break-even point section on refinance-calculator | "calculate refinance break even point" 2 imp pos 94; page 11 imp / pos 27.1 | S | open | 2026-06-07 | 2026-06-09 | |
| SLA-005 | Discretionary-income / IDR repayment plans for student loan tooling | "discretionary income calculator" pos 61, "10 year standard repayment plan calculator" 2 imp pos 72.5, "consolidation of student loans calculator" 2 imp pos 95; student-loan-payoff 298 imp / 0 clicks / pos 70 | M | open | 2026-06-07 | 2026-06-09 | |
| SLA-006 | Improve personal-loan-calculator (EMI mode + intent match) | Page 34 imp / 0 clicks / pos 94.6 (worst-ranked page with demand); "100000 emi for personal loan" pos 81, "calculation of personal loan" pos 98 | M | open | 2026-06-09 | 2026-06-09 | |
