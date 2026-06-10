/**
 * Biweekly mortgage payment math.
 *
 * Biweekly payment plans charge half a monthly payment every 14 days.
 * 26 biweekly payments per year = the equivalent of 13 monthly payments
 * (one extra payment per year), which dramatically cuts total interest
 * and shortens the loan term.
 *
 * Implementation: simulate a monthly amortization where each month's
 * payment is the standard monthly payment multiplied by 13/12. The
 * difference (1/12) is treated as extra principal each month — exactly
 * equivalent to making one extra full monthly payment per year.
 *
 * An optional extra amount per biweekly payment (26/year) is folded in
 * as additional principal: extraPerPayment * 26/12 per simulated month.
 */

export interface BiweeklyParams {
  principal: number;
  annualRate: number;       // percent, e.g. 6.5
  tenureMonths: number;     // standard schedule term, e.g. 360
  extraPerPayment?: number; // optional extra principal per biweekly payment
}

export interface BiweeklyResult {
  // Standard monthly schedule
  monthlyPayment: number;
  monthlyTotalInterest: number;
  monthlyTotalPaid: number;
  originalMonths: number;

  // Biweekly schedule
  biweeklyPayment: number;
  biweeklyTotalInterest: number;
  biweeklyTotalPaid: number;
  biweeklyMonths: number;          // months until paid off under biweekly
  biweeklyPayoffDate: Date;

  // Savings
  interestSaved: number;
  monthsSaved: number;
  yearsSaved: number;
  payoffDateMonthly: Date;
}

/**
 * Standard amortization formula:
 * M = P * r * (1+r)^n / ((1+r)^n − 1)
 */
function monthlyAmortizationPayment(
  principal: number,
  monthlyRate: number,
  months: number,
): number {
  if (monthlyRate === 0) return principal / months;
  const x = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * x) / (x - 1);
}

/**
 * Walk forward month-by-month using a fixed monthly payment.
 * Returns months until payoff and total interest paid.
 * Cap at safety limit so a payment that doesn't cover interest doesn't loop forever.
 */
function simulateAmortization(
  principal: number,
  monthlyRate: number,
  monthlyPayment: number,
  maxMonths: number,
): { months: number; totalInterest: number } {
  let balance = principal;
  let totalInterest = 0;
  let months = 0;

  while (balance > 0.005 && months < maxMonths) {
    months++;
    const interest = balance * monthlyRate;
    totalInterest += interest;

    // If the payment doesn't even cover interest, the loan would
    // grow forever — bail out (caller's responsibility to validate).
    if (monthlyPayment <= interest) return { months: maxMonths, totalInterest };

    const principalPaid = Math.min(monthlyPayment - interest, balance);
    balance -= principalPaid;
  }

  return { months, totalInterest };
}

export function calculateBiweekly(params: BiweeklyParams): BiweeklyResult {
  const { principal, annualRate, tenureMonths, extraPerPayment = 0 } = params;
  const monthlyRate = annualRate / 100 / 12;

  // Standard monthly payment & totals
  const monthlyPayment = monthlyAmortizationPayment(principal, monthlyRate, tenureMonths);
  const monthlyTotalPaid = monthlyPayment * tenureMonths;
  const monthlyTotalInterest = monthlyTotalPaid - principal;

  // Biweekly: half of monthly, every 14 days = 26/year = 13 monthly equivalents/year.
  // Optional extra principal per biweekly payment adds 26/12 of itself per month.
  const biweeklyPayment = monthlyPayment / 2;
  const monthlyEquivalent = monthlyPayment * (13 / 12) + extraPerPayment * (26 / 12);

  // Simulate biweekly schedule to find actual payoff
  const safetyMax = tenureMonths + 24; // never longer than original
  const { months: biweeklyMonths, totalInterest: biweeklyTotalInterest } =
    simulateAmortization(principal, monthlyRate, monthlyEquivalent, safetyMax);

  const biweeklyTotalPaid = principal + biweeklyTotalInterest;
  const interestSaved = monthlyTotalInterest - biweeklyTotalInterest;
  const monthsSaved = tenureMonths - biweeklyMonths;
  const yearsSaved = monthsSaved / 12;

  // Payoff dates from today
  const today = new Date();
  const payoffDateMonthly = new Date(today);
  payoffDateMonthly.setMonth(payoffDateMonthly.getMonth() + tenureMonths);
  const biweeklyPayoffDate = new Date(today);
  biweeklyPayoffDate.setMonth(biweeklyPayoffDate.getMonth() + biweeklyMonths);

  return {
    monthlyPayment,
    monthlyTotalInterest,
    monthlyTotalPaid,
    originalMonths: tenureMonths,
    biweeklyPayment,
    biweeklyTotalInterest,
    biweeklyTotalPaid,
    biweeklyMonths,
    biweeklyPayoffDate,
    interestSaved,
    monthsSaved,
    yearsSaved,
    payoffDateMonthly,
  };
}
