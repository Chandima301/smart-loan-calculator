import { calculateEMI } from './loanCalculations';

/**
 * Direct Subsidized vs Direct Unsubsidized student-loan breakdown.
 *
 * The only mechanical difference between the two federal Direct Loan types is
 * who pays the interest that accrues *before* repayment begins (while you're in
 * school at least half-time, plus the 6-month grace period and any deferment):
 *
 *  - **Direct Subsidized** — the U.S. Department of Education pays that interest,
 *    so nothing capitalizes and you enter repayment owing exactly what you
 *    borrowed.
 *  - **Direct Unsubsidized** — interest accrues from the day the loan is
 *    disbursed. If you don't pay it as it accrues, it *capitalizes* (is added to
 *    principal) when repayment starts, so you then pay interest on that interest.
 *
 * Federal in-school interest accrues as *simple* interest and only capitalizes
 * once, at repayment start — that's modeled here.
 */
export interface DirectLoanBreakdownParams {
  /** Amount borrowed (disbursed principal). */
  principal: number;
  /** Annual interest rate, as a percent (e.g. 6.53). */
  annualRate: number;
  /** Years spent in school (at least half-time) before repayment begins. */
  yearsInSchool: number;
  /** Repayment term in months once payments begin. */
  repaymentMonths: number;
  /** Grace period (months) after leaving school before the first bill. Default 6. */
  graceMonths?: number;
}

export interface DirectLoanPlan {
  /** Interest that accrues before repayment (0 for subsidized — the govt pays it). */
  interestInSchool: number;
  /** Balance when repayment starts (principal, plus capitalized interest if unsubsidized). */
  balanceAtRepayment: number;
  /** Monthly payment over the repayment term. */
  monthlyPayment: number;
  /** Interest paid during the repayment term only. */
  repaymentInterest: number;
  /** Total interest cost: in-school accrual + repayment interest. */
  totalInterest: number;
  /** Everything you repay above the original principal is interest; total out of pocket. */
  totalCost: number;
}

export interface DirectLoanBreakdownResult {
  /** Months interest accrues before repayment (in-school + grace). */
  inSchoolMonths: number;
  subsidized: DirectLoanPlan;
  unsubsidized: DirectLoanPlan;
  /** Extra lifetime interest the unsubsidized loan costs vs subsidized. */
  extraInterestUnsubsidized: number;
  /** Higher monthly payment on the unsubsidized loan (from the capitalized balance). */
  extraMonthlyUnsubsidized: number;
}

function buildPlan(
  originalPrincipal: number,
  interestInSchool: number,
  annualRate: number,
  repaymentMonths: number,
): DirectLoanPlan {
  const balanceAtRepayment = originalPrincipal + interestInSchool;
  const { emi, totalInterest: repaymentInterest } = calculateEMI({
    principal: balanceAtRepayment,
    annualRate,
    tenureMonths: repaymentMonths,
  });
  const totalInterest = interestInSchool + repaymentInterest;
  return {
    interestInSchool,
    balanceAtRepayment,
    monthlyPayment: emi,
    repaymentInterest,
    totalInterest,
    totalCost: originalPrincipal + totalInterest,
  };
}

export function calculateDirectLoanBreakdown(
  params: DirectLoanBreakdownParams,
): DirectLoanBreakdownResult {
  const { principal, annualRate, yearsInSchool, repaymentMonths, graceMonths = 6 } = params;

  const inSchoolMonths = Math.max(0, Math.round(yearsInSchool * 12) + graceMonths);
  const monthlyRate = annualRate / 100 / 12;
  // Simple interest while in school + grace; capitalizes once at repayment start.
  const accruedInSchool = principal * monthlyRate * inSchoolMonths;

  const subsidized = buildPlan(principal, 0, annualRate, repaymentMonths);
  const unsubsidized = buildPlan(principal, accruedInSchool, annualRate, repaymentMonths);

  return {
    inSchoolMonths,
    subsidized,
    unsubsidized,
    extraInterestUnsubsidized: unsubsidized.totalInterest - subsidized.totalInterest,
    extraMonthlyUnsubsidized: unsubsidized.monthlyPayment - subsidized.monthlyPayment,
  };
}
