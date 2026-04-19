'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoanScenario, LoanParams } from '@/types/loan';
import { calculateEMI } from '@/lib/loanCalculations';

const DEFAULT_PARAMS_A: LoanParams = { principal: 1_000_000, annualRate: 12, tenureMonths: 60 };
const DEFAULT_PARAMS_B: LoanParams = { principal: 1_000_000, annualRate: 10, tenureMonths: 48 };

const DEFAULT_SCENARIOS: LoanScenario[] = [
  { id: '1', label: 'Scenario A', params: DEFAULT_PARAMS_A, result: calculateEMI(DEFAULT_PARAMS_A) },
  { id: '2', label: 'Scenario B', params: DEFAULT_PARAMS_B, result: calculateEMI(DEFAULT_PARAMS_B) },
];

interface LoanComparisonState {
  scenarios: LoanScenario[];
  addScenario: (params: LoanParams, label?: string) => void;
  updateScenario: (id: string, params: Partial<LoanParams>) => void;
  updateLabel: (id: string, label: string) => void;
  removeScenario: (id: string) => void;
  clearAll: () => void;
}

export const useLoanComparisonStore = create<LoanComparisonState>()(
  persist(
    (set) => ({
      scenarios: DEFAULT_SCENARIOS,

      addScenario: (params, label) =>
        set((state) => {
          if (state.scenarios.length >= 3) return state;
          const id = crypto.randomUUID();
          const newLabel = label ?? `Scenario ${String.fromCharCode(65 + state.scenarios.length)}`;
          return {
            scenarios: [
              ...state.scenarios,
              { id, label: newLabel, params, result: calculateEMI(params) },
            ],
          };
        }),

      updateScenario: (id, partialParams) =>
        set((state) => ({
          scenarios: state.scenarios.map((s) => {
            if (s.id !== id) return s;
            const newParams = { ...s.params, ...partialParams };
            return { ...s, params: newParams, result: calculateEMI(newParams) };
          }),
        })),

      updateLabel: (id, label) =>
        set((state) => ({
          scenarios: state.scenarios.map((s) => (s.id === id ? { ...s, label } : s)),
        })),

      removeScenario: (id) =>
        set((state) => ({
          scenarios: state.scenarios.filter((s) => s.id !== id),
        })),

      clearAll: () => set({ scenarios: DEFAULT_SCENARIOS }),
    }),
    { name: 'loan-comparison-store' }
  )
);
