'use client';

import type { ReactNode } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

const TONES = {
  ai: {
    wrap: 'border-ai/30 bg-ai-soft',
    Icon: Sparkles,
  },
  positive: {
    wrap: 'border-emerald-300 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30',
    Icon: CheckCircle2,
  },
  caution: {
    wrap: 'border-amber-300 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30',
    Icon: AlertTriangle,
  },
} as const;

interface Props {
  title: string;
  children: ReactNode;
  /** Visual tone — `ai` (violet), `positive` (green), `caution` (amber). */
  tone?: keyof typeof TONES;
  /** Small uppercase pill text; defaults to "AI". */
  badge?: string;
}

/**
 * Shared presentational banner for the deterministic "AI take / verdict"
 * features (Compare verdict, Affordability take, Restructure verdict).
 * It is purely visual — all numbers are computed by the existing pure
 * math and passed in as children. The AI accent styling signals the
 * feature as additive; there is no LLM behind it.
 */
export default function AiTakeBanner({
  title,
  children,
  tone = 'ai',
  badge = 'AI',
}: Props) {
  const { wrap, Icon } = TONES[tone];
  return (
    <div className={`rounded-xl border p-4 ${wrap}`}>
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ background: 'var(--ai-grad)' }}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">{title}</span>
            <span className="rounded-full bg-ai px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ai-foreground">
              {badge}
            </span>
          </div>
          <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
