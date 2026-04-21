'use client';

import { useState, useEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
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

// Controlled input with a "draft" state that shadows the prop while editing.
// - draft === null: not editing, display reflects the prop (value from parent)
// - draft !== null: editing, display reflects draft (whatever user has typed)
// Because draft is set on focus and cleared on blur, any prop change coming
// from the slider while the user is typing is cleanly ignored by the display.
function NumericField({
  value,
  inputMode,
  min,
  max,
  onCommit,
}: {
  value: number;
  inputMode: 'numeric' | 'decimal';
  min: number;
  max: number;
  onCommit: (v: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  const display = draft !== null ? draft : String(value);

  return (
    <input
      type="text"
      inputMode={inputMode}
      value={display}
      onFocus={() => setDraft(String(value))}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft === null) return;
        const v = Number(draft);
        if (Number.isFinite(v) && v > 0) {
          onCommit(clamp(v, min, max));
        }
        setDraft(null);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.currentTarget as HTMLInputElement).blur();
      }}
      className="h-11 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    />
  );
}

export default function LoanInputPanel({ params, onChange }: Props) {
  const fmt = useCurrencyFormat();
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');

  // Local slider state — moves thumb live during drag without parent recalculations
  const [principalSlider, setPrincipalSlider] = useState(params.principal);
  const [rateSlider,      setRateSlider]      = useState(params.annualRate);

  const tenureDisplay = tenureUnit === 'years' ? params.tenureMonths / 12 : params.tenureMonths;
  const tenureMin     = tenureUnit === 'years' ? LOAN_LIMITS.tenureMonths.min / 12 : LOAN_LIMITS.tenureMonths.min;
  const tenureMax     = tenureUnit === 'years' ? LOAN_LIMITS.tenureMonths.max / 12 : LOAN_LIMITS.tenureMonths.max;
  const tenureStep    = tenureUnit === 'years' ? 0.5 : LOAN_LIMITS.tenureMonths.step;
  const [tenureSlider, setTenureSlider] = useState(tenureDisplay);

  // Keep sliders in sync when params change externally
  useEffect(() => { setPrincipalSlider(params.principal); }, [params.principal]);
  useEffect(() => { setRateSlider(params.annualRate);     }, [params.annualRate]);
  useEffect(() => { setTenureSlider(tenureDisplay);       }, [tenureDisplay]);

  const update = (key: keyof LoanParams, value: number) =>
    onChange({ ...params, [key]: value });

  const handleTenureCommit = (val: number) => {
    const months = tenureUnit === 'years' ? Math.round(val * 12) : val;
    update('tenureMonths', months);
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
          onValueCommitted={(val) => update('principal', sv(val))}
          className="w-full"
        />
        <NumericField
          value={params.principal}
          inputMode="numeric"
          min={LOAN_LIMITS.principal.min}
          max={LOAN_LIMITS.principal.max}
          onCommit={(v) => update('principal', v)}
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
          onValueCommitted={(val) => update('annualRate', sv(val))}
          className="w-full"
        />
        <NumericField
          value={params.annualRate}
          inputMode="decimal"
          min={LOAN_LIMITS.annualRate.min}
          max={LOAN_LIMITS.annualRate.max}
          onCommit={(v) => update('annualRate', v)}
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
          value={[tenureSlider]}
          onValueChange={(val) => setTenureSlider(sv(val))}
          onValueCommitted={(val) => handleTenureCommit(sv(val))}
          className="w-full"
        />
        <NumericField
          value={tenureDisplay}
          inputMode="numeric"
          min={tenureMin}
          max={tenureMax}
          onCommit={(v) => handleTenureCommit(v)}
        />
      </div>

    </div>
  );
}
