import type { Metadata } from 'next';
import BiweeklyMortgageCalculator from '@/components/biweekly/BiweeklyMortgageCalculator';
import RelatedCalculators, { calculatorBreadcrumb } from '@/components/calculator/RelatedCalculators';
import InlineRelatedCalculators from '@/components/calculator/InlineRelatedCalculators';
import GuideSection from '@/components/landing/GuideSection';
import RelatedReading from '@/components/landing/RelatedReading';
import Breadcrumb from '@/components/layout/Breadcrumb';
import BiweeklyMortgageGuide, { meta as biweeklyGuideMeta } from '@/content/guides/biweekly-mortgage';
import { SITE_URL } from '@/lib/constants';
import { buildArticleSchema } from '@/lib/seo/articleSchema';
import { buildSoftwareAppSchema } from '@/lib/seo/softwareAppSchema';

const PATH = '/biweekly-mortgage-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Biweekly Mortgage Calculator with Extra Payments — Payoff Date & Savings',
  description:
    '26 biweekly payments per year equals 13 monthly payments — one extra payment annually. See exact interest saved, your new payoff date, and add extra payments on top. Free, no signup.',
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
    title: 'Biweekly Mortgage Calculator with Extra Payments — Payoff Date & Savings',
    description:
      '26 biweekly payments per year = 13 monthly payments. See exact interest saved, your new payoff date, and add extra payments on top. Free, no signup.',
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
  {
    question: 'Why do 26 biweekly payments equal 13 monthly payments?',
    answer:
      'There are 52 weeks in a year, so a payment every two weeks gives 52 ÷ 2 = 26 payments per year. Each biweekly payment is half the monthly amount, so 26 × (monthly ÷ 2) = 13 × monthly. A standard schedule pays 12 monthly payments per year; biweekly pays 13 — exactly one extra full payment annually, which lands entirely on principal because the regular payments already cover each month’s interest.',
  },
  {
    question: 'Does the loan size change how many years biweekly saves?',
    answer:
      'No. The payoff acceleration depends only on the interest rate, the term, and the size of the extra payment as a fraction of the regular payment (always 1/12 with biweekly). At 6.5% over 30 years, a $300,000 borrower and an $800,000 borrower both finish about 5 years 10 months early. The dollars saved scale with loan size, but the time saved does not.',
  },
  {
    question: 'How does the interest rate affect biweekly savings?',
    answer:
      'Higher rates make biweekly far more powerful, because early principal reduction avoids more future interest. On a 30-year loan, biweekly saves roughly 4 years at 4%, about 5 years 10 months at 6.5%, and around 7 years at 8%. The percentage of lifetime interest removed rises from ~15% at 4% to ~28% at 8%. At very low rates the strategy is barely worth the effort.',
  },
  {
    question: 'What is the DIY way to get biweekly savings without enrolling?',
    answer:
      'Keep your normal monthly payment and add 1/12 of it as extra principal each month, clearly marked "apply to principal." On a $1,896 payment that is about $158 extra monthly. Over 12 months you make one full extra payment — mathematically identical to biweekly, with no enrollment fee and full control if a tight month forces you to skip the extra.',
  },
  {
    question: 'Are there any fees I should avoid with biweekly programs?',
    answer:
      'Yes. Many lender and third-party "equity accelerator" programs charge a $200–$500 setup fee plus $4–$12/month for what is a free behavior change. Over a 24-year payoff that can total $2,700+ in fees. Worse, some hold your half-payments and only credit the extra payment once a year, losing the in-year compounding. Use the free DIY method instead.',
  },
  {
    question: 'When should I NOT use biweekly payments?',
    answer:
      'Skip accelerating your mortgage if you still carry higher-rate debt (credit cards at 20%+, personal loans at 14%+), if you have not captured your full employer retirement match (an instant 100% return), or if you lack a 3–6 month emergency fund. Mortgage prepayments are not liquid — you cannot get the money back without refinancing. Prioritise those three first.',
  },
  {
    question: 'Should I refinance instead of paying biweekly?',
    answer:
      'If rates have dropped at least 0.75–1 percentage point below your current rate and you will stay in the home long enough to recover closing costs, refinancing usually beats prepaying — it lowers interest while preserving liquidity. The two are not mutually exclusive: many borrowers refinance to a lower rate, then run biweekly on the new loan. Use the refinance calculator to model the break-even month first.',
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

  const articleJsonLd = buildArticleSchema({
    headline: biweeklyGuideMeta.headline,
    description: biweeklyGuideMeta.description,
    url: CANONICAL,
    datePublished: biweeklyGuideMeta.datePublished,
    dateModified: biweeklyGuideMeta.dateModified,
  });

  const softwareJsonLd = buildSoftwareAppSchema({
    name: 'Biweekly Mortgage Calculator',
    url: CANONICAL,
    description:
      'Free biweekly mortgage calculator. True 26-payments-per-year simulation showing the exact interest saved and new payoff date versus standard monthly payments. One extra payment annually typically pays off a 30-year mortgage 4-6 years early.',
    featureList: [
      'True 26-payments-per-year biweekly mortgage simulation',
      'Optional extra payment on top of the biweekly schedule',
      'Standard monthly vs biweekly side-by-side comparison',
      'Exact interest saved and new payoff date',
      'Multi-currency support (17+ currencies)',
      'Downloadable PDF summary',
      'Mobile-first, no signup, all math runs in the browser',
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      {/* Hero banner — compact on mobile so the calculator is above the fold */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-5xl px-4 py-4 sm:py-7">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
            Biweekly Mortgage Calculator (with Extra Payments)
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl sm:mt-2 sm:text-base">
            See exactly how many years and how much interest you save by paying your mortgage biweekly instead of monthly — and add extra payments on top.
          </p>
          <p className="mt-2 hidden text-sm text-muted-foreground max-w-2xl md:block">
            Paying <strong>half your monthly mortgage payment every two weeks</strong> adds up to 26 biweekly payments per year — equal to <strong>13 monthly payments instead of 12</strong>. The monthly payment itself comes from the amortization formula <strong>M = P × r × (1+r)^n / ((1+r)^n − 1)</strong> (P = principal, r = monthly rate = annual ÷ 12, n = months); the biweekly schedule simply applies one extra payment a year to principal. That single extra payment typically pays off a 30-year mortgage <strong>4–6 years early</strong> and saves tens of thousands in interest. On a $300,000 mortgage at 7%, biweekly payments save approximately <strong>$76,000</strong> in interest and finish the loan about 5.5 years sooner.
          </p>
        </div>
      </div>

      {/* Breadcrumb — visible trail + emits BreadcrumbList JSON-LD */}
      <Breadcrumb items={calculatorBreadcrumb(PATH, 'Biweekly Mortgage Calculator')} />

      {/* Calculator */}
      <BiweeklyMortgageCalculator />

      {/* Key concept — server-rendered, targets the "26 = 13" query cluster */}
      <section className="container mx-auto max-w-5xl px-4 pb-4">
        <div className="rounded-lg border bg-muted/30 p-5">
          <h2 className="text-lg font-semibold mb-2">
            26 Biweekly Payments = 13 Monthly Payments Per Year
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            There are 52 weeks in a year, so paying every two weeks means 52 ÷ 2 = <strong>26 biweekly
            payments per year</strong>. Each one is half your monthly payment, so 26 × (monthly ÷ 2) =
            <strong> 13 full monthly payments</strong> — one more than the 12 a standard schedule makes.
            That 13th payment lands entirely on principal, because your regular payments already cover
            each month&apos;s interest. The earlier principal drop means every following month accrues less
            interest, which is why one extra payment a year shortens a typical 30-year mortgage by 4–6
            years. Adding an <strong>extra amount to each biweekly payment</strong> compounds the effect:
            even $50 extra per payment ($1,300 more per year) can cut several additional years off the loan.
          </p>
        </div>
      </section>

      {/* Inline related calculators — quick cross-links right after the tool */}
      <InlineRelatedCalculators currentPath={PATH} />

      {/* In-depth educational guide (per-page original content) */}
      <GuideSection>
        <BiweeklyMortgageGuide />
      </GuideSection>

      {/* Related calculators — internal linking for SEO + UX */}
      <RelatedCalculators currentPath={PATH} />

      {/* Related reading — standalone /guides articles */}
      <RelatedReading slugs={['biweekly-vs-extra-monthly-payments', 'mortgage-recast-vs-refinance']} />

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
