'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  /** Headline statement — bold line under the AI tag. */
  title: string;
  children: ReactNode;
  /** Short uppercase tag in the header. Defaults to "AI". */
  label?: string;
  /**
   * A primitive that changes whenever the underlying numbers change.
   * Drives the debounced "generating" loading state so every AI
   * annotation behaves like the Loan Insights / Smart Scenarios ones.
   */
  watch?: string | number;
}

/**
 * Shared AI annotation card — ONE uniform style across every tab
 * (Compare / Affordability / Restructure), matching the Loan Insights
 * "AI summary" box: a light-violet card, Sparkles + uppercase tag, a
 * debounced loading state, then a bold headline + body text. Purely
 * presentational; every number is computed by the existing pure math.
 */
export default function AiTakeBanner({
  title,
  children,
  label = 'AI',
  watch,
}: Props) {
  const [generating, setGenerating] = useState(true);

  // Debounced re-"generation" — show a brief loading state whenever the
  // numbers behind the annotation change (and avoid flicker mid-drag).
  useEffect(() => {
    setGenerating(true);
    const id = setTimeout(() => setGenerating(false), 550);
    return () => clearTimeout(id);
  }, [watch]);

  return (
    <div className="rounded-lg border border-ai/20 bg-ai-soft p-3">
      <div className="mb-1.5 flex items-center gap-1.5">
        <Sparkles
          className={`h-3.5 w-3.5 text-ai ${generating ? 'animate-pulse' : ''}`}
        />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-ai-ink">
          {generating ? 'Generating…' : label}
        </span>
      </div>
      {generating ? (
        <div aria-hidden="true">
          <div className="h-3.5 w-1/2 animate-pulse rounded bg-ai/25" />
          <div className="mt-1.5 h-2.5 w-full animate-pulse rounded bg-ai/20" />
          <div className="mt-1.5 h-2.5 w-4/5 animate-pulse rounded bg-ai/20" />
        </div>
      ) : (
        <>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
            {children}
          </p>
        </>
      )}
    </div>
  );
}
