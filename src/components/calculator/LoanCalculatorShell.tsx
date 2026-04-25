'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import LoanInputPanel from './LoanInputPanel';
import SummaryCards from './SummaryCards';
import ShareButton from './ShareButton';
import LoanParamsFromUrl from './LoanParamsFromUrl';

// Lazy load heavy components — keeps initial bundle small and FCP fast
const LoanPieChart       = dynamic(() => import('./LoanPieChart'),       { ssr: false });
const BalanceChart       = dynamic(() => import('./BalanceChart'),       { ssr: false });
const AmortizationTable  = dynamic(() => import('./AmortizationTable'),  { ssr: false });
const PrepaymentSimulator= dynamic(() => import('./PrepaymentSimulator'),{ ssr: false });
const RateSensitivity    = dynamic(() => import('./RateSensitivity'),    { ssr: false });
const LoanInsights       = dynamic(() => import('./LoanInsights'),       { ssr: false });
const ComparisonPanel    = dynamic(() => import('@/components/comparison/ComparisonPanel'),   { ssr: false });
const AffordabilityChecker = dynamic(() => import('@/components/affordability/AffordabilityChecker'), { ssr: false });
const LoanRestructure    = dynamic(() => import('./LoanRestructure'),    { ssr: false });
import { calculateEMI, generateAmortizationSchedule, simulatePrepayment } from '@/lib/loanCalculations';
import { LOAN_DEFAULTS } from '@/lib/constants';
import type { LoanParams, PrepaymentParams } from '@/types/loan';

interface Props {
  defaultParams?: Partial<LoanParams>;
}

export default function LoanCalculatorShell({ defaultParams }: Props) {
  const [loanParams, setLoanParams] = useState<LoanParams>({
    ...LOAN_DEFAULTS,
    ...defaultParams,
  });

  const [prepaymentParams, setPrepaymentParams] = useState<PrepaymentParams>({
    ...loanParams,
    extraMonthlyPayment: 0,
    lumpSumPayment: 0,
    lumpSumMonth: 12,
  });

  const [showPrepayment, setShowPrepayment] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');

  const handleLoanChange = (params: LoanParams) => {
    setLoanParams(params);
    setPrepaymentParams((p) => ({ ...p, ...params }));
  };

  const handleUrlParams = useCallback((params: Partial<LoanParams>) => {
    setLoanParams((prev) => ({ ...prev, ...params }));
  }, []);

  // Sync loan params → URL (debounced — browsers throttle replaceState calls)
  useEffect(() => {
    const id = setTimeout(() => {
      const sp = new URLSearchParams({
        p: String(loanParams.principal),
        r: String(loanParams.annualRate),
        t: String(loanParams.tenureMonths),
      });
      window.history.replaceState(null, '', `?${sp.toString()}`);
    }, 300);
    return () => clearTimeout(id);
  }, [loanParams]);

  const loanResult = useMemo(() => calculateEMI(loanParams), [loanParams]);

  const amortizationSchedule = useMemo(
    () => generateAmortizationSchedule(loanParams),
    [loanParams]
  );

  const prepaymentResult = useMemo(
    () => simulatePrepayment(prepaymentParams),
    [prepaymentParams]
  );

  const handleApplyAffordability = (params: LoanParams) => {
    handleLoanChange(params);
    setActiveTab('calculator');
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <Suspense fallback={null}>
        <LoanParamsFromUrl onParams={handleUrlParams} />
      </Suspense>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="-mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          <TabsList className="w-max sm:w-auto">
            <TabsTrigger value="calculator" className="text-xs sm:text-sm">Calculator</TabsTrigger>
            <TabsTrigger value="compare" className="text-xs sm:text-sm">Compare</TabsTrigger>
            <TabsTrigger value="affordability" className="text-xs sm:text-sm">Affordability</TabsTrigger>
            <TabsTrigger value="restructure" className="text-xs sm:text-sm">Restructure</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="calculator" className="space-y-6 mt-0">
          <div className="flex justify-end">
            <ShareButton />
          </div>

          <SummaryCards result={loanResult} params={loanParams} />

          <LoanInsights
            params={loanParams}
            result={loanResult}
            schedule={amortizationSchedule}
            onApplyQuickWin={(amount) => {
              setPrepaymentParams((p) => ({ ...p, extraMonthlyPayment: amount }));
              setShowPrepayment(true);
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="rounded-lg border p-5">
                <h2 className="text-base font-semibold mb-4">Loan Details</h2>
                <LoanInputPanel params={loanParams} onChange={handleLoanChange} />
              </div>

              <div className="rounded-lg border p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold">Prepayment</h2>
                  <button
                    onClick={() => setShowPrepayment((v) => !v)}
                    className="text-xs text-primary hover:underline"
                  >
                    {showPrepayment ? 'Hide' : 'Simulate'}
                  </button>
                </div>
                {showPrepayment ? (
                  <PrepaymentSimulator
                    params={prepaymentParams}
                    result={prepaymentResult}
                    baseInterest={loanResult.totalInterest}
                    baseTenure={loanParams.tenureMonths}
                    onChange={setPrepaymentParams}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Simulate extra monthly or lump sum payments to see how much you can save.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border p-5">
                <h2 className="text-base font-semibold mb-2">Principal vs Interest</h2>
                <LoanPieChart
                  principal={loanParams.principal}
                  totalInterest={loanResult.totalInterest}
                />
              </div>

              <div className="rounded-lg border p-5">
                <h2 className="text-base font-semibold mb-2">Balance Over Time</h2>
                <BalanceChart schedule={amortizationSchedule} />
              </div>
            </div>
          </div>

          <Separator />

          <AmortizationTable schedule={amortizationSchedule} />
          <RateSensitivity params={loanParams} />
        </TabsContent>

        <TabsContent value="compare" className="mt-0">
          <ComparisonPanel />
        </TabsContent>

        <TabsContent value="affordability" className="mt-0">
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <h2 className="text-base font-semibold">Affordability Check</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Find out the maximum loan you can afford based on your income.
              </p>
            </div>
            <AffordabilityChecker onApplyToCalculator={handleApplyAffordability} />
          </div>
        </TabsContent>

        <TabsContent value="restructure" className="mt-0">
          <div className="mb-4">
            <h2 className="text-base font-semibold">Loan Restructure Analyzer</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Evaluate whether settling your current loan early and refinancing makes financial sense.
            </p>
          </div>
          <LoanRestructure initialParams={loanParams} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
