'use client';

import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import type { LoanResult, LoanParams } from '@/types/loan';
import { formatPercent } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';

interface Props {
  result: LoanResult;
  params: LoanParams;
}

/** Inline `?` explainer — static, AI-written definition of a metric. */
function MetricExplainer({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label="What does this mean?"
        className="ml-1 inline-flex align-middle text-muted-foreground/50 transition-colors hover:text-ai"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[240px] text-xs leading-relaxed">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

export default function SummaryCards({ result, params }: Props) {
  const fmt = useCurrencyFormat();
  const interestPct = (result.totalInterest / params.principal) * 100;
  const multiplier = result.totalRepayment / params.principal;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Monthly EMI
            <MetricExplainer text="Equated Monthly Installment — the fixed amount you pay every month, covering both interest and principal." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary truncate">{fmt(result.emi)}</p>
          <p className="text-xs text-muted-foreground mt-1">per month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Interest
            <MetricExplainer text="The total interest you pay over the full loan term, on top of the amount you originally borrowed." />
          </CardTitle>
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
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Repayment
            <MetricExplainer text="Principal plus total interest — everything you will have paid by the time the loan closes." />
          </CardTitle>
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
