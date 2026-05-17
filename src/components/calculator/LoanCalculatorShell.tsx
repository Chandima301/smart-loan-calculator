'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import LoanInputPanel from './LoanInputPanel';
import SummaryCards from './SummaryCards';
import ShareButton from './ShareButton';
import DownloadPdfButton from './DownloadPdfButton';
import LoanParamsFromUrl from './LoanParamsFromUrl';
import { useSettingsStore } from '@/store/settingsStore';
import { pdfMoney, pdfMoneyRounded, pdfMonths } from '@/lib/pdf/pdfFormat';
import { formatPercent } from '@/lib/formatters';
import type { LoanSummaryPdfInput } from '@/lib/pdf/loanSummaryPdf';

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

export type TabValue = 'calculator' | 'compare' | 'affordability' | 'restructure';

const TAB_DEFS: { value: TabValue; label: string }[] = [
  { value: 'calculator', label: 'Calculator' },
  { value: 'compare', label: 'Compare' },
  { value: 'affordability', label: 'Affordability' },
  { value: 'restructure', label: 'Restructure' },
];

interface Props {
  defaultParams?: Partial<LoanParams>;
  /**
   * Which tab is the primary tool for this page. When set, that tab is
   * rendered FIRST in the tab bar and selected by default. Other tabs
   * remain available. Used e.g. by /refinance-calculator to lead with
   * the Restructure analyzer instead of the generic EMI calculator.
   */
  primaryTab?: TabValue;
  /**
   * Restrict which tabs render. Default: all four. Used e.g. by
   * /student-loan-payoff-calculator to drop the irrelevant Restructure
   * tab and keep only calculator + compare + affordability.
   */
  enabledTabs?: TabValue[];
  /**
   * Start with the prepayment simulator already expanded. For
   * payoff-focused pages where the extra-payment mechanic IS the point.
   */
  prepaymentDefaultOpen?: boolean;
  /**
   * Override the tab-bar label for specific tabs, e.g.
   * { calculator: 'Payoff Simulator' }.
   */
  tabLabels?: Partial<Record<TabValue, string>>;
  /**
   * Page name used in the downloadable PDF summary's title/footer,
   * e.g. "Mortgage Calculator". Falls back to a generic label.
   */
  pdfTitle?: string;
  /**
   * Filename stem for the PDF → `${pdfSlug}-loan-summary.pdf`.
   * e.g. "mortgage". Falls back to "loan".
   */
  pdfSlug?: string;
}

