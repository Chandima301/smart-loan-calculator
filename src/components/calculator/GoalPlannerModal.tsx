'use client';

import { useMemo, useState } from 'react';
import { Target, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { planForPayoffTarget } from '@/lib/loanCalculations';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { formatMonths } from '@/lib/formatters';
import type { LoanParams } from '@/types/loan';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

interface Props {
  params: LoanParams;
  /** Apply a new tenure (in months) to the calculator and close. */
  onApply: (tenureMonths: number) => void;
  onClose: () => void;
}

/**
 * Goal Planner — work backward from a payoff deadline. The user picks a
 * "debt-free by" year; we solve for the monthly payment that clears the
 * loan exactly by then. Pure deterministic math (planForPayoffTarget) —
 * no LLM. Modal is a plain backdrop + card (no dialog primitive exists).
 */
export default function GoalPlannerModal({ params, onApply, onClose }: Props) {
  const fmt = useCurrencyFormat();
  const thisYear = new Date().getFullYear();
  const currentEndYear = thisYear + Math.ceil(params.tenureMonths / 12);

  // Default goal: 5 years sooner than the current schedule (min 1 yr out).
  const [targetYear, setTargetYear] = useState(
    Math.max(thisYear + 1, currentEndYear - 5),
  );

  const plan = useMemo(() => {
    const months = Math.max(1, (targetYear - thisYear) * 12);
    return planForPayoffTarget(params, months);
  }, [params, targetYear, thisYear]);

  const minYear = thisYear + 1;
  const maxYear = thisYear + 40;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Goal Planner"
    >
      <div
        className="relative w-full max-w-md rounded-xl border bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-ai-soft px-2 py-0.5 text-[11px] font-semibold text-ai-ink">
          <Target className="h-3 w-3" /> Goal Planner
        </div>
        <h2 className="text-lg font-bold">Work backward from your finish line</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick when you want to be debt-free — we&apos;ll calculate exactly
          what monthly payment it takes.
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Debt-free by</Label>
            <span className="text-sm font-semibold text-ai">{targetYear}</span>
          </div>
          <Slider
            min={minYear}
            max={maxYear}
            step={1}
            value={[targetYear]}
            onValueChange={(v) => setTargetYear(sv(v))}
          />
          <p className="text-xs text-muted-foreground">
            Your current schedule finishes around {currentEndYear}.
          </p>
        </div>

        <div
          className="mt-4 rounded-lg p-4 text-white"
          style={{ background: 'var(--ai-grad)' }}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide opacity-90">
            <Sparkles className="h-3 w-3" /> Your plan
          </div>
          <div className="mt-1.5 text-sm leading-relaxed">
            To be debt-free by <strong>{targetYear}</strong> (
            {formatMonths(plan.targetMonths)}), pay
            <span className="my-1 block text-3xl font-bold">
              {fmt(plan.requiredMonthlyPayment)}
              <span className="text-sm font-medium opacity-80"> /mo</span>
            </span>
            {plan.extraVsCurrent > 0 ? (
              <>
                That&apos;s <strong>{fmt(plan.extraVsCurrent)}/mo</strong> more
                than your current payment of {fmt(plan.currentEMI)}.
              </>
            ) : (
              <>That fits within your current payment of {fmt(plan.currentEMI)}.</>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => onApply(plan.targetMonths)}
            className="gap-1.5"
          >
            <Target className="h-3.5 w-3.5" /> Apply this payoff date
          </Button>
        </div>
      </div>
    </div>
  );
}
