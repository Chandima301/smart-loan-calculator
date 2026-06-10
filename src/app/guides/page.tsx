import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Scale } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ALL, CATEGORIES } from '@/components/calculator/RelatedCalculators';
import { EMBEDDED_GUIDES, STANDALONE_GUIDES } from '@/content/guides';
import { SITE_URL } from '@/lib/constants';

const CANONICAL = `${SITE_URL}/guides`;

export const metadata: Metadata = {
  title: 'Loan Guides — Payoff Strategies, Refinancing & Forgiveness Explained',
  description:
    'In-depth, no-fluff guides to loans: biweekly vs extra payments, PSLF vs income-driven repayment, recast vs refinance, and the full math behind every calculator on the site.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Loan Guides — Payoff Strategies, Refinancing & Forgiveness Explained',
    description:
      'In-depth guides to loan payoff strategies, refinancing decisions, and student-loan forgiveness — with worked numbers and free calculators.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function GuidesHubPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Loan Guides',
    url: CANONICAL,
    description:
      'In-depth guides to loan payoff strategies, refinancing decisions, and student-loan forgiveness.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Hero */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-5xl px-4 py-6 sm:py-9">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Loan Guides</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl sm:text-base">
            Every guide here is built the same way: the actual math with worked numbers, the
            decision framework, and the pitfalls that cost real money — no filler. Comparison
            guides help you choose between strategies; calculator guides go deep on a single
            loan type and sit alongside the interactive tool, so you can read the theory and
            run your own numbers on the same page.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Guides' }]}
      />

      {/* Comparison & decision guides (standalone articles) */}
      <section className="container mx-auto max-w-5xl px-4 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold">Comparison &amp; decision guides</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STANDALONE_GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="rounded-lg border p-4 hover:border-primary hover:bg-muted/50 transition-colors flex flex-col gap-1.5"
            >
              <p className="font-semibold text-sm leading-snug">{g.title}</p>
              <p className="text-xs text-muted-foreground leading-snug">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculator guides (embedded on their calculator pages), grouped by category */}
      <section className="container mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold">Calculator guides</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-5">
          Each of these guides lives on its calculator page — read the deep dive and use the
          interactive tool together.
        </p>
        <div className="space-y-7">
          {CATEGORIES.map((cat) => {
            const guides = EMBEDDED_GUIDES.filter((g) =>
              cat.paths.includes(g.calculatorPath),
            );
            if (guides.length === 0) return null;
            return (
              <div key={cat.id}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {cat.label}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guides.map((g) => {
                    const calc = ALL[g.calculatorPath];
                    return (
                      <Link
                        key={g.href}
                        href={g.href}
                        className="rounded-lg border p-4 hover:border-primary hover:bg-muted/50 transition-colors"
                      >
                        <p className="font-semibold text-sm leading-snug mb-1">{g.title}</p>
                        <p className="text-xs text-muted-foreground leading-snug line-clamp-2 mb-2">
                          {g.description}
                        </p>
                        {calc && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-primary font-medium">
                            <calc.Icon className="h-3 w-3" />
                            Includes {calc.label}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
