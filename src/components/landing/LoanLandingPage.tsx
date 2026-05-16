import type { ReactNode } from 'react';
import { Calculator, BarChart2, Wallet, RefreshCw } from 'lucide-react';
import LoanCalculatorShell, { type TabValue } from '@/components/calculator/LoanCalculatorShell';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import InlineRelatedCalculators from '@/components/calculator/InlineRelatedCalculators';
import GuideSection from '@/components/landing/GuideSection';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE_URL } from '@/lib/constants';
import { buildArticleSchema } from '@/lib/seo/articleSchema';
import type { LoanParams } from '@/types/loan';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TabDescription {
  title: string;
  body: string;
}

export interface GuideMeta {
  /** Short article headline (used for Article JSON-LD). */
  headline: string;
  /** 1–2 sentence summary (used for Article JSON-LD description). */
  description: string;
  /** ISO date string the guide was first published. */
  datePublished: string;
  /** ISO date string the guide was last updated. */
  dateModified?: string;
}

export interface LoanLandingPageProps {
  title: string;
  subtitle: string;
  intro: string;
  defaultParams: Partial<LoanParams>;
  tabs: {
    calculator: TabDescription;
    compare: TabDescription;
    affordability: TabDescription;
    restructure: TabDescription;
  };
  faq: FAQItem[];
  canonicalPath: string;
  /** Optional long-form educational guide rendered between the calculator and Related calculators. */
  guide?: ReactNode;
  /** Metadata for Article JSON-LD when a guide is present. Required when `guide` is provided. */
  guideMeta?: GuideMeta;
  /** Which calculator tab leads on this page (rendered first + selected by default). */
  primaryTab?: TabValue;
}

const TAB_META = [
  { key: 'calculator',   label: 'Calculator Tab',   Icon: Calculator  },
  { key: 'compare',      label: 'Compare Tab',       Icon: BarChart2   },
  { key: 'affordability',label: 'Affordability Tab', Icon: Wallet      },
  { key: 'restructure',  label: 'Restructure Tab',   Icon: RefreshCw   },
] as const;

export default function LoanLandingPage({
  title,
  subtitle,
  intro,
  defaultParams,
  tabs,
  faq,
  canonicalPath,
  guide,
  guideMeta,
  primaryTab,
}: LoanLandingPageProps) {
  const pageUrl = `${SITE_URL}${canonicalPath}`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const articleJsonLd =
    guide && guideMeta
      ? buildArticleSchema({
          headline: guideMeta.headline,
          description: guideMeta.description,
          url: pageUrl,
          datePublished: guideMeta.datePublished,
          dateModified: guideMeta.dateModified,
        })
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {articleJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      )}

      {/* Hero banner — compact on mobile so the calculator is above the fold */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-5xl px-4 py-4 sm:py-7">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl sm:mt-2 sm:text-base">{subtitle}</p>
          <p className="mt-2 hidden text-sm text-muted-foreground max-w-2xl md:block">{intro}</p>
        </div>
      </div>

      {/* Breadcrumb — visible trail + emits BreadcrumbList JSON-LD */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Loan Calculators', href: '/' },
          { label: title },
        ]}
      />

      {/* Calculator */}
      <LoanCalculatorShell defaultParams={defaultParams} primaryTab={primaryTab} />

      {/* Inline related calculators — quick cross-links right after the tool */}
      <InlineRelatedCalculators currentPath={canonicalPath} />

      {/* Tab feature cards — moved below calculator so the tool is above the fold */}
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TAB_META.map(({ key, label, Icon }) => {
            const desc = tabs[key];
            return (
              <div key={key} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase truncate">
                    {label}
                  </span>
                </div>
                <p className="text-sm font-semibold leading-snug">{desc.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-depth educational guide (per-page original content) */}
      {guide && <GuideSection>{guide}</GuideSection>}

      {/* Related calculators — internal linking for SEO + UX */}
      <RelatedCalculators currentPath={canonicalPath} />

      {/* FAQ */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faq.map(({ question, answer }) => (
            <div key={question} className="rounded-lg border p-5">
              <h3 className="font-semibold text-sm mb-2">{question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
