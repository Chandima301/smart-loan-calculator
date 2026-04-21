'use client';

import { useState, useEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { LoanParams } from '@/types/loan';
import { LOAN_LIMITS } from '@/lib/constants';
import { formatMonths } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

interface Props {
  params: LoanParams;
  onChange: (params: LoanParams) => void;
}

export default function LoanInputPanel({ params, onChange }: Props) {
  const fmt = useCurrencyFormat();
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');

  // Track which input is currently focused — slider commits are ignored while any input is active
  const focusedField = useRef<'principal' | 'rate' | 'tenure' | null>(null);

  // Local slider state — moves thumb live during drag without triggering parent recalculations
  const [principalSlider, setPrincipalSlider] = useState(params.principal);
  const [rateSlider,      setRateSlider]      = useState(params.annualRate);

  const tenureDisplay = tenureUnit === 'years' ? params.tenureMonths / 12 : params.tenureMonths;
  const tenureMin     = tenureUnit === 'years' ? LOAN_LIMITS.tenureMonths.min / 12 : LOAN_LIMITS.tenureMonths.min;
  const tenureMax     = tenureUnit === 'years' ? LOAN_LIMITS.tenureMonths.max / 12 : LOAN_LIMITS.tenureMonths.max;
  const tenureStep    = tenureUnit === 'years' ? 0.5 : LOAN_LIMITS.tenureMonths.step;

  const [tenureSlider, setTenureSlider] = useState(tenureDisplay);

  // Input display values — shown in the text box
  const [principalDisplay, setPrincipalDisplay] = useState(String(params.principal));
  const [rateDisplay,      setRateDisplay]      = useState(String(params.annualRate));
  const [tenureDisplayVal, setTenureDisplayVal] = useState(String(tenureDisplay));

  // Sync display values and slider from params when NOT focused (e.g. after slider commit)
  useEffect(() => {
    setPrincipalSlider(params.principal);
    if (focusedField.current !== 'principal') setPrincipalDisplay(String(params.principal));
  }, [params.principal]);

  useEffect(() => {
    setRateSlider(params.annualRate);
    if (focusedField.current !== 'rate') setRateDisplay(String(params.annualRate));
  }, [params.annualRate]);

  useEffect(() => {
    setTenureSlider(tenureDisplay);
    if (focusedField.current !== 'tenure') setTenureDisplayVal(String(tenureDisplay));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tenureMonths, tenureUnit]);

  const update = (key: keyof LoanParams, value: number) =>
    onChange({ ...params, [key]: value });

  const handleTenureCommit = (val: number) => {
    const months = tenureUnit === 'years' ? Math.round(val * 12) : val;
    update('tenureMonths', months);
  };

  const handleTenureUnitChange = (unit: 'months' | 'years') => {
    setTenureUnit(unit);
  };

  const commitInput = (
    field: 'principal' | 'rate' | 'tenure',
    displayVal: string,
    min: number,
    max: number,
    commit: (v: number) => void,
    fallback: number,
    setDisplay: (s: string) => void,
  ) => {
    focusedField.current = null;
    const v = Number(displayVal);
    if (Number.isFinite(v) && v > 0) {
      const clamped = clamp(v, min, max);
      commit(clamped);
      setDisplay(String(clamped));
    } else {
      setDisplay(String(fallback)); // reset to last valid value
    }
  };

  return (
    <div className="space-y-6">

      {/* Loan Amount */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Loan Amount</Label>
          <span className="text-sm font-semibold text-primary">{fmt(params.principal)}</span>
        </div>
        <Slider
          min={LOAN_LIMITS.principal.min}
          max={LOAN_LIMITS.principal.max}
          step={LOAN_LIMITS.principal.step}
          value={[principalSlider]}
          onValueChange={(val) => setPrincipalSlider(sv(val))}
          onValueCommitted={(val) => {
            if (focusedField.current !== 'principal') update('principal', sv(val));
          }}
          className="w-full"
        />
        <Input
          type="text"
          inputMode="numeric"
          value={principalDisplay}
          onFocus={() => { focusedField.current = 'principal'; }}
          onChange={(e) => setPrincipalDisplay(e.target.value)}
          onBlur={() => commitInput(
            'principal', principalDisplay,
            LOAN_LIMITS.principal.min, LOAN_LIMITS.principal.max,
            (v) => update('principal', v),
            params.principal, setPrincipalDisplay,
          )}
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
          value={[rateSlider]}
          onValueChange={(val) => setRateSlider(sv(val))}
          onValueCommitted={(val) => {
            if (focusedField.current !== 'rate') update('annualRate', sv(val));
          }}
          className="w-full"
        />
        <Input
          type="text"
          inputMode="decimal"
          value={rateDisplay}
          onFocus={() => { focusedField.current = 'rate'; }}
          onChange={(e) => setRateDisplay(e.target.value)}
          onBlur={() => commitInput(
            'rate', rateDisplay,
            LOAN_LIMITS.annualRate.min, LOAN_LIMITS.annualRate.max,
            (v) => update('annualRate', v),
            params.annualRate, setRateDisplay,
          )}
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
                onClick={() => handleTenureUnitChange('years')}
              >
                Yrs
              </Button>
              <Button
                variant={tenureUnit === 'months' ? 'default' : 'ghost'}
                size="sm"
                className="h-6 rounded-none px-2 text-xs"
                onClick={() => handleTenureUnitChange('months')}
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
          value={[tenureSlider]}
          onValueChange={(val) => setTenureSlider(sv(val))}
          onValueCommitted={(val) => {
            if (focusedField.current !== 'tenure') handleTenureCommit(sv(val));
          }}
          className="w-full"
        />
        <Input
          type="text"
          inputMode="numeric"
          value={tenureDisplayVal}
          onFocus={() => { focusedField.current = 'tenure'; }}
          onChange={(e) => setTenureDisplayVal(e.target.value)}
          onBlur={() => commitInput(
            'tenure', tenureDisplayVal,
            tenureMin, tenureMax,
            (v) => handleTenureCommit(v),
            tenureDisplay, setTenureDisplayVal,
          )}
          className="h-11"
        />
      </div>

    </div>
  );
}
