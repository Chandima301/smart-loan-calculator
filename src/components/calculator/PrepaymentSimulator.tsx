'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PrepaymentParams, PrepaymentResult } from '@/types/loan';
import { LOAN_LIMITS } from '@/lib/constants';
import {
  calculateEMI,
  simulatePrepayment,
  suggestedExtraPayment,
} from '@/lib/loanCalculations';
import { formatMonths } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { trackEvent } from '@/lib/analytics';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

interface Props {
  params: PrepaymentParams;
  result: PrepaymentResult;
  baseInterest: number;
  baseTenure: number;
  onChange: (p: PrepaymentParams) => void;
}

export default function PrepaymentSimulator({ params, result, baseInterest, baseTenure, onChange }: Props) {
  const fmt = useCurrencyFormat();
  const update = (key: keyof PrepaymentParams, value: number) => {
    onChange({ ...params, [key]: value });
  };

  const hasImpact = result.interestSaved > 0 || result.monthsSaved > 0;

  // GA4: fire once per mount the first time the user simulates a prepayment
  // (extra payment or lump sum becomes nonzero) — never per keystroke.
  const trackedRef = useRef(false);
  useEffect(() => {
    if (trackedRef.current) return;
    if (params.extraMonthlyPayment > 0 || params.lumpSumPayment > 0) {
      trackedRef.current = true;
      trackEvent('prepayment_simulated');
    }
  }, [params.extraMonthlyPayment, params.lumpSumPayment]);

  // AI strategy — a realistic suggested extra payment, computed from the
  // base EMI and projected with the existing pure math (no LLM).
  const baseEmi = useMemo(
    () => calculateEMI(params).emi,
    [params],
  );
  const suggested = suggestedExtraPayment(baseEmi);
  const suggestion = useMemo(
    () =>
      simulatePrepayment({
        ...params,
        extraMonthlyPayment: suggested,
        lumpSumPayment: 0,
        lumpSumMonth: 1,
      }),
    [params, suggested],
  );
  const alreadyApplied = params.extraMonthlyPayment >= suggested;

  return (
    <div className="space-y-6">
      {suggestion.interestSaved > 0 && (
        <div className="rounded-lg border border-ai/30 bg-ai-soft p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-ai" />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ai-ink">
              AI strategy
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Adding{' '}
            <strong className="text-foreground">{fmt(suggested)}/mo</strong>{' '}
            would pay this loan off{' '}
            <strong className="text-foreground">
              {formatMonths(suggestion.monthsSaved)}
            </strong>{' '}
            sooner and save{' '}
            <strong className="text-emerald-600">
              {fmt(suggestion.interestSaved)}
            </strong>{' '}
            in interest.
          </p>
          <button
            type="button"
            onClick={() => update('extraMonthlyPayment', suggested)}
            disabled={alreadyApplied}
            className="mt-2 inline-flex items-center gap-1 rounded-full bg-ai px-2.5 py-1 text-xs font-medium text-ai-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Zap className="h-3 w-3" />
            {alreadyApplied ? 'Applied' : 'Apply this plan'}
          </button>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Extra Monthly Payment</Label>
          <span className="text-sm font-semibold text-primary">{fmt(params.extraMonthlyPayment)}</span>
        </div>
        <Slider
          min={LOAN_LIMITS.extraPayment.min}
          max={LOAN_LIMITS.extraPayment.max}
          step={LOAN_LIMITS.extraPayment.step}
          value={[params.extraMonthlyPayment]}
          onValueChange={(val) => update('extraMonthlyPayment', sv(val))}
        />
        <Input
          type="number"
          value={params.extraMonthlyPayment}
          min={0}
          step={LOAN_LIMITS.extraPayment.step}
          onChange={(e) => update('extraMonthlyPayment', Math.max(0, Number(e.target.value)))}
          className="h-11"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Lump Sum Payment</Label>
          <Input
            type="number"
            value={params.lumpSumPayment}
            min={0}
            step={LOAN_LIMITS.lumpSum.step}
            placeholder="0"
            onChange={(e) => update('lumpSumPayment', Math.max(0, Number(e.target.value)))}
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">In Month #</Label>
          <Input
            type="number"
            value={params.lumpSumMonth}
            min={1}
            max={params.tenureMonths}
            onChange={(e) =>
              update('lumpSumMonth', Math.min(params.tenureMonths, Math.max(1, Number(e.target.value))))
            }
            className="h-11"
          />
        </div>
      </div>

      {hasImpact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Interest Saved</p>
              <p className="text-xl font-bold text-green-600">
                {fmt(result.interestSaved)}
              </p>
              {result.monthsSaved > 0 && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {formatMonths(result.monthsSaved)} shorter
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original tenure</span>
                <span>{formatMonths(baseTenure)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New tenure</span>
                <span className="font-medium">{formatMonths(result.newTenureMonths)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original interest</span>
                <span>{fmt(baseInterest)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New total interest</span>
                <span className="font-medium">{fmt(result.totalInterestWithPrepayment)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!hasImpact && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Add extra monthly or lump sum payments above to see savings.
        </p>
      )}
    </div>
  );
}
