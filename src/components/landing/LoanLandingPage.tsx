import { Calculator, BarChart2, Wallet, RefreshCw } from 'lucide-react';
import LoanCalculatorShell from '@/components/calculator/LoanCalculatorShell';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import { SITE_URL } from '@/lib/constants';
import type { LoanParams } from '@/types/loan';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TabDescription {
  title: string;
  body: string;
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: title,  item: pageUrl  },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero banner */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl">{subtitle}</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{intro}</p>
        </div>
      </div>

      {/* Tab feature cards */}
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

      {/* Calculator */}
      <LoanCalculatorShell defaultParams={defaultParams} />

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
