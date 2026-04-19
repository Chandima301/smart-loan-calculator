'use client';

import { Button } from '@/components/ui/button';
import { Plus, RotateCcw } from 'lucide-react';
import ScenarioCard from './ScenarioCard';
import ComparisonChart from './ComparisonChart';
import { useLoanComparisonStore } from '@/store/loanComparisonStore';
import { LOAN_DEFAULTS, MAX_SCENARIOS } from '@/lib/constants';

export default function ComparisonPanel() {
  const { scenarios, addScenario, updateScenario, updateLabel, removeScenario, clearAll } =
    useLoanComparisonStore();

  return (
    <div className="space-y-6">
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
