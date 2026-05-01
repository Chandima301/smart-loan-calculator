import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import CarLoanGuide, { meta as carLoanGuideMeta } from '@/content/guides/car-loan';
import { SITE_URL } from '@/lib/constants';

const PATH = '/car-loan-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator — Auto Loan Monthly Payment Calculator',
  description:
    'Calculate your car loan EMI instantly. Enter financed amount, interest rate, and loan tenure to see monthly payment, total interest, and full amortization schedule. Free and accurate.',
  keywords: [
    'car loan calculator',
    'auto loan calculator',
    'vehicle loan calculator',
    'car finance calculator',
    'auto finance EMI',
    'car loan monthly payment',
    'vehicle finance calculator',
    'car loan interest calculator',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Car Loan EMI Calculator — Free Auto Loan Payment Estimator',
    description:
      'Instantly calculate your car loan EMI, total interest payable, and amortization schedule. Compare dealer finance vs. bank offers and simulate early settlement.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function CarLoanCalculatorPage() {
  return (
    <LoanLandingPage
      title="Car Loan EMI Calculator"
      subtitle="Calculate your monthly EMI for a car or vehicle loan. Adjust the financed amount, interest rate, and tenure to find repayment terms that fit your budget."
      intro="Car loans are typically 3–7 years. Choosing a 3-year term over a 5-year term significantly reduces total interest paid, though your monthly EMI will be higher. Use the Compare tab to see the exact cost difference, and the Restructure tab to evaluate early settlement options."
      defaultParams={{ principal: 2_000_000, annualRate: 11, tenureMonths: 60 }}
      canonicalPath={PATH}
      tabs={{
        calculator: {
          title: 'Calculate Car Loan EMI',
          body: 'Calculate your car loan EMI and see the full amortization schedule. Set the financed amount after subtracting your down payment to get your exact monthly obligation.',
        },
        compare: {
          title: 'Compare Finance Options',
          body: 'Dealer finance vs. bank loan vs. credit union — compare up to three car finance options simultaneously to find the deal with the lowest total interest cost.',
        },
        affordability: {
          title: 'Find Your Car Budget',
          body: 'Find out how expensive a car you can finance based on your monthly income and preferred EMI-to-income ratio, so you shop within your means.',
        },
        restructure: {
          title: 'Evaluate Early Settlement',
          body: 'Thinking of paying off your car loan early or switching lenders? Enter the settlement charge and remaining balance to see if the interest saving justifies the fee.',
        },
      }}
      guide={<CarLoanGuide />}
      guideMeta={carLoanGuideMeta}
      faq={[
        {
          question: 'How is car loan EMI calculated?',
          answer:
            'Car loan EMI uses the reducing-balance formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the financed amount (purchase price minus down payment), r is the monthly rate (annual rate ÷ 12 ÷ 100), and n is the tenure in months. For example, financing 2,000,000 at 11% p.a. over 5 years gives an EMI of approximately 43,474.',
        },
        {
          question: 'Should I choose a 3-year or 5-year car loan?',
          answer:
            'A 3-year tenure means a higher monthly EMI but you pay roughly 40% less total interest than a 5-year loan at the same rate. Use the Compare tab to put a 3-year and 5-year scenario side by side and see the exact difference in monthly payment and total cost for your loan amount.',
        },
        {
          question: 'How does a down payment affect my car loan EMI?',
          answer:
            'A larger down payment directly reduces the amount you finance, which lowers both your EMI and total interest. For example, a 20% down payment on a car reduces your financed principal by 20%, cutting your EMI and total interest proportionally. Enter the financed amount (after down payment) into the Calculator to model this instantly.',
        },
        {
          question: 'Is it worth settling a car loan early?',
          answer:
            'Early settlement saves interest but typically incurs a penalty fee (often 1–3% of the outstanding balance). The Restructure tab lets you enter your remaining balance, penalty fee, and compare it against the interest you would save — it calculates the exact break-even point and net gain.',
        },
      ]}
    />
  );
}
