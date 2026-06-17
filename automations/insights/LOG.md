# Insights Log

Daily entries written by the **Analyst** routine (newest on top). Each entry records the week's signal, what shipped since the last run, the status of prior suggestions, and the ranked shortlist. Human-readable companion to `state.json` (machine state) and `BACKLOG.md` (actionable, ID'd items).

<!-- New entries are inserted directly below this line, newest first. -->

## 2026-06-17
**Signal:** Traffic still depressed — homepage `/` 67 views (-85%), ~45 total sessions (43 Direct + 1 Organic + 1 Referral, down from ~61). **But the first on-site conversion ever fired: 1 Key Event (homepage/Direct/desktop)** — the GA4 `trackEvent()` instrumentation shipped in `403baf2` is live and registering (every prior run was 0 key events everywhere). On search, the biggest *open* pool keeps growing: `/student-loan-payoff-calculator` 393 imp / 0 clicks / pos 71.8 (+93 imp vs last run's 300) → SLA-005 is the clearest opportunity. `/student-loan-calculator` is now the largest single pool at 580 imp but still 0 clicks / pos 79.6 — SLA-001 shipped, ranking lags (watch, not re-actioned). New promotion: `/pslf-calculator` 42 imp / pos 54.9 (improving) + the just-shipped pslf-vs-IDR guide already earning a click (1 click / 4 imp / pos 41) → promoted to SLA-007.
**Shipped since last run:** `403baf2` feat(seo) — **SLA-003** (biweekly real extra-payment support + SSR'd "26 Biweekly = 13 Monthly Payments" H2) and **SLA-004** (refinance "realistic break-even point" title/FAQ) both shipped; plus GA4 Key Events instrumentation (`src/lib/analytics.ts`) and an additive `/guides` content hub (3 comparison articles w/ JSON-LD). Also `51f2af4` (insights log 2026-06-10). No PR for the feature — committed directly to the working branch.
**Prior suggestions status:** SLA-003 → **shipped** (`403baf2`). SLA-004 → **shipped** (`403baf2`). SLA-005, SLA-002, SLA-006 carried over (demand persists/grew). New: SLA-007 (PSLF/PAYE qualification).
**Shortlist:**
- SLA-005 [M] Discretionary-income / IDR repayment plans for student-loan tooling — `/student-loan-payoff-calculator` 393 imp / 0 clicks / pos 71.8 (largest open pool, +93 imp); "discretionary income calculator" pos 61, "10 year standard repayment plan calculator" 2 imp pos 72.5, "debt payoff calculator student loan" 3 imp pos 64, "consolidate student loans estimator" pos 72, "consolidation of student loans calculator" 2 imp pos 95. *(carried)*
- SLA-002 [M] EMI mode/terminology on car-loan-calculator — page 73 imp / 0 clicks / pos 67.4; "automobile loan emi calculator" 27 imp pos 94.1 (+4) + 15+ "car/auto emi" variants ("calculate auto loan emi" 4 imp pos 80.3). Note `/auto-loan-calculator` already ranks pos 18.4 (9 imp) — the EMI intent may be better served by routing/retargeting it. *(carried)*
- SLA-007 [M] PSLF / PAYE eligibility on pslf-calculator — `/pslf-calculator` 42 imp / 0 clicks / pos 54.9 (growing, 5th-biggest pool); "does paye qualify for pslf" pos 67; the new `/guides/pslf-vs-income-driven-repayment` already earns 1 click / 4 imp / pos 41 (engaging) → demand is real and adjacent. *(new)*
- SLA-006 [M] Improve personal-loan-calculator (EMI mode + intent match) — page 33 imp / 0 clicks / pos 94.6 (worst-ranked page with demand); "calculation of personal loan" pos 98. *(carried)*

## 2026-06-10
**Signal:** Traffic still depressed & flat — homepage `/` 95 views (-86%), ~61 sessions (60 Direct + 1 Referral), 0 key events on any page (no on-site conversion signal anywhere). Bright spot: the SLA-001 page `/student-loan-calculator` is +300% views (4 views) with a 512s avg session — the shipped feature is engaging the users who land on it, though GSC SEO still lags (544 imp / 0 clicks / pos 78.9; ranking takes time to follow). Largest uncaptured search pool remains `/student-loan-payoff-calculator` (300 imp / 0 clicks / pos 70.1 → SLA-005), with the dense car-EMI query cluster (SLA-002) the most concrete repeated demand. `/pslf-calculator` (33 imp / pos 56.6, "does paye qualify for pslf" pos 67) is a watch item but overlaps existing student-loan demand — not promoted to backlog this run.
**Shipped since last run:** No app features. Only `28568e1` (insights daily log 2026-06-09) since `a5dfa8b`.
**Prior suggestions status:** SLA-001 already shipped (PR #1). SLA-002, SLA-003, SLA-004, SLA-005, SLA-006 all carried over — demand persists on every one. No new IDs created this run.
**Shortlist:**
- SLA-005 [M] Discretionary-income / IDR repayment plans for student-loan tooling — `/student-loan-payoff-calculator` 300 imp / 0 clicks / pos 70.1 (largest open pool); "discretionary income calculator" pos 61, "10 year standard repayment plan calculator" 2 imp pos 72.5, "consolidation of student loans calculator" 2 imp pos 95, "debt payoff calculator student loan" 3 imp pos 64. *(carried)*
- SLA-002 [M] EMI mode/terminology on car-loan-calculator — page 83 imp / 0 clicks / pos 63.2; "automobile loan emi calculator" 23 imp pos 93.3 + 20+ "car emi" variants. *(carried)*
- SLA-003 [S] "26 biweekly = 13 monthly payments" explainer on biweekly-mortgage-calculator — only real striking-distance: "biweekly payments 26 payments per year equals 13 monthly payments" pos 6 (1 imp); main terms lag (page 82 imp / 0 clicks / pos 80.9; "biweekly mortgage calculator with extra payments" 14 imp pos 96.5). *(carried)*
- SLA-006 [M] Improve personal-loan-calculator (EMI + intent match) — page 33 imp / 0 clicks / pos 94.7 (worst-ranked page w/ demand); "100000 emi for personal loan" pos 81, "calculation of personal loan" pos 98. *(carried)*
- SLA-004 [S] Refinance break-even point section on refinance-calculator — page 12 imp / pos 31.5 (best-positioned of the group); "calculate refinance break even point" 2 imp pos 94. *(carried)*

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
