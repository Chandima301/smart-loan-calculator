'use client';

import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { calculateEMI } from '@/lib/loanCalculations';
import { LOAN_LIMITS } from '@/lib/constants';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import type { LoanParams } from '@/types/loan';

interface Props {
  params: LoanParams;
}

const OFFSETS = [-2, -1, 0, 1, 2] as const;

export default function RateSensitivity({ params }: Props) {
  const fmt = useCurrencyFormat();
  const [open, setOpen] = useState(false);

  const rows = OFFSETS.map((offset) => {
    const adjustedRate = Math.max(
      LOAN_LIMITS.annualRate.min,
      Math.min(LOAN_LIMITS.annualRate.max, params.annualRate + offset)
    );
    const result = calculateEMI({ ...params, annualRate: adjustedRate });
    return { offset, adjustedRate, emi: result.emi, totalInterest: result.totalInterest };
  });

  const baseline = rows.find((r) => r.offset === 0)!;

  return (
    <div className="space-y-2">
      <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide' : 'Show'} Rate Sensitivity
      </Button>

      {open && (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">Rate</TableHead>
                <TableHead>Monthly EMI</TableHead>
                <TableHead>Total Interest</TableHead>
                <TableHead>vs Current</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const isCurrent = row.offset === 0;
                const emiDelta = row.emi - baseline.emi;
                const deltaClass = isCurrent
                  ? 'text-muted-foreground'
                  : emiDelta > 0
                  ? 'text-red-600 font-medium'
                  : 'text-emerald-600 font-medium';

                return (
                  <TableRow key={row.offset} className={isCurrent ? 'bg-primary/5 font-semibold' : ''}>
                    <TableCell>
                      {row.adjustedRate.toFixed(1)}%
                      {isCurrent && (
                        <span className="ml-1 text-xs text-muted-foreground font-normal">(current)</span>
                      )}
                    </TableCell>
                    <TableCell>{fmt(row.emi)}</TableCell>
                    <TableCell>{fmt(row.totalInterest)}</TableCell>
                    <TableCell className={deltaClass}>
                      {isCurrent
                        ? '—'
                        : `${emiDelta > 0 ? '+' : ''}${fmt(emiDelta)}/mo`}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
