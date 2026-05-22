'use client';

import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ReferenceLine, ResponsiveContainer,
} from 'recharts';
import type { AmortizationRow } from '@/types/loan';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';

interface Props {
  schedule: AmortizationRow[];
  /**
   * Optional baseline schedule. When provided, `schedule` is treated as
   * the accelerated/new plan and this is overlaid as a dashed reference
   * (original) so the user can see the difference extra payments make.
   */
  compareSchedule?: AmortizationRow[];
  /**
   * Amortization crossover month — Smart chart annotation. When set (and
   * not in comparison mode), a violet marker flags where the principal
   * portion of the payment overtakes the interest portion.
   */
  crossoverMonth?: number;
}

function abbreviateValue(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return String(Math.round(value));
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: number;
}) {
  const fmt = useCurrencyFormat();
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background p-2.5 shadow-sm text-xs space-y-1">
      <p className="font-semibold mb-1.5">Month {label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function BalanceChart({
  schedule,
  compareSchedule,
  crossoverMonth,
}: Props) {
  if (!schedule.length) return null;

  const comparing = !!compareSchedule && compareSchedule.length > 0;

  if (!comparing) {
    // ---- Original single-schedule view ----
    const step = schedule.length > 120 ? 6 : schedule.length > 60 ? 3 : 1;
    const data = schedule
      .filter((r) => r.month % step === 0 || r.month === schedule.length)
      .map((r) => ({
        month: r.month,
        balance: Math.round(r.closingBalance),
        interest: Math.round(r.cumulativeInterest),
      }));

    // Snap the crossover annotation to the nearest plotted month so the
    // ReferenceLine lands on a real category value.
    const markerMonth =
      crossoverMonth && crossoverMonth > 0 && data.length
        ? data.reduce(
            (best, d) =>
              Math.abs(d.month - crossoverMonth) <
              Math.abs(best - crossoverMonth)
                ? d.month
                : best,
            data[0].month,
          )
        : null;

    const xTickFormatter = (month: number) =>
      month % 12 === 0 ? `Yr ${month / 12}` : '';

    return (
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 24, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11 }}
              tickFormatter={xTickFormatter}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={abbreviateValue} width={52} />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              name="Outstanding Balance"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#gradBalance)"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="interest"
              name="Cumulative Interest"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#gradInterest)"
              dot={false}
              activeDot={{ r: 4 }}
            />
            {markerMonth !== null && (
              <ReferenceLine
                x={markerMonth}
                stroke="var(--ai)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                label={{
                  value: 'Crossover',
                  position: 'top',
                  fontSize: 10,
                  fill: 'var(--ai)',
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // ---- Comparison view: original (dashed) vs accelerated (filled) ----
  const baseSchedule = compareSchedule!;
  const maxLen = Math.max(schedule.length, baseSchedule.length);
  const step = maxLen > 120 ? 6 : maxLen > 60 ? 3 : 1;

  const at = (sch: AmortizationRow[], m: number) =>
    m <= sch.length ? sch[m - 1] : undefined;

  const months: number[] = [];
  for (let m = step; m <= maxLen; m += step) months.push(m);
  if (months[months.length - 1] !== maxLen) months.push(maxLen);

  const finalNewInterest =
    schedule[schedule.length - 1]?.cumulativeInterest ?? 0;
  const finalBaseInterest =
    baseSchedule[baseSchedule.length - 1]?.cumulativeInterest ?? 0;

  const data = months.map((m) => {
    const nRow = at(schedule, m);
    const bRow = at(baseSchedule, m);
    return {
      month: m,
      // Accelerated plan: balance hits 0 and interest stays flat after payoff.
      balance: nRow ? Math.round(nRow.closingBalance) : 0,
      interest: nRow
        ? Math.round(nRow.cumulativeInterest)
        : Math.round(finalNewInterest),
      origBalance: bRow ? Math.round(bRow.closingBalance) : 0,
      origInterest: bRow
        ? Math.round(bRow.cumulativeInterest)
        : Math.round(finalBaseInterest),
    };
  });

  const xTickFormatter = (month: number) =>
    month % 12 === 0 ? `Yr ${month / 12}` : '';

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 24, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11 }}
            tickFormatter={xTickFormatter}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={abbreviateValue} width={52} />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />

          {/* Original (reference) — dashed lines, no fill */}
          <Line
            type="monotone"
            dataKey="origBalance"
            name="Balance (original)"
            stroke="#3b82f6"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            strokeOpacity={0.55}
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="origInterest"
            name="Interest (original)"
            stroke="#f97316"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            strokeOpacity={0.55}
            dot={false}
            activeDot={{ r: 3 }}
          />

          {/* Accelerated (with extra payments) — solid filled areas */}
          <Area
            type="monotone"
            dataKey="balance"
            name="Balance (with extra)"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#gradBalance)"
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Area
            type="monotone"
            dataKey="interest"
            name="Interest (with extra)"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#gradInterest)"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
