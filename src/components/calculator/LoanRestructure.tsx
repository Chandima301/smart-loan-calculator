'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { NumericField } from '@/components/ui/numeric-field';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';
import { calculateRestructure, generateAmortizationSchedule } from '@/lib/loanCalculations';
import { LOAN_LIMITS, LOAN_DEFAULTS } from '@/lib/constants';
import { formatMonths } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import AiTakeBanner from '@/components/ai/AiTakeBanner';
import type { LoanParams } from '@/types/loan';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

interface Props {
  initialParams?: Partial<LoanParams>;
}

export default function LoanRestructure({ initialParams }: Props) {
  const fmt = useCurrencyFormat();
  const defaults = { ...LOAN_DEFAULTS, ...initialParams };

  // Current loan inputs
  const [principal, setPrincipal] = useState(defaults.principal);
  const [currentRate, setCurrentRate] = useState(defaults.annualRate);
  const [tenureMonths, setTenureMonths] = useState(defaults.tenureMonths);

  // Restructure inputs
  const [monthsPaid, setMonthsPaid] = useState(Math.max(1, Math.floor(defaults.tenureMonths / 4)));
  const [surchargeRate, setSurchargeRate] = useState(2);
  const [fixedFee, setFixedFee] = useState(0);
  const [newLoanOverride, setNewLoanOverride] = useState<number | null>(null);
  const [newRate, setNewRate] = useState(Math.max(LOAN_LIMITS.annualRate.min, defaults.annualRate - 2));
  const [newTenure, setNewTenure] = useState(defaults.tenureMonths);

  const schedule = useMemo(
    () => generateAmortizationSchedule({ principal, annualRate: currentRate, tenureMonths }),
    [principal, currentRate, tenureMonths]
  );

  const currentEMI = schedule[0]?.emi ?? 0;
  const maxMonthsPaid = Math.max(1, tenureMonths - 1);
  const safeMonthsPaid = Math.min(monthsPaid, maxMonthsPaid);

  // Compute base restructure amount independently so the new-loan input can reference it
  // without creating a circular dependency through `result`
  const baseRestructureAmount = useMemo(() => {
    const idx = Math.max(0, safeMonthsPaid - 1);
    const bal = schedule[idx]?.closingBalance ?? 0;
    return bal + bal * (surchargeRate / 100);
  }, [schedule, safeMonthsPaid, surchargeRate]);

  const effectiveNewLoan = newLoanOverride ?? baseRestructureAmount;

  const result = useMemo(
    () =>
      calculateRestructure(schedule, {
        monthsPaid: safeMonthsPaid,
        surchargeRate,
        fixedFee,
        newLoanPrincipal: newLoanOverride ?? undefined,
        newAnnualRate: newRate,
        newTenureMonths: newTenure,
      }),
    [schedule, safeMonthsPaid, surchargeRate, fixedFee, newLoanOverride, newRate, newTenure]
  );

  // Yellow zone: losing less than half the surcharge+fee — borderline case
  const totalUpfront = result.surchargeAmount + result.fixedFee;
  const verdictColor = result.isWorthIt
    ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30'
    : result.netSaving > -(totalUpfront * 0.5)
    ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30'
    : 'border-red-200 bg-red-50 dark:bg-red-950/30';

  const verdictIcon = result.isWorthIt ? (
    <CheckCircle className="h-5 w-5 text-emerald-600" />
  ) : Math.abs(result.netSaving) < totalUpfront * 0.5 ? (
    <AlertTriangle className="h-5 w-5 text-yellow-500" />
  ) : (
    <AlertTriangle className="h-5 w-5 text-red-500" />
  );

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-blue-200 bg-blue-50 dark:bg-blue-950/20 p-3 flex gap-2 text-sm text-blue-800 dark:text-blue-300">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          Enter your current loan details, how much you&apos;ve already paid, the bank&apos;s surcharge,
          any fixed fees, and the new loan terms to see if restructuring makes financial sense.
        </p>
      </div>

      <AiTakeBanner
        title={
          result.isWorthIt
            ? 'Refinancing looks worth it'
            : "Refinancing isn't worth it yet"
        }
        tone={result.isWorthIt ? 'positive' : 'caution'}
      >
        {result.isWorthIt ? (
          <>
            Moving from <strong>{currentRate.toFixed(2)}%</strong> to{' '}
            <strong>{newRate.toFixed(2)}%</strong> comes out ahead — you&apos;d{' '}
            {result.emiDifference < 0 && (
              <>
                cut your EMI by{' '}
                <strong>{fmt(Math.abs(result.emiDifference))}/mo</strong> and{' '}
              </>
            )}
            save <strong>{fmt(result.netSaving)}</strong> overall
            {result.breakEvenMonth !== null && (
              <>
                , recovering the upfront costs by{' '}
                {formatMonths(result.breakEvenMonth)}
              </>
            )}
            .
          </>
        ) : (
          <>
            Moving from <strong>{currentRate.toFixed(2)}%</strong> to{' '}
            <strong>{newRate.toFixed(2)}%</strong> doesn&apos;t pay off — the
            surcharge and new-loan interest outweigh the savings by{' '}
            <strong>{fmt(Math.abs(result.netSaving))}</strong>
            {newRate >= currentRate &&
              ' (the new rate is not actually lower than your current one)'}
            .
          </>
        )}
      </AiTakeBanner>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Inputs ── */}
        <div className="space-y-5">
          {/* Current loan terms */}
          <div className="rounded-lg border p-5 space-y-5">
            <h3 className="text-sm font-semibold">Current Loan Terms</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Loan Amount</Label>
                <span className="text-sm font-semibold text-primary">{fmt(principal)}</span>
              </div>
              <Slider
                min={LOAN_LIMITS.principal.min}
                max={LOAN_LIMITS.principal.max}
                step={LOAN_LIMITS.principal.step}
                value={[principal]}
                onValueChange={(val) => setPrincipal(sv(val))}
              />
              <NumericField
                value={principal}
                min={LOAN_LIMITS.principal.min}
                max={LOAN_LIMITS.principal.max}
                inputMode="numeric"
                onCommit={setPrincipal}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Current Interest Rate</Label>
                <span className="text-sm font-semibold text-primary">{currentRate.toFixed(1)}% p.a.</span>
              </div>
              <Slider
                min={LOAN_LIMITS.annualRate.min}
                max={LOAN_LIMITS.annualRate.max}
                step={0.1}
                value={[currentRate]}
                onValueChange={(val) => setCurrentRate(sv(val))}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Original Tenure</Label>
                <span className="text-sm font-semibold text-primary">{formatMonths(tenureMonths)}</span>
              </div>
              <Slider
                min={LOAN_LIMITS.tenureMonths.min}
                max={LOAN_LIMITS.tenureMonths.max}
                step={6}
                value={[tenureMonths]}
                onValueChange={(val) => setTenureMonths(sv(val))}
              />
            </div>

            <div className="pt-1 text-xs text-muted-foreground">
              Monthly EMI:{' '}
              <span className="font-medium text-foreground">{fmt(currentEMI)}</span>
            </div>
          </div>

          {/* Restructure details */}
          <div className="rounded-lg border p-5 space-y-5">
            <h3 className="text-sm font-semibold">Restructure Details</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Months Already Paid</Label>
                <span className="text-sm font-semibold text-primary">
                  {formatMonths(safeMonthsPaid)} of {formatMonths(tenureMonths)}
                </span>
              </div>
              <Slider
                min={1}
                max={maxMonthsPaid}
                step={1}
                value={[safeMonthsPaid]}
                onValueChange={(val) => setMonthsPaid(sv(val))}
              />
              <NumericField
                value={safeMonthsPaid}
                min={1}
                max={maxMonthsPaid}
                inputMode="numeric"
                onCommit={setMonthsPaid}
              />
              <p className="text-xs text-muted-foreground">
                Remaining balance:{' '}
                <span className="font-medium text-foreground">
                  {fmt(result.remainingBalance)}
                </span>
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Bank Surcharge on Remaining Capital</Label>
                <span className="text-sm font-semibold text-primary">{surchargeRate.toFixed(1)}%</span>
              </div>
              <Slider
                min={0}
                max={5}
                step={0.25}
                value={[surchargeRate]}
                onValueChange={(val) => setSurchargeRate(sv(val))}
              />
              <p className="text-xs text-muted-foreground">
                Surcharge amount:{' '}
                <span className="font-medium text-orange-600">{fmt(result.surchargeAmount)}</span>
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Fixed Fees</Label>
                <span className="text-xs text-muted-foreground">documents, insurance, etc.</span>
              </div>
              <NumericField
                value={fixedFee}
                min={0}
                inputMode="numeric"
                placeholder="0"
                onCommit={setFixedFee}
              />
              {fixedFee > 0 && (
                <p className="text-xs text-muted-foreground">
                  Total upfront cost:{' '}
                  <span className="font-medium text-foreground">
                    {fmt(result.surchargeAmount + result.fixedFee)}
                  </span>
                  {' '}→ Refinance amount:{' '}
                  <span className="font-medium text-foreground">
                    {fmt(result.restructureAmount)}
                  </span>
                </p>
              )}
              {fixedFee === 0 && (
                <p className="text-xs text-muted-foreground">
                  Total to refinance:{' '}
                  <span className="font-medium text-foreground">{fmt(result.restructureAmount)}</span>
                </p>
              )}
            </div>
          </div>

          {/* New loan terms */}
          <div className="rounded-lg border p-5 space-y-5">
            <h3 className="text-sm font-semibold">New Loan Terms</h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">New Loan Amount</Label>
                {newLoanOverride !== null && (
                  <button
                    className="text-xs text-primary hover:underline"
                    onClick={() => setNewLoanOverride(null)}
                  >
                    Reset to default
                  </button>
                )}
              </div>
              <NumericField
                value={effectiveNewLoan}
                min={1}
                inputMode="numeric"
                onCommit={setNewLoanOverride}
              />
              {result.capitalPayment > 0 && (
                <p className="text-xs text-blue-600 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  Capital payment of{' '}
                  <span className="font-medium">{fmt(result.capitalPayment)}</span>{' '}
                  paid upfront to reduce the new loan.
                </p>
              )}
              {result.topUpAmount > 0 && (
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Top-up of{' '}
                  <span className="font-medium">{fmt(result.topUpAmount)}</span>{' '}
                  extra cash on top of the restructured balance.
                </p>
              )}
              {result.capitalPayment === 0 && result.topUpAmount === 0 && (
                <p className="text-xs text-muted-foreground">
                  Default: remaining balance + surcharge ={' '}
                  <span className="font-medium text-foreground">{fmt(baseRestructureAmount)}</span>
                </p>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">New Interest Rate</Label>
                <span className="text-sm font-semibold text-primary">{newRate.toFixed(1)}% p.a.</span>
              </div>
              <Slider
                min={LOAN_LIMITS.annualRate.min}
                max={LOAN_LIMITS.annualRate.max}
                step={0.1}
                value={[newRate]}
                onValueChange={(val) => setNewRate(sv(val))}
              />
              {newRate >= currentRate && (
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  New rate is higher than current ({currentRate}%) — restructuring likely won&apos;t help.
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">New Tenure</Label>
                <span className="text-sm font-semibold text-primary">{formatMonths(newTenure)}</span>
              </div>
              <Slider
                min={LOAN_LIMITS.tenureMonths.min}
                max={LOAN_LIMITS.tenureMonths.max}
                step={6}
                value={[newTenure]}
                onValueChange={(val) => setNewTenure(sv(val))}
              />
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="space-y-4">
          {/* Verdict */}
          <div className={`rounded-xl border p-5 ${verdictColor}`}>
            <div className="flex items-center gap-3 mb-3">
              {verdictIcon}
              <div>
                <p className="font-bold text-base">
                  {result.isWorthIt ? 'Restructuring is worth it' : 'Restructuring is NOT recommended'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {result.isWorthIt
                    ? 'You save money overall by restructuring.'
                    : 'You will pay more in total by restructuring.'}
                </p>
              </div>
            </div>

            <div className={`text-2xl font-bold ${result.isWorthIt ? 'text-emerald-700' : 'text-red-600'}`}>
              {result.isWorthIt ? 'Save ' : 'Extra cost of '}
              {fmt(Math.abs(result.netSaving))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              net difference in total interest + surcharge
              {result.fixedFee > 0 ? ' + fees' : ''}
              {result.capitalPayment > 0 ? ' + capital payment' : ''}
            </p>
          </div>

          {/* Stacked comparison cards */}
          <div className="space-y-3">
            <Card>
              <CardContent className="pt-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Current Loan</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Monthly EMI</span>
                  <span className="font-medium text-right">{fmt(result.currentEMI)}</span>

                  <span className="text-muted-foreground">Months left</span>
                  <span className="font-medium text-right">{result.currentRemainingMonths}</span>

                  <span className="text-muted-foreground">Interest left</span>
                  <span className="font-medium text-right text-orange-600">
                    {fmt(result.remainingInterestCurrentLoan)}
                  </span>

                  <span className="text-muted-foreground">Extra costs</span>
                  <span className="font-medium text-right">None</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Total extra pay</span>
                  <span className="font-bold">{fmt(result.totalExtraCostCurrent)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardContent className="pt-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Restructured Loan</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <span className="text-muted-foreground">New loan amount</span>
                  <span className="font-medium text-right">{fmt(result.newLoanPrincipal)}</span>

                  <span className="text-muted-foreground">New EMI</span>
                  <span className={`font-medium text-right ${result.emiDifference < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {fmt(result.newLoanEMI)}{' '}
                    <span className="text-xs">
                      ({result.emiDifference > 0 ? '+' : ''}{fmt(result.emiDifference)})
                    </span>
                  </span>

                  <span className="text-muted-foreground">New tenure</span>
                  <span className="font-medium text-right">{formatMonths(newTenure)}</span>

                  <span className="text-muted-foreground">New interest</span>
                  <span className="font-medium text-right text-orange-600">
                    {fmt(result.newLoanTotalInterest)}
                  </span>

                  <span className="text-muted-foreground">Surcharge</span>
                  <span className="font-medium text-right text-red-500">
                    {fmt(result.surchargeAmount)}
                  </span>

                  {result.fixedFee > 0 && <>
                    <span className="text-muted-foreground">Fixed fees</span>
                    <span className="font-medium text-right text-red-500">
                      {fmt(result.fixedFee)}
                    </span>
                  </>}

                  {result.capitalPayment > 0 && <>
                    <span className="text-muted-foreground">Capital payment</span>
                    <span className="font-medium text-right text-red-500">
                      {fmt(result.capitalPayment)}
                    </span>
                  </>}

                  {result.topUpAmount > 0 && <>
                    <span className="text-muted-foreground">Top-up received</span>
                    <span className="font-medium text-right text-emerald-600">
                      +{fmt(result.topUpAmount)}
                    </span>
                  </>}
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Total extra pay</span>
                  <span className="font-bold">{fmt(result.totalExtraCostRestructured)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* EMI change badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`gap-1 ${result.emiDifference < 0 ? 'border-emerald-300 text-emerald-700' : 'border-red-300 text-red-700'}`}
            >
              {result.emiDifference < 0 ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <TrendingUp className="h-3 w-3" />
              )}
              EMI {result.emiDifference < 0 ? 'decreases' : 'increases'} by{' '}
              {fmt(Math.abs(result.emiDifference))}/mo
            </Badge>

            {result.breakEvenMonth !== null && (
              <Badge variant="outline" className="gap-1 border-blue-300 text-blue-700">
                <Clock className="h-3 w-3" />
                Break-even in {formatMonths(result.breakEvenMonth)}
              </Badge>
            )}
          </div>

          {/* Contextual advice */}
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground space-y-1.5">
            {result.isWorthIt && result.emiDifference < 0 && (
              <p>✓ Lower monthly EMI <em>and</em> lower total cost — ideal restructuring scenario.</p>
            )}
            {result.isWorthIt && result.emiDifference >= 0 && (
              <p>✓ Total cost is lower but your monthly EMI goes up. Only restructure if you can handle the higher payment.</p>
            )}
            {!result.isWorthIt && result.emiDifference < 0 && (
              <p>⚠ The upfront costs + new interest exceed what you&apos;d save. The lower EMI comes at a long-term cost.</p>
            )}
            {!result.isWorthIt && result.emiDifference >= 0 && (
              <p>✗ Both EMI and total cost are worse. Avoid this restructuring unless there&apos;s a non-financial reason.</p>
            )}
            {totalUpfront === 0 && (
              <p>💡 No upfront costs — even a slightly lower rate makes restructuring beneficial.</p>
            )}
            {result.breakEvenMonth !== null && (
              <p>
                💡 Despite the upfront costs, your monthly savings recover them in{' '}
                {formatMonths(result.breakEvenMonth)}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
