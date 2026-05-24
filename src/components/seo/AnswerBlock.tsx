import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  children: ReactNode;
}

/**
 * Quick-answer block — a short, factual TL;DR rendered as SSR HTML
 * right under the page's H1 / breadcrumb. Optimized for AI-Overview /
 * answer-engine citations: LLM-based search heavily favors pages that
 * answer the user's question in the first paragraph (with a concrete
 * number and the formula where applicable). Renders cleanly for human
 * readers too — small violet callout that doesn't bloat the hero.
 */
export default function AnswerBlock({ children }: Props) {
  return (
    <section
      aria-label="Quick answer"
      className="container mx-auto max-w-5xl px-4 pt-4"
    >
      <div className="rounded-lg border border-ai/20 bg-ai-soft px-4 py-3">
        <div className="mb-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-ai" />
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ai-ink">
            Quick answer
          </span>
        </div>
        <p className="text-sm leading-relaxed text-foreground">{children}</p>
      </div>
    </section>
  );
}
