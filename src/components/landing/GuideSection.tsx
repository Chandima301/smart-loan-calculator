import type { ReactNode } from 'react';

interface Props {
  /** Long-form educational content rendered with Tailwind `prose` styling. */
  children: ReactNode;
}

/**
 * Wrapper for the per-page educational guide section that sits between
 * the calculator and the related-calculators block. Uses Tailwind's
 * typography plugin (`prose`) for clean long-form rendering with sane
 * defaults across screen sizes and dark mode.
 */
export default function GuideSection({ children }: Props) {
  return (
    <section
      aria-label="Guide"
      className="container mx-auto max-w-3xl px-4 py-12 border-t"
    >
      <article
        className="
          prose prose-slate dark:prose-invert max-w-none
          prose-headings:scroll-mt-20
          prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2
          prose-p:leading-relaxed prose-p:text-foreground/90
          prose-li:leading-relaxed
          prose-strong:text-foreground
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-table:my-6
          prose-th:bg-muted/50 prose-th:font-semibold prose-th:text-left prose-th:px-3 prose-th:py-2
          prose-td:px-3 prose-td:py-2 prose-td:border-t
        "
      >
        {children}
      </article>
    </section>
  );
}
