# Features (currently implemented)

The source of truth for what the app does today. **Update this file whenever you ship, change, or remove a feature** — the daily insights routine and any feature work read it first to avoid duplicating existing functionality.

## Calculator routes
Registry of record: `src/components/calculator/RelatedCalculators.tsx` (`ALL` / `RELATIONS` / `CATEGORIES`).

| Route | What it does | Page type |
|---|---|---|
| `/` | Generic loan / EMI calculator (all 4 tabs) | `LoanLandingPage` |
| `/home-loan-calculator` | Home/housing loan EMI + amortization | `LoanLandingPage` |
| `/mortgage-calculator` | 15- vs 30-year fixed mortgage | `LoanLandingPage` |
| `/biweekly-mortgage-calculator` | Biweekly (26 pmts/yr) payoff accelerator | bespoke (`BiweeklyMortgageCalculator`) |
| `/personal-loan-calculator` | Unsecured personal loan | `LoanLandingPage` |
| `/auto-loan-calculator` | Auto/car loan APR + interest | `LoanLandingPage` |
| `/student-loan-calculator` | Federal student loan repayment | `LoanLandingPage` |
| `/student-loan-payoff-calculator` | Extra-payment payoff focus | `LoanLandingPage` |
| `/student-loan-refinance-calculator` | Federal vs private refinance + forfeiture warning | bespoke (`StudentRefinanceCalculator`) |
| `/pslf-calculator` | Public Service Loan Forgiveness estimate | bespoke (`PslfCalculator`) |
| `/refinance-calculator` | Refinance break-even & savings | `LoanLandingPage` (restructure-led) |
| `/loan-calculator-sri-lanka` | Localized LKR variant | `LoanLandingPage` (not in the registry) |

Info pages: `/about`, `/contact`, `/disclaimer`, `/privacy-policy`, `/terms` (via `LegalPage`).

> Per-page tab configuration (`enabledTabs`, `primaryTab`, `tabLabels`, `prepaymentDefaultOpen`, `prepaymentDrivenResults`) is set through `LoanLandingPage` props in each `page.tsx` — check the page before assuming which tabs are active.

## Core calculator features (the 4 tabs in `LoanCalculatorShell`)
- **Calculator** — EMI / monthly payment, total interest, total repayment; amortization table (`AmortizationTable`); charts (`BalanceChart`, `LoanPieChart`); rate sensitivity (`RateSensitivity`); prepayment simulator (`PrepaymentSimulator`); goal planner (`GoalPlannerModal`).
- **Compare** — up to 3 scenarios side-by-side (`ComparisonPanel`, `ComparisonChart`, `ScenarioCard`), backed by `useLoanComparisonStore`.
- **Affordability** — income → max loan via `checkAffordability` (`AffordabilityChecker`).
- **Restructure** — refinance/restructure break-even via `calculateRestructure` (`LoanRestructure`).

## Cross-cutting features
- **Prepayment simulator** — extra monthly + lump-sum → new payoff date, interest saved, months saved.
- **Rate sensitivity** — vary the rate to see EMI / total-interest impact.
- **Goal planner** — reverse-solve the monthly payment needed to hit a payoff deadline (`planForPayoffTarget`).
- **PDF export** — amortization schedule + summary as PDF (`DownloadPdfButton`, `src/lib/pdf/`).
- **Share by URL** — `ShareButton` encodes state into `?principal=&annualRate=&tenureMonths=`; `LoanParamsFromUrl` restores it.
- **AI insight banners** — `LoanInsights`, `SmartScenarios`, and a compare verdict, rendered via `AiTakeBanner`.
- **Multi-currency** — 16 currencies (`src/lib/currencies.ts`), global selector in `Header`, `Intl.NumberFormat` formatting.
- **Navigation/SEO** — category breadcrumbs, related-calculator cross-links, per-page long-form guides (`src/content/guides/`), JSON-LD (FAQ / Article / SoftwareApplication).

## Page-specific sections
- **Direct Subsidized vs Unsubsidized breakdown** — on `/student-loan-calculator`, an interactive section (`DirectLoanBreakdown`) below the calculator that shows how in-school interest accrues differently on the two federal Direct Loan types: subsidized (govt pays the in-school interest, nothing capitalizes) vs unsubsidized (interest accrues from disbursement and capitalizes at repayment). Reports each plan's monthly payment, balance at repayment, total interest/cost, and the extra lifetime interest + higher monthly payment of going unsubsidized. Math: `calculateDirectLoanBreakdown` (`src/lib/studentLoanCalculations.ts`). Rendered via the new `LoanLandingPage` `extraSection` prop (SSR'd for crawlability).

## Specialized math (bespoke calculators)
- **Biweekly mortgage** (`calculateBiweekly`) — 26 payments/yr ≈ 13 monthly equivalents; reports interest & years saved vs monthly.
- **PSLF** (`calculatePslf`) — IDR payment ≈ 10% of discretionary income (AGI − 1.5 × Federal Poverty Guideline), projects balance to payment 120, reports tax-free amount forgiven and net benefit vs standard 10-year.
- **Student loan refinance** (`calculateStudentRefinance`) — federal-kept vs private-refinanced amortization comparison; flags lifetime-interest delta (forfeited federal protections surfaced qualitatively in the UI).
