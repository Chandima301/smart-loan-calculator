export const LOAN_DEFAULTS = {
  principal: 1_000_000,
  annualRate: 12,
  tenureMonths: 60,
};

export const LOAN_LIMITS = {
  principal: { min: 10_000, max: 100_000_000, step: 10_000 },
  annualRate: { min: 0.1, max: 36, step: 0.1 },
  tenureMonths: { min: 6, max: 360, step: 6 },
  extraPayment: { min: 0, max: 500_000, step: 1_000 },
  lumpSum: { min: 0, max: 50_000_000, step: 50_000 },
  monthlyIncome: { min: 10_000, max: 5_000_000, step: 5_000 },
};

export const EMI_TO_INCOME_RATIO = 0.40;
export const MAX_SCENARIOS = 3;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smart-loan-calculator-zeta.vercel.app';
