import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import RefinanceGuide, { meta as refinanceGuideMeta } from '@/content/guides/refinance';
import { SITE_URL } from '@/lib/constants';

const PATH = '/refinance-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Refinance Calculator — Break-Even & Lifetime Savings Estimator',
  description:
    'Calculate whether refinancing your loan is worth it. Enter your current balance, remaining term, new rate, and closing costs to see the exact break-even month and total savings.',
  keywords: [
    'refinance calculator',
    'loan refinance calculator',
    'mortgage refinance calculator',
    'refinance break-even calculator',
    'refinance savings calculator',
    'home refinance calculator',
    'refinance cost calculator',
    'refinance vs keep loan',
    'should I refinance calculator',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Refinance Calculator — Free Break-Even & Savings Tool',
    description:
      'Should you refinance? Calculate the exact break-even month, lifetime interest savings, and true cost after fees.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RefinanceCalculatorPage() {
  return (
    <LoanLandingPage
      title="Refinance Calculator"
      subtitle="Find out if refinancing your mortgage, auto loan, or personal loan is worth it — see the exact break-even month and total lifetime savings."
      intro="Refinancing replaces your existing loan with a new one at a lower rate or different term. Whether it pays off depends on three things: how much lower the new rate is, how long you plan to keep the loan, and how much you'll pay in closing costs or prepayment penalties. This calculator does the full math so you can make the decision with confidence."
      defaultParams={{ principal: 5_000_000, annualRate: 8.5, tenureMonths: 240 }}
      canonicalPath={PATH}
      tabs={{
        calculator: {
          title: 'Current Loan Baseline',
          body: 'Enter your current loan details to establish your baseline — monthly payment, remaining interest, and payoff schedule before any refinance.',
        },
        compare: {
          title: 'Compare Old vs New Loan',
          body: 'Line up your current loan against one or two refinance offers to see the real difference in monthly payment, total interest, and payoff date.',
        },
        affordability: {
          title: 'Check New Payment Fits',
          body: 'If you are refinancing to extend the term, verify the new monthly payment still fits comfortably within your income.',
        },
        restructure: {
          title: 'Break-Even & Net Savings',
          body: 'The core refinance tool: enter your remaining balance, new rate, new term, and closing costs to see the exact month you break even and your total lifetime saving.',
        },
      }}
      guide={<RefinanceGuide />}
      guideMeta={refinanceGuideMeta}
      faq={[
        {
          question: 'Is refinancing worth it? What rate drop do I need?',
          answer:
            'The classic rule is a 1% rate drop makes refinancing worth considering, and 2% makes it clearly worthwhile. But the real answer depends on your closing costs and how long you will keep the loan. If closing costs are $3,000 and you save $150 per month, your break-even is 20 months — refinance only if you plan to stay at least that long. The Restructure tab calculates this exactly.',
        },
        {
          question: 'What is the break-even point on a refinance?',
          answer:
            'Break-even is the month when your accumulated monthly savings equal the total closing costs. Before that point you lose money refinancing; after it you profit. On a $500,000 mortgage refinanced from 7.5% to 6.0% with $8,000 in closing costs, savings of ~$480/month hit break-even at month 17. Past month 17, every month is pure saving.',
        },
        {
          question: 'Should I pay closing costs upfront or roll them into the loan?',
          answer:
            'Paying upfront means smaller loan balance and less interest over time. Rolling costs into the loan keeps cash in your pocket but you pay interest on the closing costs for the full loan term. On a 30-year mortgage, rolling $5,000 in costs at 6% adds roughly $5,800 in interest — the Restructure tab lets you model both scenarios.',
        },
        {
          question: 'Can I refinance a personal loan or auto loan, not just a mortgage?',
          answer:
            'Yes. The same break-even math applies to any loan type. Auto loan refinancing often makes sense when your credit score improves by 50+ points. Personal loan refinancing (consolidation) makes sense when moving from a high-rate credit card or short-term loan to a lower-rate installment loan. Enter your current balance, remaining months, and new offer terms in the Restructure tab.',
        },
      ]}
    />
  );
}
