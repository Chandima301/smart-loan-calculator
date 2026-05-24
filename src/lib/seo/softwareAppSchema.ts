export interface SoftwareAppSchemaInput {
  /** Display name of the calculator. */
  name: string;
  /** Absolute canonical URL of the calculator page. */
  url: string;
  /** Plain-English description, 1-2 sentences. */
  description: string;
  /**
   * List of capabilities. Helps LLM-based search and answer engines
   * understand what the tool actually does and surface it for "best X
   * calculator" / "free X calculator" queries.
   */
  featureList: string[];
}

/**
 * Build a `SoftwareApplication` JSON-LD object for a calculator page.
 * `SoftwareApplication` is the schema.org type LLM answer engines look
 * for when ranking "free tool" / "best calculator" results — it carries
 * featureList, operatingSystem, offers (free) and category/sub-category
 * signals that the generic `WebApplication` type does not communicate
 * as cleanly.
 */
export function buildSoftwareAppSchema(input: SoftwareAppSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    url: input.url,
    description: input.description,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Loan Calculator',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: input.featureList,
    isAccessibleForFree: true,
  };
}

/** Default feature list for the standard LoanCalculatorShell-based pages. */
export const STANDARD_CALCULATOR_FEATURES = [
  'Monthly payment (EMI) calculation',
  'Full month-by-month amortization schedule',
  'Prepayment simulator (extra monthly and lump sum)',
  'Side-by-side comparison of up to 3 loan scenarios',
  'Income-based affordability checker',
  'Refinance / restructure analyzer with break-even month',
  'Multi-currency support (17+ currencies)',
  'Downloadable PDF summary with full amortization',
  'AI Insights with plain-English narrative',
  'Smart Scenarios — one-tap what-ifs',
  'Goal Planner (work backward from a payoff date)',
  'Mobile-first, no signup, all math runs in the browser',
];
