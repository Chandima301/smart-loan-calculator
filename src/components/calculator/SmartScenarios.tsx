'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  TrendingDown,
  Zap,
  CalendarClock,
  Clock,
} from 'lucide-react';
import {
  calculateEMI,
  simulatePrepayment,
  suggestedExtraPayment,
} from '@/lib/loanCalculations';
import { LOAN_LIMITS } from '@/lib/constants';
import { formatMonths } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import type { LoanParams, LoanResult } from '@/types/loan';

interface Props {
  params: LoanParams;
  result: LoanResult;
  onApplyRate: (annualRate: number) => void;
  onApplyTenure: (tenureMonths: number) => void;
  onApplyExtra: (extraMonthly: number) => void;
}

/**
 * Smart Scenarios — four one-tap "what-if" cards generated from the
 * current loan. Each saving is computed by the existing pure math
 * (calculateEMI / simulatePrepayment); clicking applies the change to
 * the calculator. 100% deterministic — no LLM.
 */
export default function SmartScenarios({
  params,
  result,
  onApplyRate,
  onApplyTenure,
  onApplyExtra,
}: Props) {
  const fmt = useCurrencyFormat();
  const router = useRouter();

  const scenarios = useMemo(() => {
    const baseInterest = result.totalInterest;

    // 1 — Rate one point lower.
    const lowerRate = Math.max(
      LOAN_LIMITS.annualRate.min,
      params.annualRate - 1,
    );
    const rateSave =
      baseInterest -
      calculateEMI({ ...params, annualRate: lowerRate }).totalInterest;

    // 2 — A small, sustainable extra monthly payment.
    const extra = suggestedExtraPayment(result.emi);
    const extraSave = simulatePrepayment({
      ...params,
      extraMonthlyPayment: extra,
      lumpSumPayment: 0,
      lumpSumMonth: 1,
    }).interestSaved;

    // 3 — Biweekly: preview the saving (one extra payment a year ≈
    // EMI / 12 / mo), then hand off to the dedicated biweekly calculator
    // for the real 26-payments-a-year model.
    const biweekly = Math.max(1, Math.round(result.emi / 12));
    const biweeklySave = simulatePrepayment({
      ...params,
      extraMonthlyPayment: biweekly,
      lumpSumPayment: 0,
      lumpSumMonth: 1,
    }).interestSaved;

    // 4 — Five years off the tenure. Only meaningful when a genuine
    // 60-month cut still lands at or above the minimum term; for short
    // loans the card is disabled rather than clamped to a 6-month term.
    const rawShorterTenure = params.tenureMonths - 60;
    const tenureTooShort = rawShorterTenure < LOAN_LIMITS.tenureMonths.min;
    const shorterTenure = Math.max(
      LOAN_LIMITS.tenureMonths.min,
      rawShorterTenure,
    );
    const tenureCutMonths = params.tenureMonths - shorterTenure;
    const tenureSave =
      baseInterest -
      calculateEMI({ ...params, tenureMonths: shorterTenure }).totalInterest;

    return [
      {
        key: 'rate',
        Icon: TrendingDown,
        title: `Rate drops to ${lowerRate.toFixed(1)}%`,
        sub: 'one point lower',
        save: rateSave,
        apply: () => onApplyRate(lowerRate),
        disabled: lowerRate >= params.annualRate,
      },
      {
        key: 'extra',
        Icon: Zap,
        title: `Pay ${fmt(extra)}/mo extra`,
        sub: 'small steady boost',
        save: extraSave,
        apply: () => onApplyExtra(extra),
        disabled: false,
      },
      {
        key: 'biweekly',
        Icon: CalendarClock,
        title: 'Switch to biweekly',
        sub: 'open the biweekly calculator →',
        save: biweeklySave,
        apply: () =>
          router.push(
            `/biweekly-mortgage-calculator?p=${params.principal}&r=${params.annualRate}&t=${params.tenureMonths}`,
          ),
        disabled: false,
      },
      {
        key: 'tenure',
        Icon: Clock,
        title: tenureTooShort
          ? 'Shorter term'
          : `${formatMonths(shorterTenure)} term`,
        sub: tenureTooShort
          ? 'loan already short'
          : `${formatMonths(tenureCutMonths)} shorter`,
        save: tenureSave,
        apply: () => onApplyTenure(shorterTenure),
        disabled: tenureTooShort,
      },
    ];
  }, [params, result, fmt, router, onApplyRate, onApplyTenure, onApplyExtra]);

  return (
    <section>
      <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
        <h2 className="inline-flex items-center gap-1.5 text-base font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-ai" /> Smart Scenarios
        </h2>
        <span className="text-xs text-muted-foreground">
          Generated from your inputs · tap to apply
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {scenarios.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={s.apply}
            disabled={s.disabled}
            className="flex flex-col gap-1 rounded-lg border p-3 text-left transition-colors hover:border-ai hover:bg-ai-soft disabled:pointer-events-none disabled:opacity-40"
          >
            <s.Icon className="h-4 w-4 text-ai" />
            <span className="text-sm font-semibold leading-tight">
              {s.title}
            </span>
            <span className="text-xs text-muted-foreground">{s.sub}</span>
            <span className="mt-0.5 text-xs font-semibold text-emerald-600">
              {s.save > 0 ? `save ${fmt(s.save)}` : '—'}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
