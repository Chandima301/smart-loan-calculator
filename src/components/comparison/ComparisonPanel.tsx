'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RotateCcw } from 'lucide-react';
import ScenarioCard from './ScenarioCard';
import ComparisonChart from './ComparisonChart';
import AiTakeBanner from '@/components/ai/AiTakeBanner';
import { useLoanComparisonStore } from '@/store/loanComparisonStore';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { LOAN_DEFAULTS, MAX_SCENARIOS } from '@/lib/constants';

export default function ComparisonPanel() {
  const { scenarios, addScenario, updateScenario, updateLabel, removeScenario, clearAll } =
    useLoanComparisonStore();
  const fmt = useCurrencyFormat();

  // Deterministic "AI verdict": rank the on-screen scenarios by total
  // interest and state the trade-off vs. the runner-up in plain English.
  const verdict = useMemo(() => {
    if (scenarios.length < 2) return null;
    const sorted = [...scenarios].sort(
      (a, b) => a.result.totalInterest - b.result.totalInterest,
    );
    const best = sorted[0];
    const runnerUp = sorted[1];
    const interestSaved = runnerUp.result.totalInterest - best.result.totalInterest;
    const emiDelta = best.result.emi - runnerUp.result.emi;
    const nearIdentical = interestSaved < best.result.totalRepayment * 0.005;
    return { best, runnerUp, interestSaved, emiDelta, nearIdentical };
  }, [scenarios]);

  return (
    <div className="space-y-6">
      {verdict && (
        <AiTakeBanner
          label="AI verdict"
          watch={`${verdict.best.id}:${Math.round(verdict.interestSaved)}:${Math.round(verdict.emiDelta)}`}
          title={
            verdict.nearIdentical
              ? 'These scenarios are nearly identical'
              : `${verdict.best.label} is the cheaper loan`
          }
        >
          {verdict.nearIdentical ? (
            <>
              Total interest comes within{' '}
              <strong>{fmt(verdict.interestSaved)}</strong> across these
              scenarios — small enough that, in practice, the math is a wash.
              When the numbers sit this close the decision shifts away from
              the spreadsheet and onto the lender itself: processing fees,
              prepayment flexibility, approval speed and customer service.
              Pick the lender you trust most rather than chasing a marginal
              difference that everyday banking quirks will erase anyway.
            </>
          ) : verdict.emiDelta <= 0 ? (
            <>
              <strong>{verdict.best.label}</strong> is the clear winner — it
              costs <strong>{fmt(Math.abs(verdict.emiDelta))}/mo less</strong>{' '}
              than {verdict.runnerUp.label} <em>and</em> saves{' '}
              <strong>{fmt(verdict.interestSaved)}</strong> in total interest
              across the life of the loan. Normally a lighter monthly payment
              is bought with a longer term or a higher rate, so you trade one
              for the other — but here {verdict.best.label} beats{' '}
              {verdict.runnerUp.label} on both counts at once, which means
              there is genuinely no downside to weigh. Lock it in unless the
              lender&apos;s other terms give you a clear reason not to.
            </>
          ) : (
            <>
              <strong>{verdict.best.label}</strong> saves{' '}
              <strong>{fmt(verdict.interestSaved)}</strong> in total interest,
              but it costs <strong>{fmt(verdict.emiDelta)}/mo more</strong>{' '}
              than {verdict.runnerUp.label}. That is the classic shorter-term
              trade-off — a heavier payment now in exchange for far less paid
              overall, because your money spends less time accruing interest.
              It is the better deal <em>if</em> your budget can absorb the
              higher payment without strain; if cash flow is tight, the
              lighter payment on {verdict.runnerUp.label} — and the breathing
              room it leaves each month — can be worth the extra interest.
            </>
          )}
        </AiTakeBanner>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Compare up to {MAX_SCENARIOS} loan scenarios side-by-side.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => addScenario(LOAN_DEFAULTS)}
            disabled={scenarios.length >= MAX_SCENARIOS}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            onUpdate={updateScenario}
            onUpdateLabel={updateLabel}
            onRemove={removeScenario}
            canRemove={scenarios.length > 1}
          />
        ))}
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-4">Visual Comparison</h3>
        <ComparisonChart scenarios={scenarios} />
      </div>
    </div>
  );
}
