'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { LoanParams } from '@/types/loan';
import { LOAN_LIMITS } from '@/lib/constants';
import { formatCurrency, formatMonths } from '@/lib/formatters';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

interface Props {
  params: LoanParams;
  onChange: (params: LoanParams) => void;
}

export default function LoanInputPanel({ params, onChange }: Props) {
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');

  const update = (key: keyof LoanParams, value: number) => {
    onChange({ ...params, [key]: value });
  };

  const tenureDisplay = tenureUnit === 'years' ? params.tenureMonths / 12 : params.tenureMonths;
  const tenureMin = tenureUnit === 'years' ? LOAN_LIMITS.tenureMonths.min / 12 : LOAN_LIMITS.tenureMonths.min;
  const tenureMax = tenureUnit === 'years' ? LOAN_LIMITS.tenureMonths.max / 12 : LOAN_LIMITS.tenureMonths.max;
  const tenureStep = tenureUnit === 'years' ? 0.5 : LOAN_LIMITS.tenureMonths.step;

  const handleTenureChange = (val: number) => {
    const months = tenureUnit === 'years' ? Math.round(val * 12) : val;
    update('tenureMonths', months);
  };

  return (
    <div className="space-y-6">
      {/* Loan Amount */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Loan Amount</Label>
          <span className="text-sm font-semibold text-primary">{formatCurrency(params.principal)}</span>
        </div>
        <Slider
          min={LOAN_LIMITS.principal.min}
          max={LOAN_LIMITS.principal.max}
          step={LOAN_LIMITS.principal.step}
          value={[params.principal]}
          onValueChange={(val) => update('principal', sv(val))}
          className="w-full"
        />
        <Input
          type="number"
          value={params.principal}
          min={LOAN_LIMITS.principal.min}
          max={LOAN_LIMITS.principal.max}
          step={LOAN_LIMITS.principal.step}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= LOAN_LIMITS.principal.min && v <= LOAN_LIMITS.principal.max) update('principal', v);
          }}
          className="h-11"
        />
      </div>

      {/* Interest Rate */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Annual Interest Rate</Label>
          <span className="text-sm font-semibold text-primary">{params.annualRate.toFixed(1)}% p.a.</span>
        </div>
        <Slider
          min={LOAN_LIMITS.annualRate.min}
          max={LOAN_LIMITS.annualRate.max}
          step={LOAN_LIMITS.annualRate.step}
          value={[params.annualRate]}
          onValueChange={(val) => update('annualRate', sv(val))}
          className="w-full"
        />
        <Input
          type="number"
          value={params.annualRate}
          min={LOAN_LIMITS.annualRate.min}
          max={LOAN_LIMITS.annualRate.max}
          step={LOAN_LIMITS.annualRate.step}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= LOAN_LIMITS.annualRate.min && v <= LOAN_LIMITS.annualRate.max) update('annualRate', v);
          }}
          className="h-11"
        />
      </div>

      {/* Loan Tenure */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Loan Tenure</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary">{formatMonths(params.tenureMonths)}</span>
            <div className="flex rounded-md border text-xs overflow-hidden">
              <Button
                variant={tenureUnit === 'years' ? 'default' : 'ghost'}
                size="sm"
                className="h-6 rounded-none px-2 text-xs"
                onClick={() => setTenureUnit('years')}
              >
                Yrs
              </Button>
              <Button
                variant={tenureUnit === 'months' ? 'default' : 'ghost'}
                size="sm"
                className="h-6 rounded-none px-2 text-xs"
                onClick={() => setTenureUnit('months')}
              >
                Mo
              </Button>
            </div>
          </div>
        </div>
        <Slider
          min={tenureMin}
          max={tenureMax}
          step={tenureStep}
          value={[tenureDisplay]}
          onValueChange={(val) => handleTenureChange(sv(val))}
          className="w-full"
        />
        <Input
          type="number"
          value={tenureDisplay}
          min={tenureMin}
          max={tenureMax}
          step={tenureStep}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= tenureMin && v <= tenureMax) handleTenureChange(v);
          }}
          className="h-11"
        />
      </div>
    </div>
  );
}
