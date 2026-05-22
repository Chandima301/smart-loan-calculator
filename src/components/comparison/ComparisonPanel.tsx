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

  // Deterministic "AI verdict": rank scenarios by interest cost per unit
  // borrowed (total interest ÷ principal) so loans of different sizes are
  // compared fairly — a smaller loan naturally has less total interest,
  // which a raw-total ranking would unfairly crown the "cheaper" loan.
  const verdict = useMemo(() => {
    if (scenarios.length < 2) return null;

    const ranked = scenarios
      .map((s) => ({
        s,
        ratio:
          s.params.principal > 0
            ? s.result.totalInterest / s.params.principal
            : 0,
      }))
      .sort((a, b) => a.ratio - b.ratio);

    const best = ranked[0].s;
    const runnerUp = ranked[1].s;
    const samePrincipal = scenarios.every(
      (s) => s.params.principal === scenarios[0].params.principal,
    );

    const interestSaved =
      runnerUp.result.totalInterest - best.result.totalInterest;
    const emiDelta = best.result.emi - runnerUp.result.emi;
    const bestPer100 = ranked[0].ratio * 100;
    const runnerPer100 = ranked[1].ratio * 100;
    const per100Saved = runnerPer100 - bestPer100;

    const nearIdentical = samePrincipal
      ? interestSaved < best.result.totalRepayment * 0.005
      : per100Saved < 0.5;

    return {
      best,
      runnerUp,
      samePrincipal,
      interestSaved,
      emiDelta,
      bestPer100,
      runnerPer100,
      per100Saved,
      nearIdentical,
    };
  }, [scenarios]);

  return (
    <div className="space-y-6">
      {verdict && (
        <AiTakeBanner
          label="AI verdict"
          watch={`${verdict.best.id}:${Math.round(verdict.interestSaved)}:${Math.round(verdict.emiDelta)}:${verdict.samePrincipal}`}
          title={
            verdict.nearIdentical
              ? 'These scenarios are nearly identical'
              : `${verdict.best.label} is the ${
                  verdict.samePrincipal ? 'cheaper loan' : 'most cost-efficient'
                }`
          }
        >
          {verdict.nearIdentical ? (
            <>
              These scenarios land within a hair of each other on cost. Once
              the gap is this small the decision shifts off the spreadsheet
              and onto the lender itself — processing fees, prepayment
              flexibility, approval speed and customer service. Pick the one
              you trust most rather than chasing a difference that everyday
              banking quirks will erase anyway.
            </>
          ) : !verdict.samePrincipal ? (
            <>
              Heads-up — these scenarios borrow different amounts (
              <strong>{fmt(verdict.best.params.principal)}</strong> vs{' '}
              <strong>{fmt(verdict.runnerUp.params.principal)}</strong>), so
              raw total interest — and even the monthly payment — would be
              misleading: a smaller loan always looks cheaper simply because
              it is smaller. Measured fairly, by interest cost per 100
              borrowed, <strong>{verdict.best.label}</strong> is the most
              efficient at <strong>{fmt(verdict.bestPer100)} per 100</strong>{' '}
              against {fmt(verdict.runnerPer100)} for {verdict.runnerUp.label}.
              That gap is driven by rate and term — the parts you actually
              control. Pick the loan with the lowest per-100 cost, then size
              the borrowing to what you genuinely need.
            </>
          ) : verdict.emiDelta <= 0 ? (
            <>
              Both scenarios borrow{' '}
              <strong>{fmt(verdict.best.params.principal)}</strong>, so this is
              a clean like-for-like comparison.{' '}
              <strong>{verdict.best.label}</strong> is the clear winner — it
              costs <strong>{fmt(Math.abs(verdict.emiDelta))}/mo less</strong>{' '}
              than {verdict.runnerUp.label} <em>and</em> saves{' '}
              <strong>{fmt(verdict.interestSaved)}</strong> in total interest
              across the life of the loan. A lighter monthly payment normally
              costs you a longer term or a higher rate — but here{' '}
              {verdict.best.label} beats {verdict.runnerUp.label} on both at
              once, so there is no trade-off to weigh. Lock it in unless the
              lender&apos;s other terms give you a clear reason not to.
            </>
          ) : (
            <>
              Both scenarios borrow{' '}
              <strong>{fmt(verdict.best.params.principal)}</strong>, so this is
              a clean like-for-like comparison.{' '}
              <strong>{verdict.best.label}</strong> saves{' '}
              <strong>{fmt(verdict.interestSaved)}</strong> in total interest,
              but it costs <strong>{fmt(verdict.emiDelta)}/mo more</strong>{' '}
              than {verdict.runnerUp.label} — the classic shorter-term
              trade-off, a heavier payment now in exchange for far less paid
              overall. Choose {verdict.best.label} if your budget absorbs the
              higher payment comfortably; if cash flow is tight, the lighter
              payment on {verdict.runnerUp.label} — and the breathing room it
              leaves each month — can be worth the extra interest.
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
