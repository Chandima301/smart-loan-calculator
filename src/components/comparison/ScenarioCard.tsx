'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Pencil, Check } from 'lucide-react';
import type { LoanScenario } from '@/types/loan';
import { LOAN_LIMITS } from '@/lib/constants';
import { formatMonths } from '@/lib/formatters';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';

const sv = (val: number | readonly number[]): number =>
  Array.isArray(val) ? (val as number[])[0] : (val as number);

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// Draft-state numeric input for manual entry
function PrincipalInput({
  value,
  min,
  max,
  onCommit,
}: {
  value: number;
  min: number;
  max: number;
  onCommit: (v: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft !== null ? draft : String(value);
  return (
    <input
      type="text"
      inputMode="numeric"
      value={display}
      onFocus={() => setDraft(String(value))}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft === null) return;
        const v = Number(draft);
        if (Number.isFinite(v) && v > 0) {
          onCommit(clamp(v, min, max));
        }
        setDraft(null);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.currentTarget as HTMLInputElement).blur();
      }}
      className="h-8 w-full rounded-md border border-input bg-transparent px-2 py-1 text-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
    />
  );
}

interface Props {
  scenario: LoanScenario;
  onUpdate: (id: string, params: Partial<{ principal: number; annualRate: number; tenureMonths: number }>) => void;
  onUpdateLabel: (id: string, label: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export default function ScenarioCard({ scenario, onUpdate, onUpdateLabel, onRemove, canRemove }: Props) {
  const fmt = useCurrencyFormat();
  const [editingLabel, setEditingLabel] = useState(false);
  const [labelDraft, setLabelDraft] = useState(scenario.label);

  const saveLabel = () => {
    onUpdateLabel(scenario.id, labelDraft.trim() || scenario.label);
    setEditingLabel(false);
  };

  const { params, result } = scenario;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
        {editingLabel ? (
          <div className="flex items-center gap-1 flex-1">
            <Input
              value={labelDraft}
              onChange={(e) => setLabelDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveLabel()}
              className="h-7 text-sm"
              autoFocus
            />
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={saveLabel}>
              <Check className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">{scenario.label}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={() => { setLabelDraft(scenario.label); setEditingLabel(true); }}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        )}
        {canRemove && (
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(scenario.id)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <Label>Principal</Label>
            <span className="font-medium">{fmt(params.principal)}</span>
          </div>
          <Slider
            min={LOAN_LIMITS.principal.min}
            max={LOAN_LIMITS.principal.max}
            step={LOAN_LIMITS.principal.step}
            value={[params.principal]}
            onValueChange={(val) => onUpdate(scenario.id, { principal: sv(val) })}
          />
          <PrincipalInput
            value={params.principal}
            min={LOAN_LIMITS.principal.min}
            max={LOAN_LIMITS.principal.max}
            onCommit={(v) => onUpdate(scenario.id, { principal: v })}
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <Label>Rate</Label>
            <span className="font-medium">{params.annualRate.toFixed(1)}% p.a.</span>
          </div>
          <Slider
            min={LOAN_LIMITS.annualRate.min}
            max={LOAN_LIMITS.annualRate.max}
            step={LOAN_LIMITS.annualRate.step}
            value={[params.annualRate]}
            onValueChange={(val) => onUpdate(scenario.id, { annualRate: sv(val) })}
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <Label>Tenure</Label>
            <span className="font-medium">{formatMonths(params.tenureMonths)}</span>
          </div>
          <Slider
            min={LOAN_LIMITS.tenureMonths.min}
            max={LOAN_LIMITS.tenureMonths.max}
            step={LOAN_LIMITS.tenureMonths.step}
            value={[params.tenureMonths]}
            onValueChange={(val) => onUpdate(scenario.id, { tenureMonths: sv(val) })}
          />
        </div>

        <div className="pt-2 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monthly EMI</span>
            <span className="font-bold text-primary">{fmt(result.emi)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Interest</span>
            <Badge variant="secondary">{fmt(result.totalInterest)}</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Repayment</span>
            <span>{fmt(result.totalRepayment)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
