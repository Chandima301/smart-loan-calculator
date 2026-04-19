'use client';

import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { AmortizationRow } from '@/types/loan';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';

const PAGE_SIZE = 12;

interface Props {
  schedule: AmortizationRow[];
}

export default function AmortizationTable({ schedule }: Props) {
  const fmt = useCurrencyFormat();
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const rows = showAll ? schedule : schedule.slice(0, PAGE_SIZE);

  return (
    <div className="space-y-2">
      <Button variant="outline" size="sm" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Hide' : 'Show'} Amortization Table ({schedule.length} months)
      </Button>

      {visible && (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Month</TableHead>
                <TableHead>Opening Balance</TableHead>
                <TableHead>EMI</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Closing Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.month}
                  className={row.month === schedule.length ? 'font-medium bg-muted/50' : ''}
                >
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{fmt(row.openingBalance)}</TableCell>
                  <TableCell>{fmt(row.emi)}</TableCell>
                  <TableCell className="text-blue-600">{fmt(row.principalComponent)}</TableCell>
                  <TableCell className="text-orange-600">{fmt(row.interestComponent)}</TableCell>
                  <TableCell>{fmt(row.closingBalance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!showAll && schedule.length > PAGE_SIZE && (
            <div className="p-3 text-center border-t">
              <Button variant="ghost" size="sm" onClick={() => setShowAll(true)}>
                Show all {schedule.length} rows
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
