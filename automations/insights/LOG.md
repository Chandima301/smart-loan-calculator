# Insights Log

Daily entries written by the **Analyst** routine (newest on top). Each entry records the week's signal, what shipped since the last run, the status of prior suggestions, and the ranked shortlist. Human-readable companion to `state.json` (machine state) and `BACKLOG.md` (actionable, ID'd items).

<!-- New entries are inserted directly below this line, newest first. -->

## 2026-06-09
**Signal:** Traffic still depressed & flat — homepage `/` 103 views (-84%), ~65 total sessions (64 Direct + 1 Referral), 0 key events on any page. No on-site conversion signal anywhere. With SLA-001 shipped, the largest uncaptured search pool is now `/student-loan-payoff-calculator` — 298 impressions / 0 clicks / pos 70 — pointing at discretionary-income/IDR demand (SLA-005). Only true striking-distance queries are the biweekly "26=13 payments" pair (pos 6 & 11.5).
**Shipped since last run:** PR #1 merged (`a5dfa8b`) — SLA-001 Direct Subsidized/Unsubsidized breakdown on `/student-loan-calculator` (`e26208c` feat + `ff20f89` restyle). No other app features.
**Prior suggestions status:** SLA-001 → **shipped** (PR #1). SLA-002, SLA-003, SLA-004, SLA-005 carried over (still open, demand persists). New: SLA-006.
**Shortlist:**
- SLA-005 [M] Discretionary-income / IDR repayment plans for student-loan tooling — `/student-loan-payoff-calculator` 298 imp / 0 clicks / pos 70 (largest open pool); "discretionary income calculator" pos 61, "10 year standard repayment plan calculator" 2 imp pos 72.5, "consolidation of student loans calculator" 2 imp pos 95, "debt payoff calculator student loan" 3 imp pos 64. *(carried)*
- SLA-002 [M] EMI mode/terminology on car-loan-calculator — page 82 imp / 0 clicks / pos 61.1; "automobile loan emi calculator" 17 imp pos 93 + 20+ "car emi" variants. *(carried)*
- SLA-003 [S] "26 biweekly = 13 monthly payments" explainer on biweekly-mortgage-calculator — only real striking-distance: pos 6 (1 imp) & pos 11.5 (2 imp); main terms lag (page 83 imp / 0 clicks / pos 79; "biweekly mortgage calculator with extra payments" 13 imp pos 96). *(carried)*
- SLA-006 [M] Improve personal-loan-calculator (EMI + intent match) — page 34 imp / 0 clicks / pos 94.6 (worst-ranked page w/ demand); "100000 emi for personal loan" pos 81, "calculation of personal loan" pos 98. *(new)*
- SLA-004 [S] Refinance break-even point section on refinance-calculator — page 11 imp / pos 27.1; "calculate refinance break even point" 2 imp pos 94. *(carried)*

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
