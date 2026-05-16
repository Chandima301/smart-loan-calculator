import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import RefinanceGuide, { meta as refinanceGuideMeta } from '@/content/guides/refinance';
import { SITE_URL } from '@/lib/constants';

const PATH = '/refinance-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Refinance Calculator — Break-Even Month & Lifetime Savings',
  description:
    'Find out exactly when refinancing pays off — break-even month, lifetime savings, and closing-cost amortization. Side-by-side comparison with keeping your current loan. Free, no signup.',
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
    title: 'Refinance Calculator — Break-Even Month & Lifetime Savings',
    description:
      'Find out exactly when refinancing pays off — break-even month, lifetime savings, true cost after fees. Free, no signup.',
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
      defaultParams={{ principal: 300_000, annualRate: 5.5, tenureMonths: 360 }}
      canonicalPath={PATH}
      primaryTab="restructure"
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
        {
          question: 'What is the difference between a rate-and-term and a cash-out refinance?',
          answer:
            'A rate-and-term refinance replaces your loan with a new one at a better rate and/or different term, with no new money taken out — it is the classic money-saving move. A cash-out refinance replaces your loan with a larger one and gives you the difference in cash. Cash-out is far more expensive than it looks because you pay the new rate on the entire balance, not just the extracted cash — refinancing a low-rate first mortgage to pull out equity often costs six figures over the life of the loan.',
        },
        {
          question: 'How much do refinance closing costs typically run?',
          answer:
            'On a $300,000 refinance, expect $3,000–$9,000+ depending mostly on your state. Major line items: origination/underwriting fee ($1,500–$3,000), appraisal ($400–$700), title search and insurance ($700–$1,500), recording fees ($50–$250), state transfer/mortgage tax ($0–$3,000+, the most variable item), and escrow setup ($300–$1,000). Always compare the itemized Loan Estimate across at least three lenders.',
        },
        {
          question: 'What is a "no-cost" refinance — is it really free?',
          answer:
            'No. The lender either rolls the closing costs into your loan balance (so you pay interest on them for the full term) or gives you a slightly higher rate that recovers the same money over time. A no-cost refinance can still be the right choice if you are unsure how long you will keep the loan, since you avoid sinking cash into costs you might not recoup — but compare the all-in lifetime math, not the marketing label.',
        },
        {
          question: 'Is a mortgage recast cheaper than a refinance?',
          answer:
            'If your only goal is a lower monthly payment and your current rate is already competitive, yes. A recast applies a large lump sum to principal and re-amortizes the remaining balance over the original term for a flat $150–$500 fee, with no appraisal, credit check, or closing costs — and your existing rate is preserved. Refinance instead only when current rates are meaningfully below your rate. Many borrowers pay thousands to refinance when a $400 recast would have achieved their actual goal.',
        },
        {
          question: 'Does refinancing reset my loan term?',
          answer:
            'It can, and this is a common hidden cost. Refinancing a loan that is 5 years into a 30-year term into a fresh 30-year term means paying interest for 35 total years on what started as a 30-year loan, even at a lower rate. To avoid this, refinance into a term equal to (or shorter than) your remaining term. The Restructure tab lets you set the new term explicitly so you can see the lifetime-interest effect, not just the monthly-payment change.',
        },
        {
          question: 'Why compare APR instead of just the interest rate when refinancing?',
          answer:
            'The interest rate determines your monthly payment, but the APR folds in mandatory finance charges (origination fees, certain closing costs) and is the legally required apples-to-apples comparison number. Two refinance offers with the same rate but different fee structures will have different APRs — the lower-APR offer costs you less overall. Always rank competing refinance offers by APR.',
        },
        {
          question: 'Will my credit score affect the refinance rate I actually get?',
          answer:
            'Yes — significantly. Advertised refinance rates assume top-tier credit. If your score has dropped since the original loan, the rate you qualify for may be higher than your current rate even in a falling-rate environment. Always pull a real rate quote based on your current credit profile before assuming the headline rate applies. A 60–80 point score difference can move the rate by half a percentage point or more.',
        },
      ]}
    />
  );
}
