import type { GuideMeta } from '@/components/landing/LoanLandingPage';

export const meta: GuideMeta = {
  headline: 'PSLF vs Income-Driven Repayment: Which Path Out of Student Debt Saves More?',
  description:
    'PSLF forgives the balance tax-free after 10 years of public-service employment; income-driven repayment alone forgives after 20–25 years, potentially with a tax bill. The worked numbers show when each path wins — and when aggressive payoff beats both.',
  datePublished: '2026-06-10',
};

export const faq = [
  {
    question: 'What is the main difference between PSLF and IDR forgiveness?',
    answer:
      'Timeline and tax treatment. PSLF forgives your remaining federal loan balance after 120 qualifying monthly payments (10 years) while working full-time for a government or 501(c)(3) nonprofit employer, and the forgiven amount is not treated as federal taxable income. IDR-only forgiveness arrives after 20–25 years of payments, and the forgiven balance has historically been taxable in many years — a potentially large one-time bill.',
  },
  {
    question: 'Do I have to be on an income-driven plan to get PSLF?',
    answer:
      'Effectively yes. PSLF requires payments under a qualifying repayment plan, and income-driven plans are the ones that leave a balance to forgive. The 10-year Standard plan technically qualifies, but after 120 standard payments the balance is zero — there is nothing left to forgive. PSLF is best understood as IDR plus qualifying employment.',
  },
  {
    question: 'Who counts as a qualifying employer for PSLF?',
    answer:
      'Federal, state, local, or tribal government bodies (including public schools and the military) and 501(c)(3) nonprofit organizations. What matters is who employs you, not what you do — a doctor employed by a nonprofit hospital qualifies; the same doctor working for a private practice inside that hospital does not. Certify your employment annually rather than discovering a problem in year nine.',
  },
  {
    question: 'When is aggressive payoff better than chasing forgiveness?',
    answer:
      'When your debt is small relative to income. If your balance is below roughly your annual salary, income-driven payments are often large enough to pay the loan off before 20 years anyway — meaning nothing is left to forgive and you paid maximum interest along the way. Run the payoff math: if extra payments clear the loan in 5–8 years, forgiveness paths mostly add interest and paperwork.',
  },
  {
    question: 'Is IDR forgiveness really taxed?',
    answer:
      'Federal tax treatment has shifted repeatedly — forgiveness was broadly exempt for several years and taxable in others, and state treatment varies independently. Because the rules in force 20 years from now are unknowable, prudent planning treats a potential tax bill on IDR forgiveness as a real risk and sets expectations (or savings) accordingly. PSLF, by contrast, has been consistently tax-free at the federal level.',
  },
  {
    question: 'What are the most common ways people lose PSLF progress?',
    answer:
      'Wrong loan type (only Direct Loans qualify — older FFEL loans must be consolidated first), wrong repayment plan, employer not actually 501(c)(3), part-time hours falling below the full-time threshold, and long forbearances that pause qualifying payments. Each is detectable early by submitting the employment certification form every year.',
  },
];

