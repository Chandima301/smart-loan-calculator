import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  effectiveDate?: string;
  children: ReactNode;
}

/**
 * Shared layout for legal/info pages (privacy, terms, about, contact, disclaimer).
 * Hero banner + prose content area with consistent typography.
 */
export default function LegalPage({ title, subtitle, effectiveDate, children }: Props) {
  return (
    <>
      {/* Hero banner */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-base text-muted-foreground max-w-2xl">{subtitle}</p>
          )}
          {effectiveDate && (
            <p className="mt-2 text-xs text-muted-foreground">
              Effective date: {effectiveDate}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-foreground/90 space-y-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-foreground [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </>
  );
}
