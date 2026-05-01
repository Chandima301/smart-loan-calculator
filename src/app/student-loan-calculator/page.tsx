import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import StudentLoanGuide, { meta as studentLoanGuideMeta } from '@/content/guides/student-loan';
import { SITE_URL } from '@/lib/constants';

const PATH = '/student-loan-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Student Loan Calculator — Monthly Payment & Payoff Estimator',
  description:
    'Calculate your student loan monthly payment, total interest, and payoff timeline. See how much you save with extra payments and compare repayment plans side by side.',
  keywords: [
    'student loan calculator',
    'student loan payment calculator',
    'student loan payoff calculator',
    'federal student loan calculator',
    'private student loan calculator',
    'education loan calculator',
    'college loan calculator',
    'student loan refinance calculator',
    'student loan repayment calculator',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Student Loan Calculator — Free Monthly Payment & Payoff Tool',
    description:
      'Calculate monthly payments, total interest, and how much you save with extra payments on federal or private student loans.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function StudentLoanCalculatorPage() {
  return (
    <LoanLandingPage
      title="Student Loan Calculator"
      subtitle="Estimate your monthly student loan payment, total interest, and full payoff schedule across any repayment term."
      intro="Student loans usually have 10–25 year repayment periods and interest rates between 4–12% depending on whether they're federal or private. Small extra monthly payments made early can shave years off the payoff date and save thousands in interest. Use the Prepayment Simulator to see your break-even point."
      defaultParams={{ principal: 30_000, annualRate: 6.5, tenureMonths: 120 }}
      canonicalPath={PATH}
      tabs={{
        calculator: {
          title: 'Calculate Student Loan Payment',
          body: 'Enter your balance, rate, and repayment period to see your monthly payment, total interest, and complete amortization schedule month by month.',
        },
        compare: {
          title: 'Compare Repayment Plans',
          body: 'Compare standard vs extended repayment, or compare a federal loan against a private refinance offer, side by side across up to three scenarios.',
        },
        affordability: {
          title: 'Check Affordable Loan Size',
          body: 'Before borrowing more for graduate school, check how much you can safely handle based on your projected income after graduation.',
        },
        restructure: {
          title: 'Should You Refinance?',
          body: 'Considering refinancing to a lower rate? Enter your current balance, any refinancing fees, and new terms to see the true lifetime saving — and your break-even month.',
        },
      }}
      guide={<StudentLoanGuide />}
      guideMeta={studentLoanGuideMeta}
      faq={[
        {
          question: 'How is my student loan monthly payment calculated?',
          answer:
            'Standard student loan payment uses the amortization formula: Payment = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is your remaining balance, r is the monthly interest rate (annual rate ÷ 12), and n is the number of months left. A $30,000 balance at 6.5% over 10 years works out to about $341 per month.',
        },
        {
          question: 'Should I make extra payments on my student loans?',
          answer:
            'Yes — extra payments applied to principal reduce the balance that accrues interest, compounding your savings over time. A $50 extra monthly payment on a $30,000 loan at 6.5% over 10 years saves roughly $2,500 in interest and cuts the payoff by 14 months. Use the Prepayment Simulator to model your specific situation.',
        },
        {
          question: 'Is it worth refinancing a student loan?',
          answer:
            'Refinancing is usually worth it if you can drop your interest rate by 1–2% or more AND you won\'t lose benefits like income-driven repayment or loan forgiveness. The Restructure tab lets you plug in your current balance, new rate, and any refinancing fees to see the exact break-even month and total interest saved.',
        },
        {
          question: 'What\'s the difference between subsidized and unsubsidized student loans?',
          answer:
            'Subsidized loans don\'t accrue interest while you\'re in school or during deferment — the government pays it. Unsubsidized loans accrue interest from day one, which capitalizes (gets added to principal) when you start repayment. This calculator handles either type once you know your total balance at repayment start.',
        },
      ]}
    />
  );
}
