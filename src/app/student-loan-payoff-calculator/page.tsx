import type { Metadata } from 'next';
import LoanLandingPage from '@/components/landing/LoanLandingPage';
import StudentLoanPayoffGuide, { meta as payoffGuideMeta } from '@/content/guides/student-loan-payoff';
import { SITE_URL } from '@/lib/constants';

const PATH = '/student-loan-payoff-calculator';
const CANONICAL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: 'Student Loan Payoff Calculator — Extra-Payment Savings, No Signup',
  description:
    'See exactly how much faster you pay off student loans and how much interest you save with extra payments. Avalanche vs snowball, the federal-forgiveness trap, and the prepayment math. Free, no signup.',
  keywords: [
    'student loan payoff calculator',
    'pay off student loans faster',
    'student loan extra payment calculator',
    'student loan prepayment calculator',
    'avalanche vs snowball student loans',
    'student loan early payoff',
    'student loan payoff date',
    'student loan interest saved',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Student Loan Payoff Calculator — Extra-Payment Savings, No Signup',
    description:
      'See how much faster you pay off student loans and how much interest extra payments save. Avalanche vs snowball, the forgiveness trap. Free, no signup.',
    url: CANONICAL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function StudentLoanPayoffCalculatorPage() {
  return (
    <LoanLandingPage
      title="Student Loan Payoff Calculator"
      subtitle="See exactly how many years and how much interest you save by adding extra payments to your student loans — the simulator opens ready, with the extra-payment fields front and center."
      intro="An extra dollar of principal paid early is worth far more than a dollar, because it removes the interest that dollar would have generated for the rest of the loan. The Payoff Simulator below opens with the extra-payment controls already expanded — set a monthly extra or a one-time lump sum and watch the payoff date and total interest drop. Then read the guide for the avalanche-vs-snowball strategy and the one situation — federal loans headed for forgiveness — where prepaying is a costly mistake."
      defaultParams={{ principal: 35_000, annualRate: 6.5, tenureMonths: 120 }}
      canonicalPath={PATH}
      primaryTab="calculator"
      enabledTabs={['calculator', 'compare', 'affordability']}
      prepaymentDefaultOpen
      prepaymentDrivenResults
      tabLabels={{ calculator: 'Payoff Simulator' }}
      tabs={{
        calculator: {
          title: 'Payoff Simulator (extra payments)',
          body: 'Opens with the extra-payment controls already expanded. Add a monthly extra or a lump sum and instantly see how many months drop off the payoff and how much interest you avoid — with the full amortization month by month.',
        },
        compare: {
          title: 'Compare Payoff Scenarios',
          body: 'Put a standard schedule next to an accelerated one, or compare two extra-payment amounts side by side, to see the exact difference in years and interest.',
        },
        affordability: {
          title: 'How Much Extra Can You Afford?',
          body: 'Before committing to an aggressive payoff, check what extra payment your budget can sustain without crowding out retirement or an emergency fund.',
        },
        restructure: {
          title: 'Payoff vs Refinance',
          body: 'Not shown on this page — refinancing is covered by the dedicated Student Loan Refinance Calculator.',
        },
      }}
      guide={<StudentLoanPayoffGuide />}
      guideMeta={payoffGuideMeta}
      faq={[
        {
          question: 'How much can extra payments save on student loans?',
          answer:
            'It depends on the size and timing of the extra payment. On a $35,000 loan at 6.5% over 10 years (~$397/month), adding $75/month of extra principal from the start pays it off about 1 year 8 months early and saves roughly $2,800 in interest. Adding $200/month clears it in about 6 years and saves over $5,600. The earlier you start the extra payment, the more it saves — model your exact numbers in the Prepayment Simulator.',
        },
        {
          question: 'Avalanche or snowball — which is better for student loans?',
          answer:
            'The avalanche (attack the highest-rate loan first) is mathematically the cheapest and is worth it when your loans have a wide rate spread (3+ points). The snowball (attack the smallest balance first) costs slightly more in interest but produces a paid-off loan quickly, which has a high real-world completion rate. If you have ever quit a payoff plan, use the snowball — a finished plan beats a cheaper abandoned one.',
        },
        {
          question: 'When should I NOT pay off student loans faster?',
          answer:
            'If your federal loans are on track for PSLF or income-driven-plan forgiveness, every extra dollar you pay is a dollar that would have been forgiven — prepaying just hands it over for nothing. On a forgiveness track, the correct extra payment is exactly $0; the money belongs in retirement or an emergency fund. Accelerated payoff is right for private loans and federal loans you will definitely repay in full, not loans headed for forgiveness.',
        },
        {
          question: 'How do I make sure my extra payment reduces the balance?',
          answer:
            'Servicers do not apply extra money to principal by default — many treat it as paying next month early, which advances the due date but saves no interest. Make the extra payment a separate "principal-only" transaction in the servicer portal, specify which loan it applies to if you have several, and verify on the next statement that the balance dropped and the due date did not move.',
        },
        {
          question: 'Should I pay off student loans before investing?',
          answer:
            'Not before the basics. Capture the full employer retirement match first (a 100% guaranteed return beats any loan rate), eliminate genuinely high-interest debt like credit cards, and build a 3–6 month emergency fund. Only then accelerate student-loan payoff. Overpaying a 5% loan while skipping a 100% match or carrying 22% credit-card debt is the lowest-return move available.',
        },
        {
          question: 'Is a lump sum or a monthly extra payment better?',
          answer:
            'A lump sum applied early is the most efficient per dollar because it removes principal before it can generate years of interest. A steady monthly extra is slightly less efficient but easier to sustain and automate. The strongest approach is both — automate a modest monthly extra and direct any windfall straight to principal — without draining your emergency fund to do it.',
        },
        {
          question: 'Does paying off a student loan early hurt my credit?',
          answer:
            'Paying off an installment loan early has, at most, a minor and temporary effect — closing a loan in good standing can slightly reduce credit-mix variety, but the long-term effect of being debt-free and lowering your debt-to-income ratio is positive. Credit impact is not a real reason to keep a loan you can responsibly pay off (unless it is on a forgiveness track, which is a different decision entirely).',
        },
        {
          question: 'Should I refinance before accelerating payoff?',
          answer:
            'For a high-rate private loan with strong credit, refinancing to a lower rate and then accelerating compounds the benefit. For a federal loan, refinancing into a private loan to chase a rate is usually a mistake if there is any chance you will need income-driven repayment or PSLF — you forfeit those permanently. Optimize the rate first only when it does not cost you a protection you might need; then accelerate.',
        },
      ]}
    />
  );
}
