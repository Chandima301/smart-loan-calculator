'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { AmortizationRow } from '@/types/loan';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';

interface Props {
  schedule: AmortizationRow[];
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

export default function BalanceChart({ schedule }: Props) {
  if (!schedule.length) return null;

  const step = schedule.length > 120 ? 6 : schedule.length > 60 ? 3 : 1;
  const data = schedule
    .filter((r) => r.month % step === 0 || r.month === schedule.length)
    .map((r) => ({
      month: r.month,
      balance: Math.round(r.closingBalance),
      interest: Math.round(r.cumulativeInterest),
    }));

  const xTickFormatter = (month: number) =>
    month % 12 === 0 ? `Yr ${month / 12}` : '';

  return (
    <div style={{ height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
