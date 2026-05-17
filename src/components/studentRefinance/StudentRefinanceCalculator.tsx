'use client';

import { useCallback, useMemo, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NumericField } from '@/components/ui/numeric-field';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { calculateStudentRefinance } from '@/lib/studentRefinanceCalculations';
import { TrendingDown, Wallet, ShieldX } from 'lucide-react';
import DownloadPdfButton from '@/components/calculator/DownloadPdfButton';
import { useSettingsStore } from '@/store/settingsStore';
import { pdfMoney } from '@/lib/pdf/pdfFormat';
import type { LoanSummaryPdfInput } from '@/lib/pdf/loanSummaryPdf';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

/** Federal protections permanently lost when refinancing into a private loan. */
const FORFEITED = [
  'Income-driven repayment (SAVE / PAYE / IBR) — payment capped at a share of income',
  'PSLF eligibility — tax-free forgiveness after 120 qualifying public-service payments',
  'IDR forgiveness after 20–25 years on an income-driven plan',
  'Unemployment deferment and economic-hardship forbearance',
  'Death and total-permanent-disability discharge',
  'Eligibility for any future federal student-loan relief programs',
];

export default function StudentRefinanceCalculator() {
  const fmt = useCurrencyFormat();

  const [balance, setBalance] = useState(40_000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [remainingYears, setRemainingYears] = useState(10);
  const [newRate, setNewRate] = useState(5.0);
  const [newTermYears, setNewTermYears] = useState(10);
  const [refinanceFee, setRefinanceFee] = useState(0);

  const currencyCode = useSettingsStore((s) => s.currencyCode);

  const result = useMemo(
    () =>
      calculateStudentRefinance({
        balance,
        currentRate,
        remainingMonths: remainingYears * 12,
        newRate,
        newTermMonths: newTermYears * 12,
        refinanceFee,
      }),
    [balance, currentRate, remainingYears, newRate, newTermYears, refinanceFee],
  );

  const getPdfInput = useCallback((): LoanSummaryPdfInput => {
    const money = (v: number) => pdfMoney(v, currencyCode);
    return {
      documentTitle: 'Student Loan Refinance Calculator — Summary',
      generatedOn: new Date().toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      sections: [
        {
          heading: 'Your Federal Loan & Refinance Offer',
          rows: [
            { label: 'Federal loan balance', value: money(balance) },
            { label: 'Current federal rate', value: `${currentRate.toFixed(2)}% p.a.` },
            { label: 'Years remaining (federal)', value: `${remainingYears} yr` },
            { label: 'New private rate', value: `${newRate.toFixed(2)}% p.a.` },
            { label: 'New private term', value: `${newTermYears} yr` },
            { label: 'Refinance fee', value: money(refinanceFee) },
          ],
        },
        {
          heading: 'Keep Federal Loans',
          rows: [
            { label: 'Monthly payment', value: money(result.federalMonthly) },
            { label: 'Total interest', value: money(result.federalTotalInterest) },
            { label: 'Total paid', value: money(result.federalTotalPaid) },
          ],
        },
        {
          heading: 'Private Refinance',
          rows: [
            { label: 'Monthly payment', value: money(result.privateMonthly) },
            { label: 'Total interest', value: money(result.privateTotalInterest) },
            { label: 'Total paid', value: money(result.privateTotalPaid) },
          ],
        },
        {
          heading: 'The Money Side',
          rows: [
            {
              label: 'Lifetime interest change',
              value: `${result.lifetimeInterestDelta >= 0 ? 'Save ' : 'Costs '}${money(Math.abs(result.lifetimeInterestDelta))}`,
            },
            {
              label: 'Monthly payment change',
              value: `${result.monthlyDelta >= 0 ? '−' : '+'}${money(Math.abs(result.monthlyDelta))} / mo`,
            },
          ],
        },
        {
          heading: 'What You Permanently Forfeit (Irreversible)',
          rows: FORFEITED.map((item) => ({ label: `• ${item}`, value: '' })),
        },
      ],
      fileSlug: 'student-loan-refinance',
      disclaimer:
        'Refinancing federal → private is irreversible. Estimate only — verify terms with your lender.',
    };
  }, [
    currencyCode,
    balance,
    currentRate,
    remainingYears,
    newRate,
    newTermYears,
    refinanceFee,
    result,
  ]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Your Federal Loan &amp; Refinance Offer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Balance */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Federal Loan Balance</Label>
                <span className="text-sm font-semibold text-primary">{fmt(balance)}</span>
              </div>
              <Slider
                min={5_000}
                max={300_000}
                step={1_000}
                value={[balance]}
                onValueChange={(v) => setBalance(sv(v))}
              />
              <NumericField
                value={balance}
                inputMode="numeric"
                min={5_000}
                max={300_000}
                onCommit={setBalance}
              />
            </div>

            {/* Current federal rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Current Federal Rate</Label>
                <span className="text-sm font-semibold text-primary">{currentRate.toFixed(2)}% p.a.</span>
              </div>
              <Slider
                min={0.5}
                max={15}
                step={0.1}
                value={[currentRate]}
                onValueChange={(v) => setCurrentRate(sv(v))}
              />
              <NumericField
                value={currentRate}
                inputMode="decimal"
                min={0.5}
                max={15}
                onCommit={setCurrentRate}
              />
            </div>

            {/* Remaining term */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Years Remaining (Federal)</Label>
                <span className="text-sm font-semibold text-primary">{remainingYears} yr</span>
              </div>
              <Slider
                min={1}
                max={25}
                step={1}
                value={[remainingYears]}
                onValueChange={(v) => setRemainingYears(sv(v))}
              />
            </div>

            {/* New private rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">New Private Rate</Label>
                <span className="text-sm font-semibold text-primary">{newRate.toFixed(2)}% p.a.</span>
              </div>
              <Slider
                min={0.5}
                max={15}
                step={0.1}
                value={[newRate]}
                onValueChange={(v) => setNewRate(sv(v))}
              />
              <NumericField
                value={newRate}
                inputMode="decimal"
                min={0.5}
                max={15}
                onCommit={setNewRate}
              />
            </div>

            {/* New private term */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">New Private Term</Label>
                <span className="text-sm font-semibold text-primary">{newTermYears} yr</span>
              </div>
              <Slider
                min={1}
                max={20}
                step={1}
                value={[newTermYears]}
                onValueChange={(v) => setNewTermYears(sv(v))}
              />
            </div>

            {/* Refinance fee */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Refinance Fee (if any)</Label>
                <span className="text-sm font-semibold text-primary">{fmt(refinanceFee)}</span>
              </div>
              <Slider
                min={0}
                max={5_000}
                step={50}
                value={[refinanceFee]}
                onValueChange={(v) => setRefinanceFee(sv(v))}
              />
            </div>

          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">

          <div className="flex justify-end">
            <DownloadPdfButton getInput={getPdfInput} />
          </div>

          {/* Side-by-side */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                  Keep Federal Loans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly payment</p>
                  <p className="text-2xl font-bold">{fmt(result.federalMonthly)}</p>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total interest</span>
                    <span className="font-medium text-foreground">{fmt(result.federalTotalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total paid</span>
                    <span className="font-medium text-foreground">{fmt(result.federalTotalPaid)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/40 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide text-primary">
                  Private Refinance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly payment</p>
                  <p className="text-2xl font-bold">{fmt(result.privateMonthly)}</p>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total interest</span>
                    <span className="font-medium text-foreground">{fmt(result.privateTotalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total paid</span>
                    <span className="font-medium text-foreground">{fmt(result.privateTotalPaid)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Money delta */}
          <Card
            className={
              result.refinanceSavesInterest
                ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-900/50'
                : 'bg-muted/40'
            }
          >
            <CardHeader>
              <CardTitle className="text-base">The Money Side</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 p-2">
                    <TrendingDown className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Lifetime interest change</p>
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      {result.lifetimeInterestDelta >= 0 ? 'Save ' : 'Costs '}
                      {fmt(Math.abs(result.lifetimeInterestDelta))}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 p-2">
                    <Wallet className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly payment change</p>
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      {result.monthlyDelta >= 0 ? '−' : '+'}
                      {fmt(Math.abs(result.monthlyDelta))}/mo
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The non-negotiable warning — this is the point of the page */}
          <Card className="bg-gradient-to-br from-red-50 to-red-100/40 dark:from-red-950/40 dark:to-red-900/20 border-red-200 dark:border-red-900/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldX className="h-4 w-4 text-red-700 dark:text-red-400" />
                What You Permanently Forfeit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                Refinancing federal loans into a private loan is{' '}
                <strong>irreversible</strong> — you can never convert them
                back. Whatever the money side shows above, you are also
                giving up, forever:
              </p>
              <ul className="space-y-1.5 text-sm">
                {FORFEITED.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-red-600 dark:text-red-400 shrink-0">✕</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                Rule of thumb: refinance federal → private only if your
                income is high and stable, you will never want PSLF or an
                income-driven plan, and the rate drop is large enough to
                outweigh losing every protection above. If there is any
                doubt, keep the federal loans.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
