# Utilities & reusable code

**Reuse these — do not reimplement.** Before writing new math, formatting, currency, state, or SEO code, check here first. Update this file when you add or change an exported helper, type, store, or hook.

## Core loan math — `src/lib/loanCalculations.ts`
Pure functions, no React. Types are in `src/types/loan.ts`.
- `calculateEMI(params: LoanParams): LoanResult` — monthly payment, totalRepayment, totalInterest, effectiveRate (monthly rate). Handles 0% rate.
- `generateAmortizationSchedule(params: LoanParams): AmortizationRow[]` — month-by-month opening/closing balance, principal/interest split, cumulative interest.
- `simulatePrepayment(params: PrepaymentParams): PrepaymentResult` — extra monthly + lump-sum; returns new tenure, interest saved, months saved, full schedule.
- `calculateRestructure(schedule: AmortizationRow[], params: RestructureParams): RestructureResult` — **takes the current amortization schedule as the first arg**; computes remaining balance, surcharge, new-loan EMI/interest, net saving, break-even month, `isWorthIt`.
- `checkAffordability(params: AffordabilityParams): AffordabilityResult` — income → maxEMI & maxLoanAmount (default `emiToIncomeRatio` 0.40). **Note the name is `checkAffordability`.**
- `suggestedExtraPayment(emi: number): number` — sensible default extra-payment (~10% of EMI, rounded, capped). Used by Insights/Prepayment/Smart Scenarios for consistency.
- `planForPayoffTarget(params: LoanParams, targetMonths: number): PayoffTargetPlan` — goal planner: solves the monthly payment to clear the loan by a deadline; returns `requiredMonthlyPayment`, `extraVsCurrent`, `feasible`.

## Specialized math
- `src/lib/biweeklyCalculations.ts` — `calculateBiweekly(params: BiweeklyParams): BiweeklyResult` (interest/years saved vs monthly; payoff dates).
- `src/lib/pslfCalculations.ts` — `calculatePslf(params: PslfParams): PslfResult`; exports `StateGroup` (`'contiguous' | 'alaska' | 'hawaii'`). IDR = 10% discretionary income; 2024 HHS poverty guidelines baked in.
- `src/lib/studentRefinanceCalculations.ts` — `calculateStudentRefinance(params: StudentRefinanceParams): StudentRefinanceResult` (federal vs private, fee rolled into private principal).

## Formatting — `src/lib/formatters.ts`
- `formatCurrency(value, currencyCode = 'USD')` — `Intl.NumberFormat` currency, 0 decimals, rounded; falls back to en-US on bad code.
- `formatNumber(value)` — grouped integer.
- `formatPercent(value)` — `"7.50%"` (2 dp).
- `formatMonths(months)` — `"20 yr 3 mo"`.
- For currency bound to the user's selection in a component, prefer the hook `useCurrencyFormat()` (below) over calling `formatCurrency` with a hard-coded code.

## Currencies — `src/lib/currencies.ts`
- `CURRENCIES: Currency[]` — 16 entries `{ code, name, symbol }` (USD, EUR, GBP, CAD, AUD, NZD, CHF, JPY, SGD, AED, INR, MYR, PKR, BDT, ZAR, LKR).
- `DEFAULT_CURRENCY = 'USD'`. `Currency` interface exported.

## Constants — `src/lib/constants.ts`
- `LOAN_DEFAULTS` `{ principal: 100_000, annualRate: 7.5, tenureMonths: 240 }`.
- `LOAN_LIMITS` — min/max/step for `principal`, `annualRate`, `tenureMonths`, `extraPayment`, `lumpSum`, `monthlyIncome` (use these for slider/input bounds).
- `EMI_TO_INCOME_RATIO = 0.40`, `MAX_SCENARIOS = 3`.
- `SITE_URL` — `process.env.NEXT_PUBLIC_SITE_URL` (fallback to the Vercel URL). Use for all canonical/OG URLs.

## Styling — `src/lib/utils.ts`
- `cn(...inputs)` — clsx + tailwind-merge classname composer.

## PDF & SEO
- `src/lib/pdf/loanSummaryPdf.ts` — builds the amortization PDF (jsPDF + autotable); `pdfFormat.ts` has PDF money/month helpers.
- `src/lib/seo/softwareAppSchema.ts` — `buildSoftwareAppSchema({ name, url, description, featureList })` + `STANDARD_CALCULATOR_FEATURES`.
- `src/lib/seo/articleSchema.ts` — `buildArticleSchema({ headline, description, url, datePublished, dateModified })`.

## Types — `src/types/loan.ts`
`LoanParams`, `LoanResult`, `AmortizationRow`, `PrepaymentParams`, `PrepaymentResult`, `LoanScenario`, `AffordabilityParams`, `AffordabilityResult`, `RestructureParams`, `RestructureResult`. (Specialized calculators define their own param/result types alongside their lib file.)

## State — `src/store/`
- `useLoanComparisonStore` (persist key **`loan-comparison-store`**) — `scenarios: LoanScenario[]` (defaults to 2, max 3) + `addScenario`, `updateScenario`, `updateLabel`, `removeScenario`, `clearAll`. Results are recomputed via `calculateEMI` on every mutation.
- `useSettingsStore` (persist key **`loan-settings`**) — `currencyCode` + `setCurrencyCode`; defaults to `DEFAULT_CURRENCY`.

## Hooks — `src/hooks/`
- `useCurrencyFormat()` — returns a memoized `(value:number)=>string` bound to the current `currencyCode`. Use this in components for all money rendering.
