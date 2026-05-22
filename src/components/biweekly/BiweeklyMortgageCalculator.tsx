'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NumericField } from '@/components/ui/numeric-field';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { calculateBiweekly } from '@/lib/biweeklyCalculations';
import { LOAN_LIMITS } from '@/lib/constants';
import { TrendingDown, Clock, Calendar } from 'lucide-react';
import DownloadPdfButton from '@/components/calculator/DownloadPdfButton';
import { useSettingsStore } from '@/store/settingsStore';
import { pdfMoney, pdfMonths } from '@/lib/pdf/pdfFormat';
import type { LoanSummaryPdfInput } from '@/lib/pdf/loanSummaryPdf';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

function formatYearsMonths(months: number): string {
  if (months <= 0) return '0 mo';
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr`;
  return `${y} yr ${m} mo`;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

export default function BiweeklyMortgageCalculator() {
  const fmt = useCurrencyFormat();

  const [principal, setPrincipal] = useState(300_000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [years, setYears] = useState(30);

  // Pre-fill from ?p=&r=&t= when arriving from another calculator
  // (e.g. the "Switch to biweekly" Smart Scenario). Client-only, runs once.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const p = Number(sp.get('p'));
    const r = Number(sp.get('r'));
    const t = Number(sp.get('t'));
    if (
      Number.isFinite(p) &&
      p >= LOAN_LIMITS.principal.min &&
      p <= LOAN_LIMITS.principal.max
    ) {
      setPrincipal(p);
    }
    if (
      Number.isFinite(r) &&
      r >= LOAN_LIMITS.annualRate.min &&
      r <= LOAN_LIMITS.annualRate.max
    ) {
      setAnnualRate(r);
    }
    if (Number.isFinite(t) && t >= 12) {
      setYears(Math.min(40, Math.max(1, Math.round(t / 12))));
    }
  }, []);

  const currencyCode = useSettingsStore((s) => s.currencyCode);

  const result = useMemo(
    () =>
      calculateBiweekly({
        principal,
        annualRate,
        tenureMonths: years * 12,
      }),
    [principal, annualRate, years],
  );

  const getPdfInput = useCallback((): LoanSummaryPdfInput => {
    const money = (v: number) => pdfMoney(v, currencyCode);
    return {
      documentTitle: 'Biweekly Mortgage Calculator — Summary',
      generatedOn: new Date().toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      sections: [
        {
          heading: 'Mortgage Details',
          rows: [
            { label: 'Mortgage amount', value: money(principal) },
            { label: 'Annual interest rate', value: `${annualRate.toFixed(2)}% p.a.` },
            { label: 'Loan term', value: `${years} years` },
          ],
        },
        {
          heading: 'Standard Monthly Plan',
          rows: [
            { label: 'Monthly payment', value: money(result.monthlyPayment) },
            { label: 'Total interest', value: money(result.monthlyTotalInterest) },
            { label: 'Total paid', value: money(result.monthlyTotalPaid) },
            { label: 'Payoff date', value: formatDate(result.payoffDateMonthly) },
          ],
        },
        {
          heading: 'Biweekly Plan',
          rows: [
            { label: 'Biweekly payment (every 14 days)', value: money(result.biweeklyPayment) },
            { label: 'Total interest', value: money(result.biweeklyTotalInterest) },
            { label: 'Total paid', value: money(result.biweeklyTotalPaid) },
            { label: 'Paid off in', value: pdfMonths(result.biweeklyMonths) },
            { label: 'Payoff date', value: formatDate(result.biweeklyPayoffDate) },
          ],
        },
        {
          heading: 'Your Savings with Biweekly Payments',
          rows: [
            { label: 'Interest saved', value: money(result.interestSaved) },
            { label: 'Time saved', value: pdfMonths(result.monthsSaved) },
          ],
        },
      ],
      fileSlug: 'biweekly-mortgage',
    };
  }, [currencyCode, principal, annualRate, years, result]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-4 flex justify-end">
        <DownloadPdfButton getInput={getPdfInput} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Mortgage Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Loan Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Mortgage Amount</Label>
                <span className="text-sm font-semibold text-primary">{fmt(principal)}</span>
              </div>
              <Slider
                min={LOAN_LIMITS.principal.min}
                max={LOAN_LIMITS.principal.max}
                step={LOAN_LIMITS.principal.step}
                value={[principal]}
                onValueChange={(v) => setPrincipal(sv(v))}
              />
              <NumericField
                value={principal}
                inputMode="numeric"
                min={LOAN_LIMITS.principal.min}
                max={LOAN_LIMITS.principal.max}
                onCommit={setPrincipal}
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Annual Interest Rate</Label>
                <span className="text-sm font-semibold text-primary">{annualRate.toFixed(2)}% p.a.</span>
              </div>
              <Slider
                min={LOAN_LIMITS.annualRate.min}
                max={LOAN_LIMITS.annualRate.max}
                step={LOAN_LIMITS.annualRate.step}
                value={[annualRate]}
                onValueChange={(v) => setAnnualRate(sv(v))}
              />
              <NumericField
                value={annualRate}
                inputMode="decimal"
                min={LOAN_LIMITS.annualRate.min}
                max={LOAN_LIMITS.annualRate.max}
                onCommit={setAnnualRate}
              />
            </div>

            {/* Term (years) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Loan Term</Label>
                <span className="text-sm font-semibold text-primary">{years} years</span>
              </div>
              <Slider
                min={5}
                max={30}
                step={1}
                value={[years]}
                onValueChange={(v) => setYears(sv(v))}
              />
              <NumericField
                value={years}
                inputMode="numeric"
                min={5}
                max={40}
                onCommit={setYears}
              />
            </div>

          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">

          {/* Side-by-side comparison */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                  Standard Monthly
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly payment</p>
                  <p className="text-2xl font-bold">{fmt(result.monthlyPayment)}</p>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total interest</span>
                    <span className="font-medium text-foreground">{fmt(result.monthlyTotalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total paid</span>
                    <span className="font-medium text-foreground">{fmt(result.monthlyTotalPaid)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payoff date</span>
                    <span className="font-medium text-foreground">{formatDate(result.payoffDateMonthly)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/40 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide text-primary">
                  Biweekly Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Biweekly payment</p>
                  <p className="text-2xl font-bold">{fmt(result.biweeklyPayment)}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    every 14 days · 26 payments / yr
                  </p>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total interest</span>
                    <span className="font-medium text-foreground">{fmt(result.biweeklyTotalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total paid</span>
                    <span className="font-medium text-foreground">{fmt(result.biweeklyTotalPaid)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payoff date</span>
                    <span className="font-medium text-foreground">{formatDate(result.biweeklyPayoffDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Savings highlight */}
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-900/50">
            <CardHeader>
              <CardTitle className="text-base">Your Savings with Biweekly Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 p-2">
                    <TrendingDown className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Interest saved</p>
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      {fmt(result.interestSaved)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 p-2">
                    <Clock className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time saved</p>
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      {formatYearsMonths(result.monthsSaved)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 p-2">
                    <Calendar className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Paid off in</p>
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      {formatYearsMonths(result.biweeklyMonths)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                Paying half your monthly payment every 14 days adds up to <strong>26 biweekly payments per year</strong>,
                or the equivalent of 13 monthly payments — one extra payment annually. That single extra payment
                shortens a typical 30-year mortgage by roughly 4–6 years and saves tens of thousands in interest.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
