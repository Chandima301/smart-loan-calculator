'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { NumericField } from '@/components/ui/numeric-field';
import { checkAffordability } from '@/lib/loanCalculations';
import { LOAN_DEFAULTS, LOAN_LIMITS } from '@/lib/constants';
import { formatMonths } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import AiTakeBanner from '@/components/ai/AiTakeBanner';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);
import type { LoanParams } from '@/types/loan';

interface Props {
  onApplyToCalculator: (params: LoanParams) => void;
}

const RATIO_OPTIONS = [
  { value: '0.30', label: '30%', description: 'Conservative' },
  { value: '0.40', label: '40%', description: 'Standard' },
  { value: '0.50', label: '50%', description: 'Aggressive' },
];

export default function AffordabilityChecker({ onApplyToCalculator }: Props) {
  const fmt = useCurrencyFormat();
  const [monthlyIncome, setMonthlyIncome] = useState(100_000);
  const [annualRate, setAnnualRate] = useState(LOAN_DEFAULTS.annualRate);
  const [tenureMonths, setTenureMonths] = useState(LOAN_DEFAULTS.tenureMonths);
  const [ratio, setRatio] = useState('0.40');

  const result = useMemo(
    () =>
      checkAffordability({
        monthlyIncome,
        annualRate,
        tenureMonths,
        emiToIncomeRatio: parseFloat(ratio),
      }),
    [monthlyIncome, annualRate, tenureMonths, ratio]
  );

  // Comfortable-vs-stretch: what a lender might approve at a higher ratio.
  const stretchRatio = Math.min(0.5, parseFloat(ratio) + 0.1);
  const stretch = useMemo(
    () =>
      checkAffordability({
        monthlyIncome,
        annualRate,
        tenureMonths,
        emiToIncomeRatio: stretchRatio,
      }),
    [monthlyIncome, annualRate, tenureMonths, stretchRatio]
  );

  const handleApply = () => {
    onApplyToCalculator({
      principal: Math.round(result.maxLoanAmount / 10_000) * 10_000,
      annualRate,
      tenureMonths,
    });
  };

  return (
    <div className="space-y-6">
      <AiTakeBanner
        label="AI take"
        watch={`${monthlyIncome}:${annualRate}:${tenureMonths}:${ratio}`}
        title="What you can comfortably afford"
      >
        On <strong>{fmt(monthlyIncome)}/mo</strong> of gross income, a lender
        will typically let you commit about{' '}
        <strong>{(result.ratioUsed * 100).toFixed(0)}%</strong> of it —{' '}
        <strong>{fmt(result.maxEMI)}/mo</strong> — to a loan repayment. At{' '}
        {annualRate}% over {formatMonths(tenureMonths)}, a payment that size
        supports a loan of roughly{' '}
        <strong>{fmt(result.maxLoanAmount)}</strong>. Borrowing at this level
        keeps the repayment comfortable and still leaves room for everyday
        expenses, regular saving and the occasional unplanned bill — the
        cushion that keeps a loan from becoming a burden.
        {stretchRatio > result.ratioUsed && (
          <>
            {' '}
            Push the ratio to <strong>{(stretchRatio * 100).toFixed(0)}%</strong>{' '}
            of income and a lender may approve as much as{' '}
            <strong>{fmt(stretch.maxLoanAmount)}</strong> — but that extra
            borrowing power comes straight out of your financial breathing
            room, and a single bad month gets stressful fast. Treat the
            comfortable figure as your real target and the stretch figure as a
            hard ceiling you stay under, not a goal to reach.
          </>
        )}
      </AiTakeBanner>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6 rounded-lg border p-5">
          <h3 className="text-base font-semibold">Your finances</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Monthly Income (Gross)</Label>
              <span className="text-sm font-semibold text-primary">{fmt(monthlyIncome)}</span>
            </div>
            <Slider
              min={LOAN_LIMITS.monthlyIncome.min}
              max={LOAN_LIMITS.monthlyIncome.max}
              step={LOAN_LIMITS.monthlyIncome.step}
              value={[monthlyIncome]}
              onValueChange={(val) => setMonthlyIncome(sv(val))}
            />
            <NumericField
              value={monthlyIncome}
              min={LOAN_LIMITS.monthlyIncome.min}
              max={LOAN_LIMITS.monthlyIncome.max}
              inputMode="numeric"
              onCommit={setMonthlyIncome}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Interest Rate</Label>
              <NumericField
                value={annualRate}
                min={LOAN_LIMITS.annualRate.min}
                max={LOAN_LIMITS.annualRate.max}
                inputMode="decimal"
                onCommit={setAnnualRate}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tenure</Label>
              <div className="flex gap-2">
                <NumericField
                  value={Math.round(tenureMonths / 12)}
                  min={1}
                  max={30}
                  inputMode="numeric"
                  onCommit={(v) => setTenureMonths(v * 12)}
                />
                <span className="flex items-center whitespace-nowrap text-sm text-muted-foreground">
                  years
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">EMI-to-Income Ratio</Label>
            <RadioGroup value={ratio} onValueChange={setRatio} className="flex gap-3">
              {RATIO_OPTIONS.map((opt) => (
                <Label
                  key={opt.value}
                  htmlFor={`ratio-${opt.value}`}
                  className="flex flex-1 cursor-pointer flex-col items-center rounded-md border p-3 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                >
                  <RadioGroupItem value={opt.value} id={`ratio-${opt.value}`} className="sr-only" />
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-xs text-muted-foreground">{opt.description}</span>
                </Label>
              ))}
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
              Banks typically allow 40% of gross income as EMI.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 rounded-lg border p-5">
          <h3 className="text-base font-semibold">What you can afford</h3>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-4">
              <p className="mb-1 text-xs text-muted-foreground">Maximum Loan Amount</p>
              <p className="text-2xl font-bold text-primary">{fmt(result.maxLoanAmount)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                at {annualRate}% for {formatMonths(tenureMonths)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max Monthly EMI</span>
                <span className="font-semibold">{fmt(result.maxEMI)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Income Used</span>
                <span>
                  {(result.ratioUsed * 100).toFixed(0)}% of {fmt(monthlyIncome)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleApply} className="w-full">
            Apply to Calculator
          </Button>
        </div>
      </div>
    </div>
  );
}
