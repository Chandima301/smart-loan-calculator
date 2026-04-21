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

  const handleApply = () => {
    onApplyToCalculator({
      principal: Math.round(result.maxLoanAmount / 10_000) * 10_000,
      annualRate,
      tenureMonths,
    });
  };

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <span className="flex items-center text-sm text-muted-foreground whitespace-nowrap">years</span>
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
              className="flex-1 flex flex-col items-center rounded-md border p-3 cursor-pointer transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-1">Maximum Loan Amount</p>
            <p className="text-2xl font-bold text-primary">{fmt(result.maxLoanAmount)}</p>
            <p className="text-xs text-muted-foreground mt-1">at {annualRate}% for {formatMonths(tenureMonths)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Max Monthly EMI</span>
              <span className="font-semibold">{fmt(result.maxEMI)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Income Used</span>
              <span>{(result.ratioUsed * 100).toFixed(0)}% of {fmt(monthlyIncome)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleApply} className="w-full">
        Apply to Calculator
      </Button>
    </div>
  );
}
