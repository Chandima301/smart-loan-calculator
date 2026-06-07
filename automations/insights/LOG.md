# Insights Log

Daily entries written by the **Analyst** routine (newest on top). Each entry records the week's signal, what shipped since the last run, the status of prior suggestions, and the ranked shortlist. Human-readable companion to `state.json` (machine state) and `BACKLOG.md` (actionable, ID'd items).

<!-- New entries are inserted directly below this line, newest first. -->

## 2026-06-07
**Signal:** Traffic down sharply — homepage `/` -85% (99 views), most pages -50% to -93%, ~64 total sessions (almost all Direct, 0 key events anywhere). Largest opportunity is uncaptured search demand: `/student-loan-calculator` 514 impressions / 0 clicks / pos 78.7. Two queries in striking distance (pos 5–11).
**Shipped since last run:** `4584a53` — insights routine infra (knowledge base + stateful Slack-triggered builder). No app features.
**Prior suggestions status:** none (first analytical run; baseline had empty shortlist).
**Shortlist:**
- SLA-001 [M] Direct Subsidized/Unsubsidized breakdown on student-loan-calculator — page 514 imp / 0 clicks / pos 78.7; "direct subsidized loan calculator" 3 imp pos 60, "direct unsubsidized loan calculator" 3 imp pos 69.
- SLA-002 [M] EMI mode/terminology on car-loan-calculator — "automobile loan emi calculator" 17 imp pos 93 + many "car emi" variants; page 86 imp / 0 clicks / pos 60.5.
- SLA-003 [S] "26 biweekly = 13 monthly payments" explainer on biweekly-mortgage-calculator — striking distance pos 11 (5 imp) & pos 8.5 (2 imp); page 87 imp / 0 clicks.
- SLA-004 [S] Refinance break-even point section on refinance-calculator — "realistic break-even point calculation refinance" pos 5.3 (4 imp); page 11 imp / pos 26.7.
- SLA-005 [M] Discretionary-income / IDR repayment plans for student loan tooling — "discretionary income calculator for student loans", "10 year standard repayment plan calculator", "consolidation of student loans calculator"; student-loan-payoff 280 imp / 0 clicks.

## 2026-06-07 (baseline)
**Signal:** Seed entry — routine not yet run. Baseline commit `5214663`.
**Shipped since last run:** n/a (baseline).
**Prior suggestions status:** none.
**Shortlist:** none yet — the first Analyst run will populate this.
