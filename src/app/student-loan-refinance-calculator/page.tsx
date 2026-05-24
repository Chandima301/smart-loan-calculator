import type { Metadata } from 'next';
import StudentRefinanceCalculator from '@/components/studentRefinance/StudentRefinanceCalculator';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import InlineRelatedCalculators from '@/components/calculator/InlineRelatedCalculators';
import GuideSection from '@/components/landing/GuideSection';
import Breadcrumb from '@/components/layout/Breadcrumb';
import StudentLoanRefinanceGuide, { meta as guideMeta } from '@/content/guides/student-loan-refinance';
import { SITE_URL } from '@/lib/constants';
import { buildArticleSchema } from '@/lib/seo/articleSchema';
import { buildSoftwareAppSchema } from '@/lib/seo/softwareAppSchema';

const PATH = '/student-loan-refinance-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Student Loan Refinance Calculator — Federal vs Private, No Signup',
  description:
    'Compare keeping your federal student loans vs refinancing into a private loan — the interest math AND everything you permanently forfeit (IDR, PSLF, deferment, discharge). Free, no signup.',
  keywords: [
    'student loan refinance calculator',
    'federal vs private student loan',
    'refinance student loans calculator',
    'should i refinance student loans',
    'student loan refinance savings',
    'private student loan refinance',
    'lose pslf refinancing',
    'student loan refinance rate',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Student Loan Refinance Calculator — Federal vs Private, No Signup',
    description:
      'Compare federal vs private refinance — the interest math and what you permanently forfeit (IDR, PSLF, deferment, discharge). Free, no signup.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    question: 'Should I refinance my federal student loans into a private loan?',
    answer:
      'Only if all of the following are true: you have a high, stable income well above your debt; no public-service career path now or plausibly later; a fully funded emergency fund; and a genuinely lower fixed rate (roughly 1.5–2 points below your federal rate on a term no longer than your remaining term). If any of those is not true, keeping the federal loans is almost always the better decision because of the protections you would forfeit.',
  },
  {
    question: 'What do I lose by refinancing federal loans to private?',
    answer:
      'Permanently and irreversibly: income-driven repayment (SAVE/PAYE/IBR), PSLF eligibility, 20–25 year IDR forgiveness, federal unemployment deferment and economic-hardship forbearance, death and total-permanent-disability discharge, and eligibility for any future federal student-loan relief. A private lender pays off the federal loans, so the federal loans — and every protection attached to them — cease to exist.',
  },
  {
    question: 'Can I convert a private student loan back to a federal one?',
    answer:
      'No. There is no federal program that converts a private loan back into a federal Direct Loan. The federal-to-private refinance is genuinely one-way. This irreversibility is why, when you are uncertain, you should keep the federal loans now and refinance later only if your situation becomes the narrow defensible profile — the reverse move does not exist.',
  },
  {
    question: 'How much does refinancing a student loan actually save?',
    answer:
      'It depends on the rate drop and whether the term changes. A genuine 1.5–2 point fixed-rate reduction on the same term can save thousands in lifetime interest. But a lower rate on a longer term frequently increases total interest even though the monthly payment falls — always compare lifetime interest, not the monthly payment. The calculator above shows both the money side and what you forfeit.',
  },
  {
    question: 'Is a variable or fixed rate better when refinancing student loans?',
    answer:
      'For almost everyone, fixed. Lenders advertise the variable rate because it starts lower, but it resets against a benchmark and is effectively uncapped — in a rising-rate environment a variable refinance can climb above the federal rate you left, leaving you with both a higher rate and no federal protections. Compare your federal rate against the lender’s fixed rate, not the teaser variable rate.',
  },
  {
    question: 'Will refinancing affect PSLF?',
    answer:
      'Yes — it destroys it permanently. PSLF requires federal Direct Loans. The instant a private lender refinances them, PSLF eligibility is gone forever. If you are pursuing PSLF or might enter public service, do not refinance federal loans under any circumstances; the tax-free forgiveness is frequently worth six figures and dwarfs any interest saving.',
  },
  {
    question: 'Do private student loan refinances require a cosigner?',
    answer:
      'Often, especially for younger borrowers or those with limited credit. The cosigner is fully liable for the debt, and many private loans have auto-default clauses tied to the cosigner. Cosigner release is typically available only after 24–48 consecutive on-time payments plus a separate credit qualification, and must be actively requested — it is never automatic. Federal student loans generally do not involve a cosigner.',
  },
  {
    question: 'Does refinancing lower my monthly payment?',
    answer:
      'It can, but usually by extending the term, which raises total interest. If your goal is purely a lower monthly payment, a federal income-driven repayment plan lowers the payment based on your income without surrendering any federal protection — a strictly better option than refinancing to a longer private term for cash-flow relief.',
  },
];

export default function StudentLoanRefinanceCalculatorPage() {
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
    headline: guideMeta.headline,
    description: guideMeta.description,
    url: CANONICAL,
    datePublished: guideMeta.datePublished,
    dateModified: guideMeta.dateModified,
  });

  const softwareJsonLd = buildSoftwareAppSchema({
    name: 'Student Loan Refinance Calculator',
    url: CANONICAL,
    description:
      'Free federal-to-private student loan refinance comparison. Computes interest savings against the full list of federal protections permanently forfeited (income-driven repayment, PSLF, deferment/forbearance, death/disability discharge).',
    featureList: [
      'Federal-vs-private refinance side-by-side comparison',
      'Lifetime interest delta',
      'Monthly payment delta',
      'Refinance fee handling (rolled into principal)',
      'Permanent-forfeiture list (IDR / PSLF / deferment / discharge)',
      'Multi-currency support',
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
            Student Loan Refinance Calculator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl sm:mt-2 sm:text-base">
            Compare keeping your federal student loans against refinancing into a private loan — the interest math and what you permanently forfeit.
          </p>
          <p className="mt-2 hidden text-sm text-muted-foreground max-w-2xl md:block">
            Refinancing federal student loans into a private loan can lower the interest rate, but it <strong>permanently forfeits</strong> income-driven repayment plans, PSLF, federal deferment/forbearance, and death/disability discharge. The trade-off is rarely worth it unless you have a high stable income, no public-service path, and a substantially lower fixed rate. Use the calculator below to model the dollar savings against the full list of protections you would give up.
          </p>
        </div>
      </div>

      {/* Breadcrumb — visible trail + emits BreadcrumbList JSON-LD */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Loan Calculators', href: '/' },
          { label: 'Student Loan Refinance Calculator' },
        ]}
      />

      {/* Calculator */}
      <StudentRefinanceCalculator />

      {/* Inline related calculators — quick cross-links right after the tool */}
      <InlineRelatedCalculators currentPath={PATH} />

      {/* In-depth educational guide (per-page original content) */}
      <GuideSection>
        <StudentLoanRefinanceGuide />
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
