import type { Metadata } from 'next';
import PslfCalculator from '@/components/pslf/PslfCalculator';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import InlineRelatedCalculators from '@/components/calculator/InlineRelatedCalculators';
import GuideSection from '@/components/landing/GuideSection';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PslfGuide, { meta as pslfGuideMeta } from '@/content/guides/pslf';
import { SITE_URL } from '@/lib/constants';
import { buildArticleSchema } from '@/lib/seo/articleSchema';

const PATH = '/pslf-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'PSLF Calculator — Public Service Loan Forgiveness, No Signup',
  description:
    'Estimate your Public Service Loan Forgiveness outcome — your income-driven payment, total paid over 120 months, and how much is forgiven tax-free. Free, no signup.',
  keywords: [
    'pslf calculator',
    'public service loan forgiveness calculator',
    'pslf payment calculator',
    'student loan forgiveness calculator',
    'pslf eligibility',
    '120 qualifying payments',
    'pslf vs payoff',
    'income driven repayment forgiveness',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'PSLF Calculator — Public Service Loan Forgiveness, No Signup',
    description:
      'Estimate your PSLF outcome — income-driven payment, total paid over 120 months, and tax-free forgiveness. Free, no signup.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    question: 'What is PSLF and who qualifies?',
    answer:
      'Public Service Loan Forgiveness erases the remaining balance on federal Direct Loans after 120 qualifying monthly payments made while working full-time (30+ hours/week) for a U.S. government organization at any level or a 501(c)(3) non-profit. The forgiven amount is tax-free under federal law. Private loans and most FFEL/Perkins loans do not qualify unless consolidated into a Direct Loan first.',
  },
  {
    question: 'How does this PSLF calculator estimate my payment?',
    answer:
      'It uses the common income-driven formula: payment ≈ 10% of discretionary income, where discretionary income = your AGI minus 1.5 times the Federal Poverty Guideline for your family size and region. It then projects the balance forward over the remaining qualifying months (recomputing the payment yearly as income grows) and reports the tax-free amount forgiven at payment 120. Exact IDR plan rules and poverty guidelines change yearly, so treat the result as a planning estimate.',
  },
  {
    question: 'How are the 120 PSLF payments counted?',
    answer:
      'A qualifying payment is full, on-time (within 15 days), made under a qualifying repayment plan, while employed full-time by a qualifying employer, after October 2007. The 120 payments do not need to be consecutive and can span different employers — the clock pauses if you leave public service and resumes when you return; it does not reset. You cannot pay ahead to bank extra credit.',
  },
  {
    question: 'Which repayment plans qualify for PSLF?',
    answer:
      'Income-driven repayment (IDR) plans and the 10-year Standard plan qualify. Strategically, you should be on an income-driven plan: paying 120 payments on the Standard plan pays the loan off entirely, leaving nothing to forgive. The entire value of PSLF comes from the IDR plan capping your payment at a percentage of discretionary income while the substantial remaining balance is forgiven.',
  },
  {
    question: 'Is PSLF forgiveness taxed?',
    answer:
      'No. PSLF forgiveness is explicitly tax-free under federal law. This is different from the 20-to-25-year forgiveness you reach by staying on an income-driven plan without public service, which has historically been treated as taxable income (the "tax bomb"). PSLF does not trigger that tax bomb — a six-figure forgiven balance can be erased with zero tax bill.',
  },
  {
    question: 'How much can PSLF actually save me?',
    answer:
      'It scales inversely with income and directly with debt. A public defender with $140,000 in loans on a $58,000 salary might pay roughly $45,000–$55,000 over 120 months on an income-driven plan, then have $130,000+ forgiven tax-free — a six-figure benefit. A high earner with modest debt may pay most of the loan off within 120 months and have little forgiven, making PSLF marginal for them — the calculator flags this case explicitly.',
  },
  {
    question: 'What employers qualify for PSLF?',
    answer:
      'Qualifying employment is defined by where you work, not what you do. U.S. federal, state, local, and tribal government organizations (including public schools, the military, and public hospitals) and 501(c)(3) non-profits qualify. For-profit companies, labor unions, and partisan political organizations never qualify — even contractors doing government work, because the for-profit employer of record is what counts.',
  },
  {
    question: 'What is the most common way people lose PSLF?',
    answer:
      'The top causes: having FFEL/Perkins loans that were never consolidated into a Direct Loan (years of payments do not count), being silently parked in forbearance by a servicer (those months do not count), and not certifying qualifying employment annually (gaps and lost records surface at year 10). Submit the PSLF employment certification form every year and verify your loan types and repayment status in writing.',
  },
  {
    question: 'Should I make extra payments if I am pursuing PSLF?',
    answer:
      'No. If you are genuinely pursuing PSLF, pay exactly the required income-driven amount and not a cent more. Every dollar you prepay is a dollar that would otherwise have been forgiven tax-free. Direct any spare money toward retirement contributions or an emergency fund instead. Prepaying while pursuing PSLF is the single most expensive mistake borrowers make.',
  },
  {
    question: 'Does refinancing affect PSLF eligibility?',
    answer:
      'Yes — permanently. Refinancing federal loans into a private loan forfeits PSLF eligibility forever, along with income-driven repayment and federal deferment protections. Never refinance federal loans to a private lender if there is any chance you will pursue PSLF. See the student loan refinance guide on this site to model the trade-off before giving up forgiveness for a lower rate.',
  },
];

export default function PslfCalculatorPage() {
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
    headline: pslfGuideMeta.headline,
    description: pslfGuideMeta.description,
    url: CANONICAL,
    datePublished: pslfGuideMeta.datePublished,
    dateModified: pslfGuideMeta.dateModified,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Hero banner — compact on mobile so the calculator is above the fold */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-5xl px-4 py-4 sm:py-7">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
            PSLF Calculator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl sm:mt-2 sm:text-base">
            Estimate your Public Service Loan Forgiveness — your income-driven payment, what you pay over 120 months, and how much is forgiven tax-free.
          </p>
          <p className="mt-2 hidden text-sm text-muted-foreground max-w-2xl md:block">
            PSLF erases the remaining balance on federal Direct Loans after 120 qualifying payments while you work full-time for a government or 501(c)(3) employer — tax-free. Because the income-driven payment is capped at a share of your discretionary income, a high balance on a modest public-service salary can mean six figures forgiven. Enter your numbers below to estimate the outcome.
          </p>
        </div>
      </div>

      {/* Breadcrumb — visible trail + emits BreadcrumbList JSON-LD */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Loan Calculators', href: '/' },
          { label: 'PSLF Calculator' },
        ]}
      />

      {/* Calculator */}
      <PslfCalculator />

      {/* Inline related calculators — quick cross-links right after the tool */}
      <InlineRelatedCalculators currentPath={PATH} />

      {/* In-depth educational guide (per-page original content) */}
      <GuideSection>
        <PslfGuide />
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
