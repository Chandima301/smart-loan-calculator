'use client';

import { useMemo, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NumericField } from '@/components/ui/numeric-field';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { calculateDirectLoanBreakdown } from '@/lib/studentLoanCalculations';
import { LOAN_LIMITS } from '@/lib/constants';
import { ShieldCheck, TrendingUp, ArrowUpRight, GraduationCap } from 'lucide-react';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

const AMOUNT = { min: 1_000, max: 200_000, step: 500 };

function StatRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={strong ? 'font-semibold text-foreground' : 'font-medium text-foreground'}>
        {value}
      </span>
    </div>
  );
}

export default function DirectLoanBreakdown() {
  const fmt = useCurrencyFormat();

  const [principal, setPrincipal] = useState(20_000);
  const [annualRate, setAnnualRate] = useState(6.53);
  const [yearsInSchool, setYearsInSchool] = useState(4);
  const [repaymentYears, setRepaymentYears] = useState(10);

  const result = useMemo(
    () =>
      calculateDirectLoanBreakdown({
        principal,
        annualRate,
        yearsInSchool,
        repaymentMonths: repaymentYears * 12,
      }),
    [principal, annualRate, yearsInSchool, repaymentYears],
  );

  const { subsidized, unsubsidized } = result;

  return (
    <section className="border-t bg-muted/30">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        {/* Section header with badge */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              Bonus Tool
            </p>
            <h2 className="text-lg font-semibold sm:text-xl">
              Direct Subsidized vs Unsubsidized Comparison
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground leading-relaxed">
              The key difference: on a <strong>Direct Subsidized</strong> loan the government
              covers interest while you&apos;re in school. On <strong>Direct Unsubsidized</strong>,
              interest accrues from day one and capitalizes at repayment — you pay interest on interest.
            </p>
          </div>
        </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Your Direct Loan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount borrowed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Amount Borrowed</Label>
                <span className="text-sm font-semibold text-primary">{fmt(principal)}</span>
              </div>
              <Slider
                min={AMOUNT.min}
                max={AMOUNT.max}
                step={AMOUNT.step}
                value={[principal]}
                onValueChange={(v) => setPrincipal(sv(v))}
              />
              <NumericField
                value={principal}
                inputMode="numeric"
                min={AMOUNT.min}
                max={AMOUNT.max}
                onCommit={setPrincipal}
              />
            </div>

            {/* Interest rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Annual Interest Rate</Label>
                <span className="text-sm font-semibold text-primary">{annualRate.toFixed(2)}% p.a.</span>
              </div>
              <Slider
                min={LOAN_LIMITS.annualRate.min}
                max={15}
                step={LOAN_LIMITS.annualRate.step}
                value={[annualRate]}
                onValueChange={(v) => setAnnualRate(sv(v))}
              />
              <NumericField
                value={annualRate}
                inputMode="decimal"
                min={LOAN_LIMITS.annualRate.min}
                max={15}
                onCommit={setAnnualRate}
              />
            </div>

            {/* Years in school */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Years in School</Label>
                <span className="text-sm font-semibold text-primary">{yearsInSchool} yr</span>
              </div>
              <Slider
                min={0}
                max={8}
                step={1}
                value={[yearsInSchool]}
                onValueChange={(v) => setYearsInSchool(sv(v))}
              />
              <p className="text-[11px] text-muted-foreground">
                Time enrolled at least half-time before repayment, plus a 6-month grace period.
              </p>
            </div>

            {/* Repayment term */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Repayment Term</Label>
                <span className="text-sm font-semibold text-primary">{repaymentYears} years</span>
              </div>
              <Slider
                min={5}
                max={25}
                step={1}
                value={[repaymentYears]}
                onValueChange={(v) => setRepaymentYears(sv(v))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Subsidized */}
            <Card className="border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  Direct Subsidized
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly payment</p>
                  <p className="text-2xl font-bold">{fmt(subsidized.monthlyPayment)}</p>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <StatRow label="Interest in school" value={fmt(subsidized.interestInSchool)} />
                  <StatRow label="Balance at repayment" value={fmt(subsidized.balanceAtRepayment)} />
                  <StatRow label="Total interest" value={fmt(subsidized.totalInterest)} />
                  <StatRow label="Total cost" value={fmt(subsidized.totalCost)} strong />
                </div>
                <p className="text-[11px] text-emerald-700/90 dark:text-emerald-400/90 leading-relaxed">
                  The government pays the in-school interest — nothing capitalizes.
                </p>
              </CardContent>
            </Card>

            {/* Unsubsidized */}
            <Card className="border-amber-200 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wide text-amber-700 dark:text-amber-500">
                  <TrendingUp className="h-4 w-4 shrink-0" />
                  Direct Unsubsidized
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly payment</p>
                  <p className="text-2xl font-bold">{fmt(unsubsidized.monthlyPayment)}</p>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <StatRow label="Interest in school" value={fmt(unsubsidized.interestInSchool)} />
                  <StatRow label="Balance at repayment" value={fmt(unsubsidized.balanceAtRepayment)} />
                  <StatRow label="Total interest" value={fmt(unsubsidized.totalInterest)} />
                  <StatRow label="Total cost" value={fmt(unsubsidized.totalCost)} strong />
                </div>
                <p className="text-[11px] text-amber-700/90 dark:text-amber-500/90 leading-relaxed">
                  In-school interest capitalizes into principal when repayment starts.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cost of going unsubsidized */}
          <Card className="border-primary/40 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">What Unsubsidized Costs You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Extra lifetime interest</p>
                    <p className="text-lg font-bold text-primary">
                      {fmt(result.extraInterestUnsubsidized)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Higher monthly payment</p>
                    <p className="text-lg font-bold text-primary">
                      {fmt(result.extraMonthlyUnsubsidized)}/mo
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                Over {result.inSchoolMonths} months in school and grace, the unsubsidized loan accrues{' '}
                <strong>{fmt(unsubsidized.interestInSchool)}</strong> in interest that capitalizes into
                your balance. You can avoid most of this by paying the interest as it accrues while
                still in school — even small interest-only payments stop the balance from ballooning
                before repayment begins.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </section>
  );
}
