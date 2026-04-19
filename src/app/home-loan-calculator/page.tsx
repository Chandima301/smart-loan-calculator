import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import { SITE_URL } from '@/lib/constants';

const PATH = '/home-loan-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator — Monthly Mortgage Payment Estimator',
  description:
    'Calculate your home loan EMI instantly. Enter loan amount, interest rate, and tenure to get monthly payment, total interest, and full amortization schedule. Free and accurate.',
  keywords: [
    'home loan calculator',
    'home loan EMI calculator',
    'housing loan calculator',
    'housing finance calculator',
    'property loan calculator',
    'home loan monthly payment',
    'home loan interest calculator',
    'mortgage EMI calculator',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Home Loan EMI Calculator — Free Monthly Payment Estimator',
    description:
      'Instantly calculate your home loan EMI, total interest payable, and amortization schedule. Compare scenarios and simulate prepayments.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function HomeLoanCalculatorPage() {
  return (
    <LoanLandingPage
      title="Home Loan EMI Calculator"
      subtitle="Calculate your monthly EMI for a home or housing loan. Adjust amount, rate, and tenure to find repayment terms that fit your budget."
      intro="Home loans typically span 10–30 years. Even a 0.5% difference in interest rate can save or cost lakhs over the full tenure. Use the Prepayment simulator to see how an extra monthly contribution cuts your total interest bill significantly."
      defaultParams={{ principal: 5_000_000, annualRate: 8.5, tenureMonths: 240 }}
      canonicalPath={PATH}
      tabs={{
        calculator: {
          title: 'Calculate Home Loan EMI',
          body: 'Compute your monthly home loan payment. Adjust principal, rate, and tenure to find a repayment plan that fits your budget.',
        },
        compare: {
          title: 'Compare Bank Offers',
          body: 'Put two or three home loan offers from different banks side by side. Compare EMI, total interest, and total repayment at a glance.',
        },
        affordability: {
          title: 'Check Your Eligibility',
          body: 'Find the maximum home loan you can take based on your monthly income and preferred EMI-to-income ratio.',
        },
        restructure: {
          title: 'Analyse Refinancing',
          body: 'Considering refinancing your home loan to a lower rate? Enter your remaining balance, surcharge, and new terms to see if it\'s worth it.',
        },
      }}
      faq={[
        {
          question: 'How is home loan EMI calculated?',
          answer:
            'Home loan EMI uses the reducing-balance formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the tenure in months. The calculator applies this formula instantly as you adjust the sliders.',
        },
        {
          question: 'What is a good interest rate for a home loan?',
          answer:
            'Home loan rates vary by country and lender. In the US, 30-year fixed mortgage rates typically range from 6–8%. In India and South Asia, housing finance rates are typically 8–12%. In the UK, fixed-rate products usually sit at 4–6%. Use the Rate Sensitivity table in the Calculator tab to compare how different rates affect your monthly payment.',
        },
        {
          question: 'Should I choose a shorter or longer home loan tenure?',
          answer:
            'A shorter tenure means a higher EMI but significantly less total interest. A 20-year loan versus a 10-year loan at the same rate roughly doubles the interest paid. Use the Compare tab to put a 10-year and 20-year scenario side by side and see the exact difference in total cost.',
        },
        {
          question: 'How much can I save with home loan prepayments?',
          answer:
            'Prepayments reduce outstanding principal directly, cutting future interest. Even a modest extra monthly payment made in the first few years can eliminate years off your tenure and save tens of thousands in interest. Click "Simulate" in the Prepayment section of the Calculator tab to model your exact scenario.',
        },
      ]}
    />
  );
}
