import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import PslfGuide, { meta as pslfGuideMeta } from '@/content/guides/pslf';
import { SITE_URL } from '@/lib/constants';

const PATH = '/pslf-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'PSLF Calculator — Public Service Loan Forgiveness, No Signup',
  description:
    'Estimate your Public Service Loan Forgiveness outcome. See your 10-year payment baseline, understand the 120-payment rule, which repayment plans qualify, and how much could be forgiven tax-free. Free, no signup.',
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
      'Estimate your PSLF outcome — 10-year payment baseline, the 120-payment rule, qualifying plans, and tax-free forgiveness. Free, no signup.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function PslfCalculatorPage() {
  return (
    <LoanLandingPage
      title="PSLF Calculator"
      subtitle="See your 10-year federal student loan payment baseline and understand exactly how Public Service Loan Forgiveness works — the 120-payment rule, qualifying plans, and tax-free forgiveness."
      intro="Public Service Loan Forgiveness erases the remaining balance on federal Direct Loans after 120 qualifying payments while you work full-time for a government or 501(c)(3) employer — and the forgiven amount is tax-free. Use the calculator to see your standard 10-year payment baseline, then read the guide below to understand how an income-driven plan dramatically lowers what you actually pay before forgiveness."
      defaultParams={{ principal: 50_000, annualRate: 6.5, tenureMonths: 120 }}
      canonicalPath={PATH}
      tabs={{
        calculator: {
          title: 'Your 10-Year Payment Baseline',
          body: 'See what your federal student loan would cost on a standard 10-year (120-payment) schedule. On an income-driven plan your actual PSLF payments are usually far lower — the guide explains the difference.',
        },
        compare: {
          title: 'Compare Repayment Scenarios',
          body: 'Put a standard 10-year payoff side by side with a longer income-driven scenario to see how much smaller the qualifying payment becomes when it is capped at a share of income.',
        },
        affordability: {
          title: 'Check What You Can Afford',
          body: 'Before borrowing more for graduate or professional school in a public-service field, check what payment your projected salary can realistically support.',
        },
        restructure: {
          title: 'PSLF vs. Refinancing',
          body: 'Refinancing federal loans into a private loan permanently forfeits PSLF eligibility. Model the trade-off here before giving up forgiveness for a lower rate.',
        },
      }}
      guide={<PslfGuide />}
      guideMeta={pslfGuideMeta}
      faq={[
        {
          question: 'What is PSLF and who qualifies?',
          answer:
            'Public Service Loan Forgiveness erases the remaining balance on federal Direct Loans after 120 qualifying monthly payments made while working full-time (30+ hours/week) for a U.S. government organization at any level or a 501(c)(3) non-profit. The forgiven amount is tax-free under federal law. Private loans and most FFEL/Perkins loans do not qualify unless consolidated into a Direct Loan first.',
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
            'It scales inversely with income and directly with debt. A public defender with $140,000 in loans on a $58,000 salary might pay roughly $45,000–$55,000 over 120 months on an income-driven plan, then have $130,000+ forgiven tax-free — a six-figure benefit. A high earner with modest debt may pay most of the loan off within 120 months and have little forgiven, making PSLF marginal for them.',
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
            'Yes — permanently. Refinancing federal loans into a private loan forfeits PSLF eligibility forever, along with income-driven repayment and federal deferment protections. Never refinance federal loans to a private lender if there is any chance you will pursue PSLF. Use the Restructure tab to model the trade-off before giving up forgiveness for a lower rate.',
        },
      ]}
    />
  );
}
