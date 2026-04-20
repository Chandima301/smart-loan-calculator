'use client';

import { useState, useEffect } from 'react';
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

  // Local slider state — moves the thumb live during drag without triggering
  // expensive parent recalculations on every pixel
  const [principalSlider, setPrincipalSlider] = useState(params.principal);
  const [rateSlider,      setRateSlider]      = useState(params.annualRate);

  const tenureDisplay = tenureUnit === 'years' ? params.tenureMonths / 12 : params.tenureMonths;
  const tenureMin     = tenureUnit === 'years' ? LOAN_LIMITS.tenureMonths.min / 12 : LOAN_LIMITS.tenureMonths.min;
  const tenureMax     = tenureUnit === 'years' ? LOAN_LIMITS.tenureMonths.max / 12 : LOAN_LIMITS.tenureMonths.max;
  const tenureStep    = tenureUnit === 'years' ? 0.5 : LOAN_LIMITS.tenureMonths.step;

  const [tenureSlider, setTenureSlider] = useState(tenureDisplay);

  // Sync slider local state when params change externally (e.g. URL params on mount)
  useEffect(() => { setPrincipalSlider(params.principal); }, [params.principal]);
  useEffect(() => { setRateSlider(params.annualRate);     }, [params.annualRate]);
  useEffect(() => { setTenureSlider(tenureDisplay);       }, [tenureDisplay]);

  // Draft strings while the user is actively typing in the text input
  const [principalDraft, setPrincipalDraft] = useState<string | null>(null);
  const [rateDraft,      setRateDraft]      = useState<string | null>(null);
  const [tenureDraft,    setTenureDraft]    = useState<string | null>(null);

  const update = (key: keyof LoanParams, value: number) =>
    onChange({ ...params, [key]: value });

  const handleTenureCommit = (val: number) => {
    const months = tenureUnit === 'years' ? Math.round(val * 12) : val;
    update('tenureMonths', months);
  };

  const handleTenureUnitChange = (unit: 'months' | 'years') => {
    setTenureDraft(null);
    setTenureUnit(unit);
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
          onValueCommitted={(val) => { setPrincipalDraft(null); update('principal', sv(val)); }}
          className="w-full"
        />
        <Input
          type="text"
          inputMode="numeric"
          value={principalDraft ?? params.principal}
          onChange={(e) => setPrincipalDraft(e.target.value)}
          onBlur={() => {
            const v = Number(principalDraft);
            if (principalDraft !== null && Number.isFinite(v) && v > 0) {
              update('principal', clamp(v, LOAN_LIMITS.principal.min, LOAN_LIMITS.principal.max));
            }
            setPrincipalDraft(null);
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
          value={[rateSlider]}
          onValueChange={(val) => setRateSlider(sv(val))}
          onValueCommitted={(val) => { setRateDraft(null); update('annualRate', sv(val)); }}
          className="w-full"
        />
        <Input
          type="text"
          inputMode="decimal"
          value={rateDraft ?? params.annualRate}
          onChange={(e) => setRateDraft(e.target.value)}
          onBlur={() => {
            const v = Number(rateDraft);
            if (rateDraft !== null && Number.isFinite(v) && v > 0) {
              update('annualRate', clamp(v, LOAN_LIMITS.annualRate.min, LOAN_LIMITS.annualRate.max));
            }
            setRateDraft(null);
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
          onValueCommitted={(val) => { setTenureDraft(null); handleTenureCommit(sv(val)); }}
          className="w-full"
        />
        <Input
          type="text"
          inputMode="numeric"
          value={tenureDraft ?? tenureDisplay}
          onChange={(e) => setTenureDraft(e.target.value)}
          onBlur={() => {
            const v = Number(tenureDraft);
            if (tenureDraft !== null && Number.isFinite(v) && v > 0) {
              handleTenureCommit(clamp(v, tenureMin, tenureMax));
            }
            setTenureDraft(null);
          }}
          className="h-11"
        />
      </div>

    </div>
  );
}
