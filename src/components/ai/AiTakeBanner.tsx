'use client';

import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  /** Headline statement — bold line under the AI tag. */
  title: string;
  children: ReactNode;
  /** Short uppercase tag in the header. Defaults to "AI". */
  label?: string;
}

/**
 * Shared AI annotation card — ONE uniform style across every tab
 * (Compare / Affordability / Restructure), matching the Loan Insights
 * "AI summary" box: a light-violet card with a small Sparkles icon and
 * an uppercase tag, then a bold headline + body text. Purely
 * presentational; every number is computed by the existing pure math.
 */
export default function AiTakeBanner({ title, children, label = 'AI' }: Props) {
  return (
    <div className="rounded-lg border border-ai/20 bg-ai-soft p-3">
      <div className="mb-1.5 flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-ai" />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-ai-ink">
          {label}
        </span>
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}
