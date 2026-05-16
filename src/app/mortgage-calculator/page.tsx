import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import MortgageGuide, { meta as mortgageGuideMeta } from '@/content/guides/mortgage';
import { SITE_URL } from '@/lib/constants';

const PATH = '/mortgage-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Free, No Signup, Full Amortization',
  description:
    'See exactly what your mortgage costs over 30 years — monthly payment, lifetime interest, and full amortization schedule. Compare 15 vs 30-year terms side by side. Free, no signup, works in any currency.',
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
    title: 'Mortgage Calculator — Free, No Signup, Full Amortization',
    description:
      'See exactly what your mortgage costs over 30 years — monthly payment, lifetime interest, full amortization. Free, no signup.',
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
      defaultParams={{ principal: 400_000, annualRate: 6.5, tenureMonths: 360 }}
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
        {
          question: 'What is PITI and why does it matter?',
          answer:
            'PITI stands for Principal, Interest, Taxes, and Insurance — the full monthly housing payment. The mortgage calculator shows principal and interest, but your actual monthly outlay also includes property taxes (commonly 0.5%–2.5% of home value per year), homeowners insurance ($1,200–$2,500/year typical), and PMI if your down payment is under 20%. On a $500,000 mortgage the difference between P&I and full PITI is often $600–$1,000/month. Always assess affordability on PITI, not the bare mortgage payment.',
        },
        {
          question: 'When can I stop paying PMI?',
          answer:
            'Private Mortgage Insurance is required by most lenders when your down payment is below 20%. It is removed automatically once your loan-to-value ratio reaches 78% of the original value, and you can request early removal at 80% LTV. PMI typically costs 0.3%–1.5% of the loan balance per year, so removing it on a $400,000 loan can save $1,200–$6,000 annually.',
        },
        {
          question: 'How much does one percentage point of interest rate cost?',
          answer:
            'On a $500,000 mortgage over 30 years, moving from 6.5% to 5.5% — a single percentage point — reduces the monthly payment by roughly $322 and the lifetime interest by approximately $116,000. This is why shopping at least three lenders is the highest-value hour of work in the mortgage process: same-day rate spreads between lenders for the same borrower are frequently 0.25–0.5 percentage points.',
        },
        {
          question: 'Are discount points worth buying?',
          answer:
            'Discount points are upfront cash you pay to lower your interest rate — typically one point costs 1% of the loan and reduces the rate by about 0.25%. Whether they pay off depends entirely on how long you keep the loan. Divide the point cost by the monthly payment savings to get the break-even month. If you refinance or sell before that month, you lose money. Most borrowers who keep a loan fewer than five years should not buy points.',
        },
        {
          question: 'Is mortgage interest still tax deductible?',
          answer:
            'Mortgage interest is deductible on U.S. federal returns up to a $750,000 principal cap for loans originated after late 2017. However, the 2017 standard-deduction increase means many taxpayers no longer itemize, so the deduction has no real value unless your total itemized deductions exceed the standard deduction. Run your actual numbers before factoring tax savings into affordability — for a large share of borrowers the benefit is zero.',
        },
        {
          question: 'What is the difference between a conforming and a jumbo loan?',
          answer:
            'A conforming loan falls within the size limit eligible for purchase by Fannie Mae or Freddie Mac, which makes the secondary market deeper and rates typically lower. A jumbo loan exceeds that limit, cannot be sold to the government-sponsored entities, and usually carries a slightly higher rate plus stricter underwriting (larger down payment, more reserves). If your loan is just above the conforming limit, a larger down payment to drop under it can meaningfully lower your rate.',
        },
        {
          question: 'Should I choose a fixed-rate or adjustable-rate mortgage?',
          answer:
            'A fixed-rate mortgage keeps the same rate and payment for the entire term — fully predictable. An adjustable-rate mortgage (ARM) offers a lower rate for an initial period (e.g. 5 years on a 5/1 ARM) then resets periodically against a benchmark. ARMs make sense only if you are confident you will sell or refinance before the reset, or if you can comfortably absorb a 2–4 percentage point rate increase. For most buyers planning to stay long-term, the predictability of a fixed rate outweighs the lower teaser rate of an ARM.',
        },
      ]}
    />
  );
}
