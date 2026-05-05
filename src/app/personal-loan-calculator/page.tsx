import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import PersonalLoanGuide, { meta as personalLoanGuideMeta } from '@/content/guides/personal-loan';
import { SITE_URL } from '@/lib/constants';

const PATH = '/personal-loan-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator — Instant Monthly Payment Estimator',
  description:
    'Calculate your personal loan EMI instantly. Enter loan amount, interest rate, and tenure to see monthly payment, total interest, and full amortization schedule. Free and accurate.',
  keywords: [
    'personal loan calculator',
    'personal loan EMI calculator',
    'unsecured loan calculator',
    'consumer loan calculator',
    'instant loan EMI',
    'personal loan monthly payment',
    'personal loan interest calculator',
    'quick loan calculator',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Personal Loan EMI Calculator — Free Monthly Payment Estimator',
    description:
      'Instantly calculate your personal loan EMI, total interest payable, and amortization schedule. Compare lender offers and find the best deal.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function PersonalLoanCalculatorPage() {
  return (
    <LoanLandingPage
      title="Personal Loan EMI Calculator"
      subtitle="Calculate your monthly EMI for a personal or consumer loan. Adjust amount, rate, and tenure to find repayment terms that fit your budget."
      intro="Personal loans are typically unsecured and carry higher interest rates than secured loans. Even a 1–2% rate difference between lenders adds up significantly over a 3–5 year term. Use the Compare tab to put multiple offers side by side before committing."
      defaultParams={{ principal: 20_000, annualRate: 12, tenureMonths: 60 }}
      canonicalPath={PATH}
      tabs={{
        calculator: {
          title: 'Calculate Personal Loan EMI',
          body: 'Enter your personal loan amount, interest rate, and repayment period to instantly see your monthly EMI, total interest, and full amortization schedule.',
        },
        compare: {
          title: 'Compare Lender Offers',
          body: 'Received offers from multiple lenders? Compare up to three personal loan options side by side to find the cheapest deal by total interest paid.',
        },
        affordability: {
          title: 'Check How Much You Can Borrow',
          body: 'Check how much personal loan you can safely afford based on your gross monthly income and preferred EMI-to-income ratio before applying.',
        },
        restructure: {
          title: 'Analyse Refinancing',
          body: 'Already have a personal loan at a high rate? Model the true cost of refinancing — including surcharges and processing fees — before making a move.',
        },
      }}
      guide={<PersonalLoanGuide />}
      guideMeta={personalLoanGuideMeta}
      faq={[
        {
          question: 'How is personal loan EMI calculated?',
          answer:
            'Personal loan EMI uses the reducing-balance formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the tenure in months. For example, a 500,000 loan at 15% p.a. for 5 years gives an EMI of approximately 11,895.',
        },
        {
          question: 'How do I compare two personal loan offers?',
          answer:
            'Switch to the Compare tab and enter each lender\'s rate and tenure. The side-by-side view shows EMI, total interest, and total repayment for each scenario. The lender with the lowest total interest is the cheapest, even if the EMI looks similar.',
        },
        {
          question: 'When is the best time to make a personal loan prepayment?',
          answer:
            'Prepayments made in the first half of the loan tenure save the most interest, because outstanding principal is highest early on. Use the Prepayment Simulator in the Calculator tab to model exactly how much you save and how many months you cut off.',
        },
        {
          question: 'What EMI-to-income ratio is considered safe for a personal loan?',
          answer:
            'Most financial advisors recommend keeping total loan EMIs below 40–50% of your gross monthly income. The Affordability tab lets you set your preferred ratio and instantly shows the maximum loan amount you can safely take at any given rate and tenure.',
        },
      ]}
    />
  );
}
