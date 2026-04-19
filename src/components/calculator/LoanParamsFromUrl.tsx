'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LOAN_LIMITS } from '@/lib/constants';
import type { LoanParams } from '@/types/loan';

interface Props {
  onParams: (params: Partial<LoanParams>) => void;
}

export default function LoanParamsFromUrl({ onParams }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const parsed: Partial<LoanParams> = {};

    const p = Number(searchParams.get('p'));
    if (Number.isFinite(p) && p >= LOAN_LIMITS.principal.min && p <= LOAN_LIMITS.principal.max) {
      parsed.principal = p;
    }

    const r = Number(searchParams.get('r'));
    if (Number.isFinite(r) && r >= LOAN_LIMITS.annualRate.min && r <= LOAN_LIMITS.annualRate.max) {
      parsed.annualRate = r;
    }

    const t = Number(searchParams.get('t'));
    if (Number.isFinite(t) && t >= LOAN_LIMITS.tenureMonths.min && t <= LOAN_LIMITS.tenureMonths.max) {
      parsed.tenureMonths = t;
    }

    if (Object.keys(parsed).length > 0) {
      onParams(parsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount only

  return null;
}
