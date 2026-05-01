import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import MortgageGuide, { meta as mortgageGuideMeta } from '@/content/guides/mortgage';
import { SITE_URL } from '@/lib/constants';

const PATH = '/mortgage-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Monthly Payment, Interest & Amortization',
  description:
    'Calculate your mortgage monthly payment instantly. Enter loan amount, interest rate, and term to see monthly payment, total interest, and full 30-year amortization schedule. Free and accurate.',
  keywords: [
    'mortgage calculator',
    'mortgage payment calculator',
    '30 year mortgage calculator',
    'home mortgage calculator',
    'mortgage amortization calculator',
    'monthly mortgage payment',
    'UK mortgage calculator',
    'Australian mortgage calculator',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Mortgage Calculator — Free Monthly Payment & Amortization Tool',
    description:
      'Instantly calculate your mortgage monthly payment, total interest, and full amortization schedule. Compare 15 vs 30-year terms and simulate overpayments.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function MortgageCalculatorPage() {
  return (
    <LoanLandingPage
      title="Mortgage Calculator"
      subtitle="Calculate your monthly mortgage payment for any fixed-rate home loan. Adjust the loan amount, interest rate, and term to find repayment terms that fit your budget."
      intro="A 30-year mortgage keeps monthly payments manageable but results in paying nearly as much in interest as the original loan amount. Switching to a 15-year term or making regular overpayments dramatically reduces total interest. Use the Compare tab to see the exact difference, and the Prepayment simulator to model overpayment strategies."
      defaultParams={{ principal: 5_000_000, annualRate: 6.5, tenureMonths: 360 }}
      canonicalPath={PATH}
      tabs={{
        calculator: {
          title: 'Calculate Mortgage Payment',
          body: 'Calculate your fixed-rate mortgage payment and see the full amortization schedule, including exactly when you pass the halfway point on principal repayment.',
        },
        compare: {
          title: 'Compare Mortgage Terms',
          body: 'Compare a 15-year vs 30-year mortgage, or two lenders\'s rates, to see the true difference in monthly payment and lifetime interest paid side by side.',
        },
        affordability: {
          title: 'Check Your Borrowing Power',
          body: 'Enter your household income to find the maximum mortgage you can qualify for based on standard debt-to-income guidelines used by lenders worldwide.',
        },
        restructure: {
          title: 'Evaluate Mortgage Refinancing',
          body: 'Exploring a refinance? Enter your outstanding balance, closing costs, and new rate to calculate your break-even month and total net saving over the remaining term.',
        },
      }}
      guide={<MortgageGuide />}
      guideMeta={mortgageGuideMeta}
      faq={[
        {
          question: 'How is a monthly mortgage payment calculated?',
          answer:
            'Mortgage payments use the standard amortization formula: M = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of payments. For example, a $500,000 mortgage at 6.5% p.a. over 30 years gives a monthly payment of approximately $3,160.',
        },
        {
          question: 'What is the difference between a 15-year and 30-year mortgage?',
          answer:
            'A 30-year mortgage has a lower monthly payment but you pay roughly 2–2.5× more total interest than a 15-year mortgage at the same rate. On a $500,000 loan at 6.5%, the 30-year option costs about $638,000 in total interest versus around $280,000 for the 15-year option. Use the Compare tab to model this for your exact loan amount and rate.',
        },
        {
          question: 'How much does a mortgage actually cost over its lifetime?',
          answer:
            'For a typical 30-year mortgage, you can expect to pay 70–90% of the original loan amount again in interest, depending on the rate. The amortization chart in the Calculator tab shows cumulative interest paid at every point, so you can see exactly when total repayment crosses key milestones.',
        },
        {
          question: 'How much can I save with mortgage overpayments?',
          answer:
            'Regular overpayments reduce outstanding principal faster, cutting interest on every future payment. Even a modest extra monthly payment in the early years can shave years off a 30-year mortgage and save tens of thousands in interest. Use the Prepayment Simulator in the Calculator tab to model the exact saving for your loan.',
        },
      ]}
    />
  );
}
