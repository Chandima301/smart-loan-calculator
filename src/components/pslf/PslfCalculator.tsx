'use client';

import { useCallback, useMemo, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NumericField } from '@/components/ui/numeric-field';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { calculatePslf, type StateGroup } from '@/lib/pslfCalculations';
import { GraduationCap, Gift, Wallet, AlertTriangle } from 'lucide-react';
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

const STATE_OPTIONS: { value: StateGroup; label: string }[] = [
  { value: 'contiguous', label: '48 States + DC' },
  { value: 'alaska', label: 'Alaska' },
  { value: 'hawaii', label: 'Hawaii' },
];

export default function PslfCalculator() {
  const fmt = useCurrencyFormat();

  const [balance, setBalance] = useState(50_000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [agi, setAgi] = useState(58_000);
  const [familySize, setFamilySize] = useState(1);
  const [stateGroup, setStateGroup] = useState<StateGroup>('contiguous');
  const [paymentsAlreadyMade, setPaymentsAlreadyMade] = useState(0);
  const [incomeGrowthPct, setIncomeGrowthPct] = useState(3);

  const regionLabel =
    STATE_OPTIONS.find((o) => o.value === stateGroup)?.label ?? '';

  const currencyCode = useSettingsStore((s) => s.currencyCode);

  const result = useMemo(
    () =>
      calculatePslf({
        balance,
        annualRate,
        agi,
        familySize,
        stateGroup,
        paymentsAlreadyMade,
        incomeGrowthPct,
      }),
    [balance, annualRate, agi, familySize, stateGroup, paymentsAlreadyMade, incomeGrowthPct],
  );

  const getPdfInput = useCallback((): LoanSummaryPdfInput => {
    const money = (v: number) => pdfMoney(v, currencyCode);

    const sections: LoanSummaryPdfInput['sections'] = [
      {
        heading: 'Your Federal Loan & Income',
        rows: [
          { label: 'Federal loan balance', value: money(balance) },
          { label: 'Interest rate', value: `${annualRate.toFixed(2)}% p.a.` },
          { label: 'Adjusted gross income', value: `${money(agi)} / yr` },
          { label: 'Family size', value: String(familySize) },
          { label: 'Poverty-guideline region', value: regionLabel },
          { label: 'Qualifying payments made', value: `${paymentsAlreadyMade} / 120` },
          { label: 'Assumed annual income growth', value: `${incomeGrowthPct.toFixed(1)}%` },
        ],
      },
      {
        heading: 'Standard 10-Year Plan',
        rows: [
          { label: 'Monthly payment', value: money(result.standardMonthlyPayment) },
          { label: 'Total paid', value: money(result.standardTotalPaid) },
          { label: 'Amount forgiven', value: money(0) },
        ],
      },
      {
        heading: 'PSLF (Income-Driven Repayment)',
        rows: [
          { label: 'Est. starting monthly payment', value: money(result.initialMonthlyPayment) },
          { label: 'Est. final monthly payment (yr 10)', value: money(result.finalMonthlyPayment) },
          { label: 'Total paid before forgiveness', value: money(result.totalPaidUnderPslf) },
          { label: 'Time to forgiveness', value: pdfMonths(result.monthsToForgiveness) },
        ],
      },
      {
        heading: 'How Your Monthly Payment Is Derived',
        rows: [
          { label: 'Adjusted gross income', value: money(agi) },
          {
            label: `− 1.5 × poverty guideline (${money(result.povertyGuideline)})`,
            value: `−${money(1.5 * result.povertyGuideline)}`,
          },
          { label: '= Discretionary income', value: money(result.discretionaryIncome) },
          { label: '× 10% ÷ 12 = est. monthly payment', value: money(result.initialMonthlyPayment) },
        ],
      },
    ];

    sections.push(
      result.paidOffBeforeForgiveness
        ? {
            heading: 'Estimated Outcome',
            rows: [
              { label: 'PSLF benefit', value: 'None at this income / debt level' },
              {
                label: 'Reason',
                value: 'Loan repaid before 120 payments — nothing left to forgive',
              },
            ],
          }
        : {
            heading: 'Your Estimated PSLF Outcome',
            rows: [
              { label: 'Forgiven tax-free', value: money(result.forgivenAmount) },
              { label: 'Net PSLF benefit', value: money(result.pslfBenefit) },
              { label: 'You pay over 10 yr', value: money(result.totalPaidUnderPslf) },
            ],
          },
    );

    return {
      documentTitle: 'PSLF Calculator — Summary',
      generatedOn: new Date().toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      sections,
      fileSlug: 'pslf',
      disclaimer:
        'Estimate for planning only — IDR rules & poverty guidelines change yearly. Confirm on StudentAid.gov.',
    };
  }, [
    currencyCode,
    balance,
    annualRate,
    agi,
    familySize,
    regionLabel,
    paymentsAlreadyMade,
    incomeGrowthPct,
    result,
  ]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-4 flex justify-end">
        <DownloadPdfButton getInput={getPdfInput} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Your Federal Loan &amp; Income</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Loan balance */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Federal Loan Balance</Label>
                <span className="text-sm font-semibold text-primary">{fmt(balance)}</span>
              </div>
              <Slider
                min={5_000}
                max={500_000}
                step={1_000}
                value={[balance]}
                onValueChange={(v) => setBalance(sv(v))}
              />
              <NumericField
                value={balance}
                inputMode="numeric"
                min={5_000}
                max={500_000}
                onCommit={setBalance}
              />
            </div>

            {/* Interest rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Interest Rate</Label>
                <span className="text-sm font-semibold text-primary">{annualRate.toFixed(2)}% p.a.</span>
              </div>
              <Slider
                min={0.5}
                max={15}
                step={0.1}
                value={[annualRate]}
                onValueChange={(v) => setAnnualRate(sv(v))}
              />
              <NumericField
                value={annualRate}
                inputMode="decimal"
                min={0.5}
                max={15}
                onCommit={setAnnualRate}
              />
            </div>

            {/* AGI */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Adjusted Gross Income</Label>
                <span className="text-sm font-semibold text-primary">{fmt(agi)} / yr</span>
              </div>
              <Slider
                min={0}
                max={300_000}
                step={1_000}
                value={[agi]}
                onValueChange={(v) => setAgi(sv(v))}
              />
              <NumericField
                value={agi}
                inputMode="numeric"
                min={0}
                max={300_000}
                onCommit={setAgi}
              />
            </div>

            {/* Family size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Family Size</Label>
                <span className="text-sm font-semibold text-primary">{familySize}</span>
              </div>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[familySize]}
                onValueChange={(v) => setFamilySize(sv(v))}
              />
            </div>

            {/* State group */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Poverty-Guideline Region</Label>
              <div className="flex gap-2">
                {STATE_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setStateGroup(o.value)}
                    className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                      stateGroup === o.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'hover:border-primary/50'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payments already made */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Qualifying Payments Made</Label>
                <span className="text-sm font-semibold text-primary">{paymentsAlreadyMade} / 120</span>
              </div>
              <Slider
                min={0}
                max={119}
                step={1}
                value={[paymentsAlreadyMade]}
                onValueChange={(v) => setPaymentsAlreadyMade(sv(v))}
              />
            </div>

            {/* Income growth */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Assumed Annual Income Growth</Label>
                <span className="text-sm font-semibold text-primary">{incomeGrowthPct.toFixed(1)}%</span>
              </div>
              <Slider
                min={0}
                max={10}
                step={0.5}
                value={[incomeGrowthPct]}
                onValueChange={(v) => setIncomeGrowthPct(sv(v))}
              />
            </div>

          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">

          {/* Side-by-side: PSLF path vs standard 10-year */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                  Standard 10-Year Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly payment</p>
                  <p className="text-2xl font-bold">{fmt(result.standardMonthlyPayment)}</p>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total paid</span>
                    <span className="font-medium text-foreground">{fmt(result.standardTotalPaid)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Forgiven</span>
                    <span className="font-medium text-foreground">{fmt(0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/40 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide text-primary">
                  PSLF (Income-Driven)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Est. starting payment</p>
                  <p className="text-2xl font-bold">{fmt(result.initialMonthlyPayment)}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    rises to ~{fmt(result.finalMonthlyPayment)} by year 10
                  </p>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Total paid</span>
                    <span className="font-medium text-foreground">{fmt(result.totalPaidUnderPslf)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time to forgiveness</span>
                    <span className="font-medium text-foreground">
                      {formatYearsMonths(result.monthsToForgiveness)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Derivation — makes the region / AGI / family-size effect visible */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                How Your Monthly Payment Is Derived
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Adjusted gross income</span>
                  <span className="font-medium">{fmt(agi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    − 1.5 × poverty guideline
                    <span className="block text-[11px]">
                      {regionLabel}, family of {familySize} · guideline{' '}
                      {fmt(result.povertyGuideline)}
                    </span>
                  </span>
                  <span className="font-medium">
                    −{fmt(1.5 * result.povertyGuideline)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-muted-foreground">= Discretionary income</span>
                  <span className="font-semibold">{fmt(result.discretionaryIncome)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-muted-foreground">
                    × 10% ÷ 12 = est. monthly payment
                  </span>
                  <span className="font-semibold text-primary">
                    {fmt(result.initialMonthlyPayment)}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                Switching the poverty-guideline region changes only the
                guideline figure above (Alaska and Hawaii are set higher than
                the 48 contiguous states), which flows through to a different
                discretionary income and payment.
              </p>
            </CardContent>
          </Card>

          {/* Headline outcome */}
          {result.paidOffBeforeForgiveness ? (
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20 border-amber-200 dark:border-amber-900/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  PSLF Provides No Benefit at This Income &amp; Debt Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  At this income relative to the loan balance, the
                  income-driven payment is large enough that the loan would be
                  fully repaid before reaching 120 qualifying payments — so
                  there is nothing left to forgive. PSLF is most valuable when
                  the balance is high relative to a modest public-service
                  income. Lower the income or raise the balance to see the
                  forgiveness scenario.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-900/50">
              <CardHeader>
                <CardTitle className="text-base">Your Estimated PSLF Outcome</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 p-2">
                      <Gift className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Forgiven tax-free</p>
                      <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                        {fmt(result.forgivenAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 p-2">
                      <Wallet className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Net PSLF benefit</p>
                      <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                        {fmt(result.pslfBenefit)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 p-2">
                      <GraduationCap className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">You pay over 10 yr</p>
                      <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                        {fmt(result.totalPaidUnderPslf)}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  Based on the common income-driven formula: payment ≈ 10% of
                  discretionary income, where discretionary income = AGI − 1.5 ×
                  the Federal Poverty Guideline for your family size. Your
                  estimated discretionary income is{' '}
                  <strong>{fmt(result.discretionaryIncome)}</strong>. This is an
                  estimate for planning only — exact IDR plan rules and poverty
                  guidelines change yearly. Confirm details on StudentAid.gov.
                </p>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
