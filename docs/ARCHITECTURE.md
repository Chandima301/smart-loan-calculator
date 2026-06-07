# Architecture

SmartLoanalyzer is a Next.js (App Router) loan-calculator SaaS. All financial math is pure TypeScript in `src/lib/`; the UI is client components that consume those functions. No backend/database — everything runs in the browser, state persists to `localStorage`.

> Keep this file current. When you add a folder, change the data flow, or introduce a new convention, update it in the same change.

## Stack
- **Next.js (App Router)** + **TypeScript**, **React 18**
- **Tailwind CSS v4** (`@tailwindcss/postcss`) + **class-variance-authority** for variants
- **shadcn/ui** primitives built on **`@base-ui/react`** (NOT Radix — affects Slider types, see Conventions)
- **Recharts** for charts (client-only)
- **Zustand v5** + `persist` middleware for state
- **lucide-react** icons, **jsPDF** + **jspdf-autotable** for PDF export
- **@vercel/analytics**, Google Consent Mode v2

## Folder structure (`src/`)
```
src/
├── app/                      # App Router routes (one folder per route = one page.tsx)
│   ├── page.tsx              # "/" generic loan/EMI calculator
│   ├── layout.tsx            # root layout: Consent Mode v2, Analytics, toaster
│   ├── globals.css           # Tailwind + custom CSS
│   ├── robots.ts, sitemap.ts # SEO endpoints
│   ├── icon.tsx, opengraph-image.tsx
│   ├── <calc>-calculator/    # 11 specialized calculator routes (see FEATURES.md)
│   ├── loan-calculator-sri-lanka/  # localized LKR variant
│   └── about|contact|disclaimer|privacy-policy|terms/  # info pages
│
├── components/
│   ├── ui/                   # shadcn/@base-ui primitives (slider, button, card, tabs, table, tooltip…)
│   ├── calculator/           # core calculator UI + LoanCalculatorShell (the tabbed hub)
│   ├── comparison/           # side-by-side scenario comparison (uses Zustand store)
│   ├── affordability/        # income → max loan
│   ├── pslf/                 # PSLF calculator (bespoke)
│   ├── studentRefinance/     # federal vs private refinance (bespoke)
│   ├── biweekly/             # biweekly mortgage (bespoke)
│   ├── landing/              # LoanLandingPage wrapper + GuideSection
│   ├── layout/               # Header, Footer, Breadcrumb, Logo
│   ├── legal/                # LegalPage template
│   ├── seo/                  # metadata + JSON-LD helpers
│   ├── cookies/              # consent banner
│   └── ai/                   # AiTakeBanner (AI insight cards)
│
├── lib/                      # PURE math + utilities (no React) — see UTILS.md
│   ├── loanCalculations.ts   # EMI, amortization, prepayment, restructure, affordability, goal planner
│   ├── biweeklyCalculations.ts, pslfCalculations.ts, studentRefinanceCalculations.ts
│   ├── formatters.ts, currencies.ts, constants.ts, utils.ts (cn)
│   ├── pdf/                  # loanSummaryPdf.ts, pdfFormat.ts
│   └── seo/                  # articleSchema.ts, softwareAppSchema.ts
│
├── store/                    # Zustand stores (persisted)
│   ├── loanComparisonStore.ts  # key: "loan-comparison-store"
│   └── settingsStore.ts        # key: "loan-settings" (currencyCode)
│
├── types/loan.ts             # shared interfaces (LoanParams, LoanResult, …)
├── hooks/useCurrencyFormat.ts
└── content/guides/           # per-calculator long-form guides (*.tsx, export default + `meta`)
```

## Data flow
1. A route's `page.tsx` sets `metadata` and renders either `LoanLandingPage` (standard calculators) or a bespoke component (PSLF / Student Refinance / Biweekly).
2. `LoanLandingPage` (`src/components/landing/LoanLandingPage.tsx`) renders hero → `Breadcrumb` → `LoanCalculatorShell` → `InlineRelatedCalculators` → tab cards → `GuideSection` → `RelatedCalculators` → FAQ, and emits FAQ/Article/SoftwareApplication JSON-LD.
3. `LoanCalculatorShell` (`src/components/calculator/`) holds the loan params, computes results via `src/lib/loanCalculations.ts` (memoized), and renders the 4 tabs (Calculator / Compare / Affordability / Restructure). Heavy tabs/children are lazy-loaded with `dynamic(..., { ssr: false })`.
4. **Comparison** uses `useLoanComparisonStore` (up to 3 scenarios). **Currency** is global: `useSettingsStore.currencyCode` → `useCurrencyFormat()` → `formatCurrency`. Changing currency re-renders every money display.
5. **URL params**: `LoanParamsFromUrl` reads `?principal=&annualRate=&tenureMonths=` on mount; `ShareButton` writes the current state back to a shareable URL.

## How to add a new calculator route
1. Create `src/app/<kebab-name>-calculator/page.tsx` with `export const metadata` (title, description, keywords, `alternates.canonical = ${SITE_URL}${PATH}`, openGraph).
2. For a standard loan calculator: render `<LoanLandingPage>` with `title`, `subtitle`, `intro`, `defaultParams`, `canonicalPath`, `tabs` (the 4 descriptions), `faq`, and optionally `guide`+`guideMeta`, `primaryTab`, `enabledTabs`, `tabLabels`, `prepaymentDefaultOpen`, `prepaymentDrivenResults`, `answer`. See `src/app/home-loan-calculator/page.tsx` for the canonical example.
3. For a bespoke calculator (custom inputs/outputs): build a component under `src/components/<name>/`, add math to `src/lib/<name>Calculations.ts`, and hand-roll the page like `src/app/pslf-calculator/page.tsx` (hero → Breadcrumb → your component → InlineRelated → Guide → Related → FAQ + JSON-LD).
4. Add a long-form guide at `src/content/guides/<name>.tsx` (default export + `export const meta: GuideMeta`).
5. **Register the route in `src/components/calculator/RelatedCalculators.tsx`**: add to `ALL` (label/desc/Icon), add a `RELATIONS` entry (3–4 cross-links), and add the path to the right `CATEGORIES` group. This is the single source of truth for related links, breadcrumbs, and the homepage discovery grid.
6. The route is auto-included in `sitemap.ts` only if that file enumerates it — check `src/app/sitemap.ts` and add if needed.

## Conventions
- **Routes**: kebab-case folders. **Components**: PascalCase. **lib/util files**: camelCase. **Stores**: `*Store.ts`. **Types**: lowercase (`loan.ts`).
- **Slider gotcha**: `@base-ui/react` Slider's `onValueChange` returns `number | readonly number[]`, NOT `number[]`. Normalize: `const sv = (v: number | readonly number[]) => Array.isArray(v) ? v[0] : v`.
- **Styling**: compose classes with `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge).
- **Lazy loading**: charts/tables/heavy tabs use `dynamic(() => import(...), { ssr: false })` to keep first paint fast.
- **SEO**: every calculator page emits SoftwareApplication JSON-LD (`buildSoftwareAppSchema` + `STANDARD_CALCULATOR_FEATURES`); guides emit Article JSON-LD (`buildArticleSchema`); `LoanLandingPage` also emits FAQ JSON-LD. Always set a canonical URL via `SITE_URL` from `src/lib/constants.ts`.
- **Pure math stays in `src/lib`** with no React imports, so it's unit-testable and reusable across UI + PDF.

## Build / verify
- `npm run build` — production build (must pass with zero TS errors)
- `npm run lint`
- `npm run dev` — local dev server
