import type { Metadata } from 'next';
import BiweeklyMortgageCalculator from '@/components/biweekly/BiweeklyMortgageCalculator';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import GuideSection from '@/components/landing/GuideSection';
import BiweeklyMortgageGuide, { meta as biweeklyGuideMeta } from '@/content/guides/biweekly-mortgage';
import { SITE_URL } from '@/lib/constants';
import { buildArticleSchema } from '@/lib/seo/articleSchema';

const PATH = '/biweekly-mortgage-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Biweekly Mortgage Calculator — Exact Interest Saved & Payoff Date',
  description:
    'See exactly how much interest you save and the new payoff date when you switch to biweekly mortgage payments. Side-by-side comparison with monthly. Free, no signup.',
  keywords: [
    'biweekly mortgage calculator',
    'bi-weekly mortgage calculator',
    'biweekly payment calculator',
    'biweekly mortgage savings',
    'biweekly vs monthly mortgage',
    'mortgage payoff calculator',
    'extra mortgage payment calculator',
    'accelerated mortgage payment',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Biweekly Mortgage Calculator — Exact Interest Saved & Payoff Date',
    description:
      'See exactly how much interest you save and the new payoff date with biweekly mortgage payments. Free, no signup.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    question: 'How do biweekly mortgage payments save you money?',
    answer:
      'You pay half your monthly mortgage every 14 days. Because there are 52 weeks in a year, that works out to 26 biweekly payments — equivalent to 13 monthly payments per year, one extra payment annually. That extra payment goes 100% to principal, which slashes the interest charged on every future month and shortens the loan.',
  },
  {
    question: 'How much can I save on a $300,000 mortgage with biweekly payments?',
    answer:
      'On a $300,000 30-year mortgage at 6.5%, the standard monthly payment is about $1,896 and total interest over 30 years is roughly $382,633. Switching to biweekly ($948 every 14 days) pays the loan off in about 24.5 years and cuts total interest to roughly $304,000 — saving around $78,000 and over 5 years of payments.',
  },
  {
    question: 'Is biweekly the same as paying extra each month?',
    answer:
      'Mathematically, yes. Paying biweekly is equivalent to making 1/12 of a monthly payment as extra principal every month — you arrive at the same payoff date and the same interest savings either way. The advantage of biweekly is that it aligns with biweekly paychecks, so the extra payment happens automatically without budgeting for a separate "extra payment."',
  },
  {
    question: 'Should I sign up for my lender\'s biweekly program or do it myself?',
    answer:
      'Many lenders charge $200–$400 enrollment plus monthly fees for biweekly programs — and some only credit the extra payment once a year, which kills most of the benefit. You can get the exact same result fee-free by either paying half your mortgage every two weeks directly, or simply adding 1/12 of your payment to each monthly payment as extra principal. Always confirm your lender accepts extra principal payments without penalty first.',
  },
];

export default function BiweeklyMortgageCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ question, answer }) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Biweekly Mortgage Calculator', item: CANONICAL },
    ],
  };

  const articleJsonLd = buildArticleSchema({
    headline: biweeklyGuideMeta.headline,
    description: biweeklyGuideMeta.description,
    url: CANONICAL,
    datePublished: biweeklyGuideMeta.datePublished,
    dateModified: biweeklyGuideMeta.dateModified,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Hero banner — compact on mobile so the calculator is above the fold */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-5xl px-4 py-4 sm:py-7">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
            Biweekly Mortgage Calculator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl sm:mt-2 sm:text-base">
            See exactly how many years and how much interest you save by paying your mortgage biweekly instead of monthly.
          </p>
          <p className="mt-2 hidden text-sm text-muted-foreground max-w-2xl md:block">
            Paying half your mortgage every 14 days adds up to 26 payments per year — the equivalent of 13 monthly payments,
            or one extra full payment annually. On a typical 30-year mortgage that single extra payment shaves 4–6 years off
            the loan and saves tens of thousands in interest.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <BiweeklyMortgageCalculator />

      {/* In-depth educational guide (per-page original content) */}
      <GuideSection>
        <BiweeklyMortgageGuide />
      </GuideSection>

      {/* Related calculators — internal linking for SEO + UX */}
      <RelatedCalculators currentPath={PATH} />

      {/* FAQ */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map(({ question, answer }) => (
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
