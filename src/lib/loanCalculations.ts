import type {
  LoanParams,
  LoanResult,
  AmortizationRow,
  PrepaymentParams,
  PrepaymentResult,
  AffordabilityParams,
  AffordabilityResult,
  RestructureParams,
  RestructureResult,
} from '@/types/loan';

export function calculateEMI(params: LoanParams): LoanResult {
  const { principal, annualRate, tenureMonths } = params;
  const r = annualRate / 100 / 12;
  const n = tenureMonths;

  if (r === 0) {
    const emi = principal / n;
    return { emi, totalRepayment: principal, totalInterest: 0, effectiveRate: 0 };
  }

  const onePlusRPowN = Math.pow(1 + r, n);
  const emi = (principal * r * onePlusRPowN) / (onePlusRPowN - 1);
  const totalRepayment = emi * n;
  const totalInterest = totalRepayment - principal;

  return { emi, totalRepayment, totalInterest, effectiveRate: r };
}

export function generateAmortizationSchedule(params: LoanParams): AmortizationRow[] {
  const { effectiveRate, emi } = calculateEMI(params);
  const rows: AmortizationRow[] = [];
  let balance = params.principal;
  let cumulativeInterest = 0;

  for (let month = 1; month <= params.tenureMonths; month++) {
    const openingBalance = balance;
    const interestComponent = balance * effectiveRate;
    const isLastMonth = month === params.tenureMonths;
    const principalComponent = isLastMonth ? balance : Math.min(emi - interestComponent, balance);

    cumulativeInterest += interestComponent;
    const closingBalance = Math.max(0, balance - principalComponent);

    rows.push({
      month,
      openingBalance,
      emi,
      principalComponent,
      interestComponent,
      closingBalance,
      cumulativeInterest,
    });

    balance = closingBalance;
    if (balance < 0.01) break;
  }

  return rows;
}

export function simulatePrepayment(params: PrepaymentParams): PrepaymentResult {
  const r = params.annualRate / 100 / 12;
  const baseResult = calculateEMI(params);
  let balance = params.principal;
  let totalInterest = 0;
  let month = 0;
  const schedule: AmortizationRow[] = [];
  const maxMonths = params.tenureMonths * 2;

  while (balance > 0.01 && month < maxMonths) {
    month++;
    const openingBalance = balance;
    const interestComponent = balance * r;
    totalInterest += interestComponent;

    let payment = baseResult.emi + params.extraMonthlyPayment;
    if (month === params.lumpSumMonth && params.lumpSumPayment > 0) {
      payment += params.lumpSumPayment;
    }

    const principalComponent = Math.min(payment - interestComponent, balance);
    balance = Math.max(0, balance - principalComponent);

    schedule.push({
      month,
      openingBalance,
      emi: payment,
      principalComponent,
      interestComponent,
      closingBalance: balance,
      cumulativeInterest: totalInterest,
    });
  }

  return {
    newTenureMonths: month,
    totalInterestWithPrepayment: totalInterest,
    interestSaved: Math.max(0, baseResult.totalInterest - totalInterest),
    monthsSaved: Math.max(0, params.tenureMonths - month),
    schedule,
  };
}

export function calculateRestructure(
  schedule: AmortizationRow[],
  restructureParams: RestructureParams
): RestructureResult {
  const { monthsPaid, surchargeRate, newAnnualRate, newTenureMonths, fixedFee = 0, newLoanPrincipal } = restructureParams;

  const safeMonthsPaid = Math.max(0, Math.min(monthsPaid, schedule.length - 1));
  const paidRow = schedule[safeMonthsPaid - 1] ?? schedule[0];

  const remainingBalance = paidRow.closingBalance;
  const currentEMI = schedule[0].emi;
  const currentRemainingMonths = schedule.length - safeMonthsPaid;

  // Interest still to pay on the current loan if kept as-is
  const remainingInterestCurrentLoan = schedule
    .slice(safeMonthsPaid)
    .reduce((sum, row) => sum + row.interestComponent, 0);

  // Base restructure amount = remaining balance + surcharge
  const surchargeAmount = remainingBalance * (surchargeRate / 100);
  const restructureAmount = remainingBalance + surchargeAmount;

  // New loan principal: user override, or default to restructureAmount
  const actualNewLoanPrincipal = newLoanPrincipal ?? restructureAmount;

  // Capital payment: user pays extra upfront to reduce the new loan below restructureAmount
  // Top-up: user borrows more than restructureAmount (extra cash in hand — not a cost)
  const capitalPayment = Math.max(0, restructureAmount - actualNewLoanPrincipal);
  const topUpAmount = Math.max(0, actualNewLoanPrincipal - restructureAmount);

  const newLoanResult = calculateEMI({
    principal: Math.max(1, actualNewLoanPrincipal), // guard against 0 or negative
    annualRate: newAnnualRate,
    tenureMonths: newTenureMonths,
  });

  const totalExtraCostCurrent = remainingInterestCurrentLoan;
  // Capital payment is an upfront cash outlay and counts as a real cost
  const totalExtraCostRestructured = surchargeAmount + fixedFee + capitalPayment + newLoanResult.totalInterest;
  const netSaving = totalExtraCostCurrent - totalExtraCostRestructured;
  const emiDifference = newLoanResult.emi - currentEMI;

  // Break-even: months until monthly EMI savings cover all upfront cash costs
  const totalUpfrontCost = surchargeAmount + fixedFee + capitalPayment;
  let breakEvenMonth: number | null = null;
  if (emiDifference < 0 && totalUpfrontCost > 0) {
    const months = Math.ceil(totalUpfrontCost / Math.abs(emiDifference));
    if (months <= newTenureMonths) breakEvenMonth = months;
  }

  return {
    remainingBalance,
    surchargeAmount,
    fixedFee,
    restructureAmount,
    newLoanPrincipal: actualNewLoanPrincipal,
    capitalPayment,
    topUpAmount,
    currentEMI,
    currentRemainingMonths,
    remainingInterestCurrentLoan,
    newLoanEMI: newLoanResult.emi,
    newLoanTotalInterest: newLoanResult.totalInterest,
    totalExtraCostCurrent,
    totalExtraCostRestructured,
    netSaving,
    emiDifference,
    breakEvenMonth,
    isWorthIt: netSaving > 0,
  };
}

export function checkAffordability(params: AffordabilityParams): AffordabilityResult {
  const { monthlyIncome, annualRate, tenureMonths, emiToIncomeRatio = 0.40 } = params;
  const r = annualRate / 100 / 12;
  const n = tenureMonths;
  const maxEMI = monthlyIncome * emiToIncomeRatio;

  let maxLoanAmount: number;
  if (r === 0) {
    maxLoanAmount = maxEMI * n;
  } else {
    const onePlusRPowN = Math.pow(1 + r, n);
    maxLoanAmount = (maxEMI * (onePlusRPowN - 1)) / (r * onePlusRPowN);
  }

  return {
    maxEMI,
    maxLoanAmount,
    monthlyIncomeUsed: monthlyIncome,
    ratioUsed: emiToIncomeRatio,
  };
}