export default function PslfVsIncomeDrivenRepaymentArticle() {
  return (
    <>
      <h2>Two Forgiveness Paths, One Decision</h2>
      <p>
        Federal student loan borrowers with large balances usually face a
        three-way fork: pay the debt down aggressively, ride an
        income-driven repayment (IDR) plan to long-term forgiveness, or —
        if their employer qualifies — pursue Public Service Loan
        Forgiveness (PSLF). The internet talks about PSLF and IDR as if
        they were rivals, which muddles the real relationship:{' '}
        <strong>PSLF is not an alternative to IDR — it sits on top of
        it.</strong> You make income-driven payments either way. The
        question is whether your employment unlocks the 10-year, tax-free
        exit instead of the 20–25 year one.
      </p>

      <h2>How Each Path Works</h2>
      <h3>Income-driven repayment alone</h3>
      <p>
        IDR plans size your payment from income rather than balance —
        historically around <strong>10% of discretionary income</strong>{' '}
        (income above a protected threshold tied to the poverty line),
        recalculated annually. Pay for 20–25 years (plan-dependent), and
        any remaining balance is forgiven. Two caveats define the path:
        interest can outpace small payments for years, so the balance may{' '}
        <em>grow</em> before it is forgiven, and the forgiven amount has
        been treated as taxable income in many tax years. A $90,000
        forgiven balance taxed at 24% is a <strong>$21,600 bill</strong>{' '}
        in a single April.
      </p>
      <h3>PSLF</h3>
      <p>
        PSLF forgives the remaining balance of your federal Direct Loans
        after <strong>120 qualifying monthly payments</strong> — about 10
        years — made under a qualifying plan (in practice, an IDR plan)
        while employed full-time by a{' '}
        <strong>government body or 501(c)(3) nonprofit</strong>. The
        payments need not be consecutive, and the forgiven amount is{' '}
        <strong>not federal taxable income</strong>. The catch is rigidity:
        the wrong loan type, plan, or employer classification silently
        stops the 120-payment clock.
      </p>

      <h2>The Worked Numbers: $80,000 Debt, $55,000 Salary</h2>
      <p>
        A nurse with $80,000 in Direct Loans at 6% interest earning
        $55,000 (growing ~3%/year) makes IDR payments of roughly{' '}
        <strong>$230–$300/month</strong> in the early years. Compare the
        three exits:
      </p>
      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>Years paying</th>
            <th>Approx. total paid</th>
            <th>Forgiven</th>
            <th>Tax on forgiveness</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PSLF (nonprofit hospital)</td>
            <td>10</td>
            <td>≈ $33,000</td>
            <td>≈ $85,000+</td>
            <td>None (federal)</td>
          </tr>
          <tr>
            <td>IDR only (private employer)</td>
            <td>20–25</td>
            <td>≈ $85,000–$110,000</td>
            <td>Whatever remains</td>
            <td>Possible, rules vary</td>
          </tr>
          <tr>
            <td>Aggressive payoff (+$700/mo extra)</td>
            <td>≈ 7</td>
            <td>≈ $99,000</td>
            <td>$0</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
      <p>
        With qualifying employment, PSLF dominates: roughly a third of the
        money over a third of the IDR-only timeline, with no tax exposure.
        That is the general pattern whenever{' '}
        <strong>debt is large relative to income</strong> and the employer
        qualifies. Note the balance often <em>grows</em> during the 10
        years — that is fine; PSLF forgives whatever remains.
      </p>

      <h2>When IDR-Only Is the Right Call</h2>
      <p>
        Without qualifying employment, the comparison is IDR-forgiveness
        versus payoff, and the deciding ratio is{' '}
        <strong>debt-to-income</strong>. IDR-only tends to win when debt
        is roughly 1.5–2× income or more — the payments never amortize the
        loan, so forgiveness genuinely cancels money you would otherwise
        owe. Plan for the possible tax bill: a side fund of even
        $100/month over the forgiveness horizon typically covers it.
      </p>

      <h2>When to Skip Forgiveness Entirely</h2>
      <p>
        If your balance is comfortably below your annual income, IDR
        payments are usually large enough to retire the loan before the
        forgiveness clock matters — you would simply be paying the loan
        off slowly, at maximum interest, with extra paperwork. Borrowers
        in that position nearly always do better treating the loan as a
        payoff problem: fix the budget leak, add extra principal monthly,
        and be done in five to eight years.
      </p>

      <h2>The Mistakes That Cost People Years</h2>
      <ul>
        <li>
          <strong>Wrong loan type.</strong> Only Direct Loans qualify for
          PSLF. Older FFEL or Perkins loans must be consolidated into a
          Direct Consolidation Loan first — payments made before
          consolidating may not count.
        </li>
        <li>
          <strong>Uncertified employment.</strong> Submit the PSLF
          employment certification form every year. It converts
          &quot;I think I qualify&quot; into an official payment count and
          surfaces employer-classification problems while they are still
          fixable.
        </li>
        <li>
          <strong>Forbearance drift.</strong> Months in forbearance or
          deferment generally do not count toward the 120. A servicer
          offering forbearance as the easy fix for a payment problem is
          usually costing you PSLF progress; an IDR recalculation is
          almost always the better tool.
        </li>
        <li>
          <strong>Refinancing federal loans into private.</strong> This
          permanently destroys eligibility for both PSLF and IDR
          forgiveness. For anyone plausibly on a forgiveness path, a
          slightly lower private rate is a catastrophic trade.
        </li>
      </ul>

      <h2>Decision Framework</h2>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Strongest path</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Government / 501(c)(3) employer, any large balance</td>
            <td>PSLF on an IDR plan — certify employment annually</td>
          </tr>
          <tr>
            <td>Private employer, debt ≥ 1.5× income</td>
            <td>IDR toward 20–25-year forgiveness; save for possible tax</td>
          </tr>
          <tr>
            <td>Private employer, debt &lt; 1× income</td>
            <td>Aggressive payoff with extra monthly principal</td>
          </tr>
          <tr>
            <td>Expecting to move into public service soon</td>
            <td>IDR now — qualifying payments only require the employer at payment time</td>
          </tr>
        </tbody>
      </table>
      <p>
        Plan details — payment formulas, plan names, tax treatment — have
        changed repeatedly and will change again; verify the current rules
        at studentaid.gov before committing. The structure of the
        decision, though, is stable: <strong>qualifying employment makes
        PSLF the cheapest exit; high debt-to-income makes IDR forgiveness
        worth the long road; and low debt-to-income makes payoff the
        honest winner.</strong>
      </p>
    </>
  );
}
