/**
 * Public Service Loan Forgiveness (PSLF) estimator math.
 *
 * PSLF forgives the remaining federal Direct Loan balance — tax-free —
 * after 120 qualifying monthly payments made under an income-driven
 * repayment (IDR) plan while working full-time for a qualifying employer.
 *
 * The financial value of PSLF comes from the IDR payment being capped at
 * a share of *discretionary income* rather than the amount needed to
 * amortize the loan. This module estimates that IDR payment, projects the
 * balance forward to the forgiveness point, and reports the tax-free
 * amount forgiven plus the net benefit versus a standard 10-year payoff.
 *
 * IMPORTANT — this is an evergreen approximation, not a definitive
 * Department of Education calculation:
 *  - Uses the common IDR formula: payment = 10% of discretionary income,
 *    where discretionary income = AGI − 1.5 × Federal Poverty Guideline.
 *    (PAYE / IBR-2014 style. SAVE and other plans use different
 *    percentages and have been in legal flux; 10% is the most
 *    defensible stable baseline.)
 *  - Federal Poverty Guidelines below are the 2024 HHS figures used for
 *    2024–2025 IDR calculations. They are updated annually; treat the
 *    output as an estimate.
 */

export type StateGroup = 'contiguous' | 'alaska' | 'hawaii';

export interface PslfParams {
  /** Federal Direct Loan balance. */
  balance: number;
  /** Annual interest rate, percent (e.g. 6.5). */
  annualRate: number;
  /** Adjusted Gross Income (annual). */
  agi: number;
  /** Household / family size (>= 1). */
  familySize: number;
  /** Poverty-guideline region. */
  stateGroup: StateGroup;
  /** Qualifying payments already made toward the 120 (0–119). */
  paymentsAlreadyMade: number;
  /** Assumed annual income growth, percent (e.g. 3). */
  incomeGrowthPct: number;
}

export interface PslfResult {
  /** Estimated IDR monthly payment in year 1. */
  initialMonthlyPayment: number;
  /** Estimated IDR monthly payment in the final year before forgiveness. */
  finalMonthlyPayment: number;
  /** Discretionary income used for the year-1 payment. */
  discretionaryIncome: number;
  /** Remaining qualifying payments until forgiveness (120 − already made). */
  monthsToForgiveness: number;
  /** Total the borrower pays across the remaining qualifying period. */
  totalPaidUnderPslf: number;
  /** Tax-free balance forgiven at payment 120. */
  forgivenAmount: number;
  /** Standard 10-year (120-payment) amortizing payment for the same balance. */
  standardMonthlyPayment: number;
  /** Total paid if the loan were simply repaid on the standard 10-year plan. */
  standardTotalPaid: number;
  /** Net PSLF benefit = standard total − PSLF total paid. */
  pslfBenefit: number;
  /**
   * True when the IDR payment is large enough that the loan is fully
   * repaid before 120 payments — in which case PSLF provides no benefit.
   */
  paidOffBeforeForgiveness: boolean;
}

/** 2024 HHS Federal Poverty Guidelines (annual USD). */
const FPG: Record<StateGroup, { base: number; perPerson: number }> = {
  contiguous: { base: 15_060, perPerson: 5_380 },
  alaska: { base: 18_810, perPerson: 6_730 },
  hawaii: { base: 17_310, perPerson: 6_190 },
};

function povertyGuideline(familySize: number, group: StateGroup): number {
  const { base, perPerson } = FPG[group];
  const size = Math.max(1, Math.floor(familySize));
  return base + (size - 1) * perPerson;
}

/** Standard amortization payment: M = P·r·(1+r)^n / ((1+r)^n − 1). */
function amortizingPayment(p: number, monthlyRate: number, n: number): number {
  if (monthlyRate === 0) return p / n;
  const x = Math.pow(1 + monthlyRate, n);
  return (p * monthlyRate * x) / (x - 1);
}

/** IDR monthly payment from income: 10% of discretionary income / 12. */
function idrMonthlyPayment(
  agi: number,
  familySize: number,
  group: StateGroup,
): number {
  const discretionary = Math.max(0, agi - 1.5 * povertyGuideline(familySize, group));
  return (0.1 * discretionary) / 12;
}

export function calculatePslf(params: PslfParams): PslfResult {
  const {
    balance,
    annualRate,
    agi,
    familySize,
    stateGroup,
    paymentsAlreadyMade,
    incomeGrowthPct,
  } = params;

  const monthlyRate = annualRate / 100 / 12;
  const alreadyMade = Math.min(119, Math.max(0, Math.floor(paymentsAlreadyMade)));
  const monthsToForgiveness = 120 - alreadyMade;

  const discretionaryIncome = Math.max(
    0,
    agi - 1.5 * povertyGuideline(familySize, stateGroup),
  );

  const initialMonthlyPayment = idrMonthlyPayment(agi, familySize, stateGroup);

  // Project the balance forward over the remaining qualifying months.
  // Income (and therefore the IDR payment) is recalculated once per year.
  let bal = balance;
  let totalPaid = 0;
  let currentIncome = agi;
  let payment = initialMonthlyPayment;
  let finalMonthlyPayment = initialMonthlyPayment;
  let paidOffBeforeForgiveness = false;

  for (let m = 0; m < monthsToForgiveness; m++) {
    // Recompute the payment at the start of each 12-month block.
    if (m > 0 && m % 12 === 0) {
      currentIncome *= 1 + incomeGrowthPct / 100;
      payment = idrMonthlyPayment(currentIncome, familySize, stateGroup);
    }
    finalMonthlyPayment = payment;

    const interest = bal * monthlyRate;

    if (payment >= bal + interest) {
      // Loan retired before reaching forgiveness — PSLF gives no benefit.
      totalPaid += bal + interest;
      bal = 0;
      paidOffBeforeForgiveness = true;
      break;
    }

    bal = bal + interest - payment;
    totalPaid += payment;
  }

  const forgivenAmount = paidOffBeforeForgiveness ? 0 : Math.max(0, bal);

  // Standard 10-year plan baseline for comparison.
  const standardMonthlyPayment = amortizingPayment(balance, monthlyRate, 120);
  const standardTotalPaid = standardMonthlyPayment * 120;

  const pslfBenefit = standardTotalPaid - totalPaid;

  return {
    initialMonthlyPayment,
    finalMonthlyPayment,
    discretionaryIncome,
    monthsToForgiveness,
    totalPaidUnderPslf: totalPaid,
    forgivenAmount,
    standardMonthlyPayment,
    standardTotalPaid,
    pslfBenefit,
    paidOffBeforeForgiveness,
  };
}
