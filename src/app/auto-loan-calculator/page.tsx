import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import AutoLoanGuide, { meta as autoLoanGuideMeta } from '@/content/guides/auto-loan';
import { SITE_URL } from '@/lib/constants';

const PATH = '/auto-loan-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Auto & Car Loan Calculator — Free APR & Payment Calculator',
  description:
    'Calculate your auto or car loan APR, monthly payment, and total interest in seconds. See credit-tier rate ranges and how down payment changes total cost. Free, no signup, no email gating.',
  keywords: [
    'auto loan calculator',
    'car loan calculator',
    'auto loan payment calculator',
    'car loan EMI calculator',
    'car finance calculator',
    'vehicle loan calculator',
    'auto loan interest calculator',
    'new car loan calculator',
    'used car loan calculator',
    'auto loan amortization',
    'auto loan refinance calculator',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Auto & Car Loan Calculator — Free APR & Payment Calculator',
    description:
      'Calculate auto or car loan APR, monthly payment, and total interest. Compare dealer vs bank financing. Free, no signup.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function AutoLoanCalculatorPage() {
  return (
    <LoanLandingPage
      title="Auto & Car Loan Calculator"
      subtitle="Estimate your monthly car or auto loan payment, total interest, and full amortization across any financing term — in any currency."
      intro="Auto loans (also called car loans) typically run 36–84 months at rates between 5–12% depending on credit score, lender, and whether the car is new or used. A bigger down payment, shorter term, or stronger credit all reduce total interest paid. Compare multiple offers side by side before you sign at the dealer."
      defaultParams={{ principal: 25_000, annualRate: 7.5, tenureMonths: 60 }}
      canonicalPath={PATH}
      answer={
        <>
          A <strong>$35,000 car loan at 7.5% APR over 60 months</strong> has a monthly payment of approximately <strong>$701</strong>, with about <strong>$7,074</strong> in total interest. The monthly payment uses the standard amortization formula <strong>M = P × r × (1+r)^n / ((1+r)^n − 1)</strong> (P = principal, r = monthly rate = annual ÷ 12, n = number of months). Auto and car loan APRs depend on credit tier (typically 5-15%) and term (36-84 months). Use the calculator below for your exact offer - no email signup required.
        </>
      }
      tabs={{
        calculator: {
          title: 'Calculate Auto Loan Payment',
          body: 'Enter the financed amount (price minus down payment and trade-in), your APR, and the loan term to see your monthly payment and total cost.',
        },
        compare: {
          title: 'Compare Financing Offers',
          body: 'Dealer financing, your bank, and a credit union all quoted you different rates? Compare up to three auto loan offers side by side to find the true cheapest option.',
        },
        affordability: {
          title: 'Check Affordable Car Price',
          body: 'Before you walk into the dealership, calculate the maximum auto loan you can comfortably afford based on your monthly income.',
        },
        restructure: {
          title: 'Should You Refinance Your Car Loan?',
          body: 'Rates dropped or your credit improved since you bought the car? Enter your current balance, any payoff fees, and new terms to see if refinancing saves you money.',
        },
      }}
      guide={<AutoLoanGuide />}
      guideMeta={autoLoanGuideMeta}
      faq={[
        {
          question: 'How is my auto loan monthly payment calculated?',
          answer:
            'Your auto payment uses the standard amortization formula: Payment = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the financed amount, r is the monthly rate (APR ÷ 12), and n is the number of months. A $25,000 loan at 7.5% APR over 60 months works out to about $501 per month, or roughly $30,064 total.',
        },
        {
          question: 'Should I take a 60-month or 72-month auto loan?',
          answer:
            'Longer terms mean lower monthly payments but much more interest. On a $25,000 loan at 7.5%, 60 months costs ~$5,064 in interest, while 72 months costs ~$6,125 — $1,061 more for a $84 lower monthly payment. Use the Compare tab to see the exact trade-off for your numbers.',
        },
        {
          question: 'How much does a down payment affect my auto loan?',
          answer:
            'Every $1,000 added to your down payment reduces your financed amount by $1,000, which saves both monthly payment and total interest. On a 60-month 7.5% loan, an extra $5,000 down saves roughly $1,013 in total interest and $100 per month — plus it protects you from being "underwater" if the car depreciates faster than you pay it down.',
        },
        {
          question: 'When is auto loan refinancing worth it?',
          answer:
            'Refinancing usually makes sense if your credit score improved by 50+ points, rates have dropped 1%+ since you bought, or you want to extend the term to lower monthly payments. Watch out for prepayment penalties on your current loan and any origination fees on the new one — use the Restructure tab to calculate your true break-even month.',
        },
      ]}
    />
  );
}
