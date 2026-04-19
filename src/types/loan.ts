export interface LoanParams {
  principal: number;
  annualRate: number;
  tenureMonths: number;
}

export interface LoanResult {
  emi: number;
  totalRepayment: number;
  totalInterest: number;
  effectiveRate: number;
}

export interface AmortizationRow {
  month: number;
  openingBalance: number;
  emi: number;
  principalComponent: number;
  interestComponent: number;
  closingBalance: number;
  cumulativeInterest: number;
}

export interface PrepaymentParams extends LoanParams {
  extraMonthlyPayment: number;
  lumpSumPayment: number;
  lumpSumMonth: number;
}

export interface PrepaymentResult {
  newTenureMonths: number;
  totalInterestWithPrepayment: number;
  interestSaved: number;
  monthsSaved: number;
  schedule: AmortizationRow[];
}

export interface LoanScenario {
  id: string;
  label: string;
  params: LoanParams;
  result: LoanResult;
}

export interface AffordabilityParams {
  monthlyIncome: number;
  annualRate: number;
  tenureMonths: number;
  emiToIncomeRatio?: number;
}

export interface AffordabilityResult {
  maxEMI: number;
  maxLoanAmount: number;
  monthlyIncomeUsed: number;
  ratioUsed: number;
}

export interface RestructureParams {
  monthsPaid: number;
  surchargeRate: number;    // % of remaining balance, e.g. 2 = 2%
  newAnnualRate: number;
  newTenureMonths: number;
  fixedFee?: number;        // one-off fees: document charges, insurance, etc.
  newLoanPrincipal?: number; // override: defaults to restructureAmount (remaining + surcharge)
}

export interface RestructureResult {
  remainingBalance: number;
  surchargeAmount: number;
  fixedFee: number;
  restructureAmount: number;   // remainingBalance + surchargeAmount (minimum new loan)
  newLoanPrincipal: number;    // actual new loan amount used
  capitalPayment: number;      // extra paid upfront to reduce new loan (newLoan < restructureAmount)
  topUpAmount: number;         // extra borrowed on top of restructureAmount (newLoan > restructureAmount)
  currentEMI: number;
  currentRemainingMonths: number;
  remainingInterestCurrentLoan: number;
  newLoanEMI: number;
  newLoanTotalInterest: number;
  totalExtraCostCurrent: number;      // interest still to pay if you keep the loan
  totalExtraCostRestructured: number; // surcharge + fixed fee + capital payment + new loan interest
  netSaving: number;                  // positive = restructuring is cheaper
  emiDifference: number;              // newEMI - currentEMI (negative = monthly relief)
  breakEvenMonth: number | null;      // months until monthly savings offset the upfront costs
  isWorthIt: boolean;
}
