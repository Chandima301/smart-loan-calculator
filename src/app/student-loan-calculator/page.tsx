import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import StudentLoanGuide, { meta as studentLoanGuideMeta } from '@/content/guides/student-loan';
import { SITE_URL } from '@/lib/constants';

const PATH = '/student-loan-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Student Loan Calculator — Federal & Private, No Signup, Full Schedule',
  description:
    'Calculate your student loan monthly payment, total interest, and payoff timeline for federal or private loans. Compare repayment plans including SAVE, PAYE, IBR, and see how extra payments accelerate payoff. Free, no signup.',
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
    title: 'Student Loan Calculator — Federal & Private, No Signup, Full Schedule',
    description:
      'Calculate student loan monthly payment, total interest, and payoff timeline. Compare SAVE/PAYE/IBR plans. Free, no signup.',
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
        {
          question: 'What is the difference between federal and private student loans?',
          answer:
            'Federal loans are issued by the Department of Education with a fixed rate set by Congress and a thick layer of protections — income-driven repayment, deferment, forbearance, PSLF, and death/disability discharge. Private loans come from banks at a market rate (fixed or variable) and have essentially none of those protections. If a loan is listed on StudentAid.gov it is federal; anything not listed there is private.',
        },
        {
          question: 'What is income-driven repayment (IDR)?',
          answer:
            'IDR plans (SAVE, PAYE, IBR, ICR) cap your monthly payment at roughly 10% of discretionary income — income above 1.5× the federal poverty guideline for your family size — instead of the amount needed to amortize the loan in 10 years. Any balance remaining after the plan term (20–25 years) is forgiven. On $60,000 at 6% with a $48,000 salary, the standard payment is about $666/month while an IDR payment is roughly $220/month.',
        },
        {
          question: 'What is PSLF and how is it different from IDR forgiveness?',
          answer:
            'Public Service Loan Forgiveness erases the remaining federal Direct Loan balance tax-free after 120 qualifying payments while working full-time for a government or 501(c)(3) employer. It is distinct from the 20–25 year IDR forgiveness (which has historically been taxable). Use the dedicated PSLF Calculator on this site to estimate your income-driven payment and tax-free forgiveness.',
        },
        {
          question: 'Should I refinance my federal loans into a private loan?',
          answer:
            'Only if you have a high stable income, no public-service path, a solid emergency fund, and a genuinely lower fixed rate — because refinancing federal loans permanently forfeits IDR, PSLF, deferment, and discharge, and the move is irreversible. Run the dedicated Student Loan Refinance Calculator first; it shows both the interest math and the full list of protections you would give up.',
        },
        {
          question: 'When does student loan interest capitalize?',
          answer:
            'Capitalization — unpaid interest added to principal, after which you pay interest on the interest — typically happens at the end of the grace period, when exiting a deferment or forbearance, and on certain income-driven-plan exits. Paying even the accruing interest on unsubsidized loans while still in school prevents the balance from ballooning before repayment begins.',
        },
        {
          question: 'Avalanche or snowball for multiple student loans?',
          answer:
            'Avalanche (attack the highest-rate loan first) is mathematically cheapest and worth it when your loans have a wide rate spread. Snowball (attack the smallest balance first) costs slightly more interest but has a higher real-world completion rate. If you have ever abandoned a payoff plan, use the snowball. The Student Loan Payoff Calculator models extra-payment scenarios in detail.',
        },
        {
          question: 'What happens if I default on federal student loans?',
          answer:
            'Federal loans enter default after 270 days of missed payments. Default triggers wage garnishment, tax-refund seizure, and the loss of all flexible repayment options. If you cannot make a payment, contact your servicer and switch to an income-driven plan or request forbearance before default — both keep you out of it and preserve your options.',
        },
        {
          question: 'Should I prioritize student loans over retirement savings?',
          answer:
            'Usually not before the basics. Capture the full employer retirement match first (a 100% guaranteed return beats any loan rate), clear genuinely high-interest debt like credit cards, and build a 3–6 month emergency fund. Accelerated student-loan payoff is the right move only after those — and never on a federal loan headed for PSLF or IDR forgiveness, where extra payments simply reduce the amount forgiven.',
        },
      ]}
    />
  );
}
