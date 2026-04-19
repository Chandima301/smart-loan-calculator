'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LoanResult, LoanParams } from '@/types/loan';
import { formatPercent } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';

interface Props {
  result: LoanResult;
  params: LoanParams;
}

export default function SummaryCards({ result, params }: Props) {
  const fmt = useCurrencyFormat();
  const interestPct = (result.totalInterest / params.principal) * 100;
  const multiplier = result.totalRepayment / params.principal;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Monthly EMI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary truncate">{fmt(result.emi)}</p>
          <p className="text-xs text-muted-foreground mt-1">per month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold truncate">{fmt(result.totalInterest)}</p>
          <Badge variant="secondary" className="mt-1 text-xs whitespace-nowrap">
            {formatPercent(interestPct)} of principal
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Repayment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold truncate">{fmt(result.totalRepayment)}</p>
          <Badge variant="outline" className="mt-1 text-xs whitespace-nowrap">
            {multiplier.toFixed(2)}× principal
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