export default function LoanCalculatorShell({
  defaultParams,
  primaryTab,
  enabledTabs,
  prepaymentDefaultOpen,
  tabLabels,
  pdfTitle = 'Loan Calculator',
  pdfSlug = 'loan',
}: Props) {
  const currencyCode = useSettingsStore((s) => s.currencyCode);
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

  const [showPrepayment, setShowPrepayment] = useState(
    prepaymentDefaultOpen ?? false,
  );

  // Tabs available on this page (default: all four).
  const enabled = enabledTabs ?? TAB_DEFS.map((t) => t.value);
  const isEnabled = (t: TabValue) => enabled.includes(t);

  // Build the visible tab list: filter to enabled, apply label overrides,
  // then float the primaryTab to the front if it is enabled.
  const visibleTabs = TAB_DEFS.filter((t) => isEnabled(t.value)).map((t) => ({
    value: t.value,
    label: tabLabels?.[t.value] ?? t.label,
  }));
  const orderedTabs =
    primaryTab && isEnabled(primaryTab)
      ? [
          ...visibleTabs.filter((t) => t.value === primaryTab),
          ...visibleTabs.filter((t) => t.value !== primaryTab),
        ]
      : visibleTabs;

  const initialTab =
    primaryTab && isEnabled(primaryTab)
      ? primaryTab
      : (orderedTabs[0]?.value ?? 'calculator');
  const [activeTab, setActiveTab] = useState<string>(initialTab);

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

  // Built lazily on click (passed to DownloadPdfButton.getInput) so the
  // 360-row table array isn't constructed on every render.
  const getPdfInput = useCallback((): LoanSummaryPdfInput => {
    const money = (v: number) => pdfMoney(v, currencyCode);
    const moneyR = (v: number) => pdfMoneyRounded(v, currencyCode);

    const sections: LoanSummaryPdfInput['sections'] = [
      {
        heading: 'Loan Details',
        rows: [
          { label: 'Loan amount (principal)', value: money(loanParams.principal) },
          {
            label: 'Annual interest rate',
            value: `${loanParams.annualRate.toFixed(2)}% p.a.`,
          },
          {
            label: 'Loan tenure',
            value: `${pdfMonths(loanParams.tenureMonths)} (${loanParams.tenureMonths} months)`,
          },
        ],
      },
      {
        heading: 'Payment Summary',
        rows: [
          { label: 'Monthly payment (EMI)', value: money(loanResult.emi) },
          { label: 'Total interest payable', value: money(loanResult.totalInterest) },
          { label: 'Total repayment', value: money(loanResult.totalRepayment) },
          {
            label: 'Effective interest cost',
            value: formatPercent(loanResult.effectiveRate),
          },
        ],
      },
    ];

    const prepaymentActive =
      showPrepayment &&
      (prepaymentParams.extraMonthlyPayment > 0 ||
        prepaymentParams.lumpSumPayment > 0) &&
      prepaymentResult.monthsSaved > 0;

    if (prepaymentActive) {
      const ppRows: { label: string; value: string }[] = [];
      if (prepaymentParams.extraMonthlyPayment > 0) {
        ppRows.push({
          label: 'Extra monthly payment',
          value: money(prepaymentParams.extraMonthlyPayment),
        });
      }
      if (prepaymentParams.lumpSumPayment > 0) {
        ppRows.push({
          label: `Lump sum (month ${prepaymentParams.lumpSumMonth})`,
          value: money(prepaymentParams.lumpSumPayment),
        });
      }
      ppRows.push(
        {
          label: 'New payoff time',
          value: `${pdfMonths(prepaymentResult.newTenureMonths)} (${prepaymentResult.newTenureMonths} months)`,
        },
        { label: 'Time saved', value: pdfMonths(prepaymentResult.monthsSaved) },
        {
          label: 'Interest saved',
          value: money(prepaymentResult.interestSaved),
        },
      );
      sections.push({ heading: 'With Prepayment', rows: ppRows });
    }

    return {
      documentTitle: `${pdfTitle} — Summary`,
      generatedOn: new Date().toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      sections,
      table: {
        title: 'Amortization Schedule',
        head: [
          'Month',
          'Opening',
          'Payment',
          'Principal',
          'Interest',
          'Closing',
          'Cum. Interest',
        ],
        body: amortizationSchedule.map((r) => [
          String(r.month),
          moneyR(r.openingBalance),
          moneyR(r.emi),
          moneyR(r.principalComponent),
          moneyR(r.interestComponent),
          moneyR(r.closingBalance),
          moneyR(r.cumulativeInterest),
        ]),
      },
      fileSlug: pdfSlug,
    };
  }, [
    currencyCode,
    loanParams,
    loanResult,
    amortizationSchedule,
    showPrepayment,
    prepaymentParams,
    prepaymentResult,
    pdfTitle,
    pdfSlug,
  ]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <Suspense fallback={null}>
        <LoanParamsFromUrl onParams={handleUrlParams} />
      </Suspense>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="-mx-4 mb-6 flex justify-center-safe overflow-x-auto px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          <TabsList className="w-max sm:w-auto">
            {orderedTabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="text-xs sm:text-sm">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="calculator" className="space-y-6 mt-0">
          <div className="flex justify-end gap-2">
            <DownloadPdfButton getInput={getPdfInput} />
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

        {isEnabled('compare') && (
          <TabsContent value="compare" className="mt-0">
            <ComparisonPanel />
          </TabsContent>
        )}

        {isEnabled('affordability') && (
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
        )}

        {isEnabled('restructure') && (
          <TabsContent value="restructure" className="mt-0">
            <div className="mb-4">
              <h2 className="text-base font-semibold">Loan Restructure Analyzer</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Evaluate whether settling your current loan early and refinancing makes financial sense.
              </p>
            </div>
            <LoanRestructure initialParams={loanParams} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
