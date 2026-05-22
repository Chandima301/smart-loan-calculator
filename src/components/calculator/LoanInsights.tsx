'use client';

import { useState } from 'react';
import type { LoanParams, LoanResult, AmortizationRow } from '@/types/loan';
import { formatMonths } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { ChevronDown, Sparkles } from 'lucide-react';

interface Props {
  params: LoanParams;
  result: LoanResult;
  schedule: AmortizationRow[];
  /** Amortization crossover month — when the principal portion of the
   *  payment overtakes the interest portion. Computed by the shell. */
  crossoverMonth: number;
}

function getHealth(ratio: number) {
  if (ratio < 0.25)
    return {
      label: 'Excellent',
      dot: 'bg-emerald-500',
      pill: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40',
    };
  if (ratio < 0.5)
    return {
      label: 'Fair',
      dot: 'bg-yellow-400',
      pill: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40',
    };
  if (ratio < 1.0)
    return {
      label: 'High',
      dot: 'bg-orange-500',
      pill: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40',
    };
  return {
    label: 'Very High',
    dot: 'bg-red-500',
    pill: 'bg-red-100 text-red-700 dark:bg-red-900/40',
  };
}

/**
 * Loan Insights — a collapsible analytical card. The expanded body shows
 * a deterministic plain-English "AI narrative" of the amortization plus a
 * grid of metric tiles. All template text from the existing pure math —
 * no LLM. The tailored extra-payment suggestion now lives in the
 * Prepayment section, not here.
 */
export default function LoanInsights({
  params,
  result,
  schedule,
  crossoverMonth,
}: Props) {
  const [open, setOpen] = useState(false);
  const fmt = useCurrencyFormat();

  const interestRatio =
    params.principal > 0 ? result.totalInterest / params.principal : 0;
  const health = getHealth(interestRatio);
  const multiplier =
    params.principal > 0 ? result.totalRepayment / params.principal : 0;
  const costPer100 = (multiplier * 100).toFixed(0);

  const firstRow = schedule[0];
  const firstPrincipalPct =
    firstRow && firstRow.emi > 0
      ? Math.round((firstRow.principalComponent / firstRow.emi) * 100)
      : 0;
  const interestPer100 = Math.round(interestRatio * 100);

  const tiles = [
    {
      label: 'First-payment principal',
      value: `${firstPrincipalPct}%`,
      bar: 'bg-blue-400',
    },
    {
      label: 'Crossover month',
      value: crossoverMonth > 0 ? `~${crossoverMonth}` : '—',
      bar: 'bg-purple-400',
    },
    {
      label: 'Interest per 100 borrowed',
      value: costPer100,
      bar: 'bg-amber-400',
    },
    {
      label: 'Total repaid',
      value: `${multiplier.toFixed(2)}×`,
      bar: 'bg-emerald-400',
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-muted/40"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Loan Insights</span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${health.pill}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${health.dot}`} />
            {health.label}
          </span>
          {!open && (
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {costPer100} per 100 borrowed
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {firstPrincipalPct}% to principal (month 1)
              </span>
            </div>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="border-t p-4">
          {/* AI narrative — light-purple box with the AI icon */}
          <div className="rounded-lg border border-ai/20 bg-ai-soft p-3">
            <div className="mb-1.5 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-ai" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ai-ink">
                AI summary
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
            At a <strong className="text-foreground">{params.annualRate}%</strong>{' '}
            rate over{' '}
            <strong className="text-foreground">
              {formatMonths(params.tenureMonths)}
            </strong>
            , every unit borrowed becomes{' '}
            <strong className="text-foreground">
              {multiplier.toFixed(2)}×
            </strong>{' '}
            by payoff — that is{' '}
            <strong className="text-foreground">{fmt(result.totalInterest)}</strong>{' '}
            of interest on top of your {fmt(params.principal)}.{' '}
            {firstRow && (
              <>
                In <strong className="text-foreground">month 1</strong>, only{' '}
                <strong className="text-foreground">{firstPrincipalPct}%</strong>{' '}
                of your payment reduces the balance — the rest is interest.{' '}
              </>
            )}
            {crossoverMonth > 0 && (
              <>
                That balance tips around{' '}
                <strong className="text-foreground">
                  month {crossoverMonth}
                </strong>{' '}
                (the amortization crossover), after which most of each payment
                finally attacks the principal.{' '}
              </>
            )}
            {interestRatio >= 0.5
              ? 'This is a heavy interest load — a shorter tenure, a lower rate, or early extra payments would each cut it sharply.'
              : 'Extra payments in the early years are the strongest lever — every unit then dodges the most compounded interest.'}
          </p>
          </div>

          {/* Metric cards — colored accent bar per metric */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tiles.map((t) => (
              <div
                key={t.label}
                className="flex gap-2 rounded-lg border p-3"
              >
                <div
                  className={`w-1 shrink-0 self-stretch rounded-full ${t.bar}`}
                />
                <div className="min-w-0">
                  <div className="text-[11px] leading-tight text-muted-foreground">
                    {t.label}
                  </div>
                  <div className="mt-1 text-base font-semibold">{t.value}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-muted-foreground">
            Interest is {interestPer100}% of the amount borrowed. Figures are
            computed from your inputs — not an estimate.
          </p>
        </div>
      )}
    </div>
  );
}
