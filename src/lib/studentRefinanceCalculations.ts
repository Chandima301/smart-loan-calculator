/**
 * Student-loan refinance comparison math: federal loan kept as-is vs.
 * refinanced into a private loan.
 *
 * The quantitative side is a straightforward amortization comparison.
 * The decision, however, is dominated by what refinancing federal loans
 * into a private loan permanently forfeits (IDR plans, PSLF, federal
 * deferment/forbearance, death & disability discharge, future relief).
 * Those are surfaced qualitatively in the UI; this module handles the
 * dollars.
 */

export interface StudentRefinanceParams {
  /** Current federal loan balance. */
  balance: number;
  /** Current federal annual interest rate, percent (e.g. 6.5). */
  currentRate: number;
  /** Months remaining on the current federal repayment schedule. */
  remainingMonths: number;
  /** New private annual interest rate, percent (e.g. 5.0). */
  newRate: number;
  /** New private loan term in months. */
  newTermMonths: number;
  /** One-time refinance / origination fee (rolled into the new balance). */
  refinanceFee: number;
}

export interface StudentRefinanceResult {
  // Keep federal loans
  federalMonthly: number;
  federalTotalPaid: number;
  federalTotalInterest: number;
  remainingMonths: number;

  // Private refinance
  privateMonthly: number;
  privateTotalPaid: number;
  privateTotalInterest: number;
  newTermMonths: number;

  // Deltas (positive = refinancing is cheaper / lighter)
  monthlyDelta: number;
  lifetimeInterestDelta: number;
  totalPaidDelta: number;

  /** True when refinancing reduces total lifetime interest. */
  refinanceSavesInterest: boolean;
}

/** Standard amortization: M = P·r·(1+r)^n / ((1+r)^n − 1). */
function amortizingPayment(p: number, monthlyRate: number, n: number): number {
  if (n <= 0) return 0;
  if (monthlyRate === 0) return p / n;
  const x = Math.pow(1 + monthlyRate, n);
  return (p * monthlyRate * x) / (x - 1);
}

export function calculateStudentRefinance(
  params: StudentRefinanceParams,
): StudentRefinanceResult {
  const {
    balance,
    currentRate,
    remainingMonths,
    newRate,
    newTermMonths,
    refinanceFee,
  } = params;

  // Keep federal: amortize the current balance at the current rate over
  // the remaining term.
  const fedRate = currentRate / 100 / 12;
  const federalMonthly = amortizingPayment(balance, fedRate, remainingMonths);
  const federalTotalPaid = federalMonthly * remainingMonths;
  const federalTotalInterest = federalTotalPaid - balance;

  // Private refinance: any fee is rolled into the new principal.
  const privatePrincipal = balance + refinanceFee;
  const privRate = newRate / 100 / 12;
  const privateMonthly = amortizingPayment(
    privatePrincipal,
    privRate,
    newTermMonths,
  );
  const privateTotalPaid = privateMonthly * newTermMonths;
  // Interest measured against the original balance so the fee shows up
  // as a real cost of refinancing.
  const privateTotalInterest = privateTotalPaid - balance;

  const monthlyDelta = federalMonthly - privateMonthly;
  const lifetimeInterestDelta = federalTotalInterest - privateTotalInterest;
  const totalPaidDelta = federalTotalPaid - privateTotalPaid;

  return {
    federalMonthly,
    federalTotalPaid,
    federalTotalInterest,
    remainingMonths,
    privateMonthly,
    privateTotalPaid,
    privateTotalInterest,
    newTermMonths,
    monthlyDelta,
    lifetimeInterestDelta,
    totalPaidDelta,
    refinanceSavesInterest: lifetimeInterestDelta > 0,
  };
}
