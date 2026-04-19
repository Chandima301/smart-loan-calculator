'use client';

import { useState, useMemo } from 'react';
import type { LoanParams, LoanResult, AmortizationRow } from '@/types/loan';
import { formatMonths } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { simulatePrepayment } from '@/lib/loanCalculations';
import { AlertTriangle, TrendingDown, Lightbulb, Clock, BadgeInfo, ChevronDown, Zap } from 'lucide-react';

interface Props {
  params: LoanParams;
  result: LoanResult;
  schedule: AmortizationRow[];
  onApplyQuickWin: (amount: number) => void;
}

function getHealth(ratio: number) {
  if (ratio < 0.25) return { label: 'Excellent', dot: 'bg-emerald-500', text: 'text-emerald-700', pill: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40' };
  if (ratio < 0.50) return { label: 'Fair',      dot: 'bg-yellow-400', text: 'text-yellow-700', pill: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40' };
  if (ratio < 1.0)  return { label: 'High',      dot: 'bg-orange-500', text: 'text-orange-700', pill: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40' };
  return              { label: 'Very High',  dot: 'bg-red-500',    text: 'text-red-700',    pill: 'bg-red-100 text-red-700 dark:bg-red-900/40' };
}

const ACCENT: Record<string, { bar: string; icon: string }> = {
  health:   { bar: 'bg-current', icon: '' },
  cost:     { bar: 'bg-blue-400',   icon: 'text-blue-500' },
  emi:      { bar: 'bg-purple-400', icon: 'text-purple-500' },
  mid:      { bar: 'bg-amber-400',  icon: 'text-amber-500' },
  tip:      { bar: 'bg-emerald-400',icon: 'text-emerald-500' },
};

export default function LoanInsights({ params, result, schedule, onApplyQuickWin }: Props) {
  const [open, setOpen] = useState(false);

  const fmt = useCurrencyFormat();
  const interestRatio = result.totalInterest / params.principal;
  const health = getHealth(interestRatio);
  const costPer100 = ((result.totalRepayment / params.principal) * 100).toFixed(0);

  const firstRow = schedule[0];
  const firstPrincipalPct = firstRow ? ((firstRow.principalComponent / firstRow.emi) * 100).toFixed(0) : '0';
  const firstInterestPct  = firstRow ? ((firstRow.interestComponent  / firstRow.emi) * 100).toFixed(0) : '0';

  const midpointMonth = useMemo(() => {
    let cum = 0;
    for (const row of schedule) {
      cum += row.principalComponent;
      if (cum >= params.principal / 2) return row.month;
    }
    return schedule.length;
  }, [schedule, params.principal]);

  const quickWinAmount = Math.round(params.principal * 0.005 / 1000) * 1000 || 5000;
  const quickWinResult = useMemo(() => simulatePrepayment({
    ...params, extraMonthlyPayment: quickWinAmount, lumpSumPayment: 0, lumpSumMonth: 1,
  }), [params, quickWinAmount]);

  const insights = [
    {
      key: 'health',
      icon: interestRatio >= 0.5 ? <AlertTriangle className="h-3.5 w-3.5" /> : <BadgeInfo className="h-3.5 w-3.5" />,
      iconClass: health.text,
      label: 'Interest burden',
      value: interestRatio >= 1
        ? `${((interestRatio) * 100).toFixed(0)}% more than borrowed`
        : `${(interestRatio * 100).toFixed(0)}% of principal`,
      valueClass: health.text,
      detail: interestRatio >= 1
        ? "You're paying MORE in interest than your loan — consider renegotiating."
        : interestRatio >= 0.5
        ? "Significant interest. A shorter tenure or lower rate would help."
        : interestRatio >= 0.25
        ? "Moderate interest burden. Consider prepayments to reduce it."
        : "Very low interest burden — great loan terms.",
    },
    {
      key: 'cost',
      icon: <TrendingDown className="h-3.5 w-3.5" />,
      iconClass: ACCENT.cost.icon,
      label: 'Cost per 100 borrowed',
      value: `${costPer100} repaid`,
      valueClass: 'text-blue-600',
      detail: `For every 100 borrowed you repay ${costPer100} in total.`,
    },
    {
      key: 'emi',
      icon: <Clock className="h-3.5 w-3.5" />,
      iconClass: ACCENT.emi.icon,
      label: 'Month 1 split',
      value: `${firstPrincipalPct}% principal · ${firstInterestPct}% interest`,
      valueClass: 'text-purple-600',
      detail: `Only ${firstPrincipalPct}% of your first EMI reduces debt — ${firstInterestPct}% is pure interest.`,
    },
    {
      key: 'mid',
      icon: <Clock className="h-3.5 w-3.5" />,
      iconClass: ACCENT.mid.icon,
      label: '50% paid off',
      value: `Month ${midpointMonth} of ${params.tenureMonths}`,
      valueClass: 'text-amber-600',
      detail: `You won't clear half your loan until month ${midpointMonth} — ${formatMonths(midpointMonth)} in.`,
    },
    ...(quickWinResult.interestSaved > 0 ? [{
      key: 'tip',
      icon: <Lightbulb className="h-3.5 w-3.5" />,
      iconClass: ACCENT.tip.icon,
      label: 'Quick win',
      value: `Save ${fmt(quickWinResult.interestSaved)}`,
      valueClass: 'text-emerald-600',
      detail: `Add ${fmt(quickWinAmount)}/mo extra → save ${fmt(quickWinResult.interestSaved)} & cut ${formatMonths(quickWinResult.monthsSaved)}.`,
      action: { label: 'Apply', onClick: () => onApplyQuickWin(quickWinAmount) },
    }] : []),
  ];

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Loan Insights</span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${health.pill}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${health.dot}`} />
            {health.label}
          </span>
          {/* Collapsed preview pills */}
          {!open && (
            <div className="hidden sm:flex items-center gap-1.5">
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
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable body */}
      {open && (
        <div className="border-t divide-y">
          {insights.map((ins) => (
            <div key={ins.key} className="flex items-start gap-3 px-4 py-3">
              <div className={`mt-1 w-0.5 self-stretch rounded-full ${ACCENT[ins.key]?.bar ?? 'bg-muted'} shrink-0`} />
              <span className={`mt-0.5 shrink-0 ${ins.iconClass}`}>{ins.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-xs text-muted-foreground">{ins.label}</span>
                  <span className={`text-sm font-semibold ${ins.valueClass}`}>{ins.value}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{ins.detail}</p>
              </div>
              {'action' in ins && ins.action && (
                <button
                  onClick={ins.action.onClick}
                  className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-medium px-2.5 py-1 transition-all"
                >
                  <Zap className="h-3 w-3" />
                  {ins.action.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
