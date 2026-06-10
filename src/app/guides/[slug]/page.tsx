import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import GuideSection from '@/components/landing/GuideSection';
import Breadcrumb from '@/components/layout/Breadcrumb';
import RelatedCalculators, { ALL } from '@/components/calculator/RelatedCalculators';
import { GUIDE_BY_SLUG, STANDALONE_GUIDES, GUIDES } from '@/content/guides';
import { SITE_URL } from '@/lib/constants';
import { buildArticleSchema } from '@/lib/seo/articleSchema';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return STANDALONE_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDE_BY_SLUG[slug];
  if (!guide) return {};
  const canonical = `${SITE_URL}/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonical,
      type: 'article',
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true },
  };
}

/** CTA card linking to the calculators this guide pairs with. */
function CalculatorCta({ paths }: { paths: string[] }) {
  return (
    <div className="container mx-auto max-w-3xl px-4">
      <div className="rounded-lg border border-primary/40 bg-primary/5 p-5">
        <p className="font-semibold text-sm mb-3">Run your own numbers</p>
        <div className="flex flex-wrap gap-3">
          {paths.map((path) => {
            const meta = ALL[path];
            if (!meta) return null;
            const { label, Icon } = meta;
            return (
              <Link
                key={path}
                href={path}
                className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:border-primary transition-colors"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDE_BY_SLUG[slug];
  if (!guide) notFound();

  const canonical = `${SITE_URL}/guides/${guide.slug}`;
  const { Component } = guide;

  const articleJsonLd = buildArticleSchema({
    headline: guide.meta.headline,
    description: guide.meta.description,
    url: canonical,
    datePublished: guide.meta.datePublished,
    dateModified: guide.meta.dateModified,
  });

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const moreGuides = GUIDES.filter((g) => g.href !== guide.href).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-3xl px-4 py-6 sm:py-9">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{guide.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{guide.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Updated {guide.meta.dateModified ?? guide.meta.datePublished}
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: guide.title },
        ]}
      />

      <div className="pt-6">
        <CalculatorCta paths={guide.calculatorPaths} />
      </div>

      {/* Article body — same prose styling as embedded calculator guides */}
      <GuideSection>
        <Component />
      </GuideSection>

      <CalculatorCta paths={guide.calculatorPaths} />

      {/* FAQ — visible mirror of the FAQPage JSON-LD */}
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {guide.faq.map(({ question, answer }) => (
            <div key={question} className="rounded-lg border p-5">
              <h3 className="font-semibold text-sm mb-2">{question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related calculators of the primary CTA target */}
      <RelatedCalculators currentPath={guide.calculatorPaths[0]} />

      {/* More guides */}
      <section className="container mx-auto max-w-5xl px-4 py-10 border-t">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-lg font-semibold">More guides</h2>
          <Link href="/guides" className="text-xs text-primary hover:underline">
            All guides →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {moreGuides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="rounded-lg border p-4 hover:border-primary hover:bg-muted/50 transition-colors"
            >
              <p className="font-semibold text-sm leading-snug mb-1">{g.title}</p>
              <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
