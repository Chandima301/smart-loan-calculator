import type { GuideMeta } from '@/components/landing/LoanLandingPage';

export const meta: GuideMeta = {
  headline: 'Student Loans: Federal vs Private, Repayment Plans, and the Refinance Trade-off',
  description:
    'A clear-eyed guide to student loans — the structural differences between federal and private loans, the repayment plans most borrowers don’t use correctly, and the irreversible trade-off when refinancing federal loans into private.',
  datePublished: '2026-04-27',
};

export default function StudentLoanGuide() {
  return (
    <>
      <h2>The Two Types of Student Loans You Actually Have</h2>
      <p>
        US student loans come in two structurally different forms,
        and the most important decisions you make as a borrower
        depend on knowing which one you&apos;re dealing with.
        <strong> Federal loans</strong> are issued by the Department
        of Education, carry a fixed interest rate set by Congress,
        and come with a thick layer of borrower protections —
        income-driven repayment plans, deferment, forbearance,
        forgiveness in narrow circumstances, and discharge if the
        borrower dies or becomes permanently disabled.
        <strong> Private loans</strong> are issued by banks and
        non-bank lenders, carry a fixed or variable rate set by
        market underwriting, and have effectively none of the
        protections of federal loans.
      </p>
      <p>
        If you don&apos;t know which type you have, log into{' '}
        <em>StudentAid.gov</em>: any loan listed there is federal.
        Anything not listed there is private.
      </p>

      <h3>Subsidized vs Unsubsidized (Federal Only)</h3>
      <p>
        Federal Direct Subsidized loans (available to undergraduates
        with demonstrated financial need) do not accrue interest
        while you are enrolled at least half-time, during the
        six-month grace period after graduation, or during periods
        of authorized deferment. Direct Unsubsidized loans accrue
        interest from the moment they are disbursed — and that
        interest <em>capitalizes</em> (gets added to the principal
        balance) when you enter repayment, meaning you pay interest
        on the interest. The difference can amount to several
        thousand dollars on the same nominal principal.
      </p>

      <h2>How Student Loan Repayment Math Works</h2>
      <p>
        The standard repayment plan amortizes the loan over 10 years
        using the same formula as every other consumer loan:
      </p>
      <p>
        <strong>EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)</strong>
      </p>
      <p>
        On $30,000 of federal loans at 6% over 10 years, the
        standard payment is about <strong>$333/month</strong> and
        total interest over the term is roughly $9,964. The standard
        plan is the most expensive in monthly terms but the cheapest
        in lifetime interest — the shortest amortization always wins
        on total cost.
      </p>

      <h2>Federal Income-Driven Repayment Plans</h2>
      <p>
        The most powerful — and most underused — feature of federal
        student loans is the family of <strong>income-driven
        repayment</strong> (IDR) plans. They cap your monthly
        payment as a percentage of discretionary income, with any
        unpaid balance forgiven after a long repayment period
        (typically 20–25 years). The plan landscape changes from
        time to time as Congress and the Department of Education
        revise it; as of writing the major plans are:
      </p>
      <ul>
        <li>
          <strong>SAVE</strong> (Saving on a Valuable Education):
          payments capped at 5% of discretionary income for
          undergraduate-only loans, 10% for graduate-only loans, or
          a weighted blend; remaining balance forgiven after 20–25
          years; interest does not capitalize during repayment.
        </li>
        <li>
          <strong>PAYE</strong> (Pay As You Earn): 10% of
          discretionary income; 20-year forgiveness for new
          borrowers as of 2014; payment cannot exceed the standard
          10-year payment.
        </li>
        <li>
          <strong>IBR</strong> (Income-Based Repayment): 10% or 15%
          of discretionary income depending on when you took your
          first loan; 20- or 25-year forgiveness.
        </li>
      </ul>
      <p>
        IDR plans are designed for borrowers whose income relative
        to debt is too low for the standard payment to be
        sustainable. They are also the gateway to{' '}
        <strong>Public Service Loan Forgiveness (PSLF)</strong>:
        borrowers who work full-time for a qualifying public-sector
        or nonprofit employer and make 120 qualifying payments
        under an IDR plan have their remaining balance forgiven
        tax-free.
      </p>

      <h3>The IDR Tax Bomb</h3>
      <p>
        Forgiveness under most non-PSLF IDR programs has
        historically been treated as taxable income in the year of
        forgiveness — meaning you could face a substantial tax bill
        on the forgiven amount. Recent legislation made
        IDR-forgiven balances tax-free through 2025, and various
        proposals would make that permanent, but the rules are in
        flux. Plan as if forgiveness might be taxable, and confirm
        the rules before relying on the &quot;forgiven balance is
        free&quot; assumption.
      </p>

      <h2>Refinancing — The Irreversible Trade</h2>
      <p>
        Private lenders advertise student loan refinancing as a
        no-brainer: take your federal loans, refinance them into a
        new private loan at a lower rate, save thousands. The math
        is real — a borrower with strong credit and stable income
        can sometimes shave 1–3 percentage points off their rate.
        What the marketing leaves out is what you give up.
      </p>
      <p>
        When you refinance federal loans into a private loan,{' '}
        <strong>you permanently lose</strong>:
      </p>
      <ul>
        <li>Access to all income-driven repayment plans</li>
        <li>Eligibility for PSLF</li>
        <li>The death and disability discharge that comes standard with federal loans</li>
        <li>Generous deferment and forbearance options for unemployment, medical hardship, and economic hardship</li>
        <li>Any future federal forgiveness programs (which appear and change every few years)</li>
      </ul>
      <p>
        These protections are valuable — extremely valuable in
        scenarios you may not be planning for today (job loss,
        career change into the public sector, disability, family
        leave). The refinance trade is mathematically attractive
        only if you are confident you will never need any of these
        protections, and if the rate reduction is large enough to
        justify giving them up.
      </p>
      <p>
        A defensible decision tree for federal-to-private refi:
      </p>
      <ol>
        <li>
          Are you working in (or considering) public service?
          Don&apos;t refinance — you may qualify for PSLF.
        </li>
        <li>
          Is your income unstable, or do you anticipate a career
          gap? Don&apos;t refinance — IDR plans protect you in
          ways private lenders don&apos;t.
        </li>
        <li>
          Are you saving toward a specific large goal where the
          monthly cash difference matters? Consider IDR first
          before refinancing.
        </li>
        <li>
          Strong income, stable career, no public-service path,
          well-funded emergency reserves, and the new rate is at
          least 1.5–2 percentage points lower? Refinancing may be
          rational, but only on the portion you would not have
          gotten forgiven anyway.
        </li>
      </ol>

      <h2>Private Student Loans</h2>
      <p>
        Private student loans are simpler, less protected, and more
        market-priced than federal loans. Rates depend on your (or
        your cosigner&apos;s) credit profile and income; terms are
        typically 5 to 20 years; cosigners are commonly required for
        undergraduate borrowers.
      </p>
      <p>
        Two practical points:
      </p>
      <ul>
        <li>
          <strong>Cosigner release</strong> — most private lenders
          allow cosigner release after 24–48 consecutive on-time
          payments, but the borrower has to actively request it.
          Many never do.
        </li>
        <li>
          <strong>Variable rates</strong> — many private loans are
          offered at variable rates that look attractive at issue
          and reset upward as benchmark rates rise. If you take a
          variable-rate private loan, build the assumption of a
          2–4 percentage point rate increase into your repayment
          model.
        </li>
      </ul>

      <h2>Strategy by Borrower Situation</h2>

      <h3>Recent Graduate, Federal Loans Only</h3>
      <ul>
        <li>If your salary is well above your debt total, take the standard 10-year plan and pay extra principal when you can. This is the cheapest path.</li>
        <li>If your debt is roughly equal to or larger than your annual income, enroll in SAVE or PAYE. Run the numbers on PSLF if your work is or could be public-sector.</li>
        <li>Auto-debit usually shaves 0.25 percentage points off the rate. Set it up.</li>
      </ul>

      <h3>Mid-Career, High Income, Federal Loans</h3>
      <ul>
        <li>Standard plan is almost always the cheapest unless you&apos;re pursuing PSLF.</li>
        <li>Refinancing to private becomes more defensible as your income stability rises.</li>
        <li>Maxing retirement contributions usually beats accelerating student loan payoff at federal rates of 4–7%.</li>
      </ul>

      <h3>Mixed Federal and Private</h3>
      <ul>
        <li>Pay down highest-interest debt first, almost always the private loans.</li>
        <li>Keep federal loans on a plan whose payment fits your budget; the protections are valuable even if the rate is higher than what you could get refinancing.</li>
      </ul>

      <h2>Mistakes That Cost the Most</h2>
      <ul>
        <li>
          <strong>Defaulting silently.</strong> Federal loans go
          into default after 270 days of missed payments. Default
          triggers wage garnishment, tax-refund seizure, and the
          loss of all flexible repayment options. If you cannot
          make your payment, contact your servicer and switch to
          IDR or request forbearance — both options keep you out
          of default.
        </li>
        <li>
          <strong>Stretching private loans to 20 years for a lower
          payment.</strong> Same trap as long-tenure mortgages and
          auto loans: marginally lower monthly payment, dramatically
          higher lifetime interest, and many additional years of
          carrying the debt.
        </li>
        <li>
          <strong>Refinancing without understanding what you give
          up.</strong> The single largest financial mistake in
          student loan management is refinancing federal loans to
          save a small amount of interest, then needing IDR or PSLF
          a year later — the protections are gone permanently.
        </li>
        <li>
          <strong>Not consolidating before applying for PSLF.</strong>
          Some federal loan types (FFEL, Perkins) don&apos;t qualify
          for PSLF directly but do qualify after consolidation into
          a Direct Consolidation Loan. Borrowers who don&apos;t
          consolidate may waste years of payments that don&apos;t
          count toward the PSLF total.
        </li>
      </ul>

      <h2>Bottom Line</h2>
      <p>
        Federal student loans are a uniquely flexible debt
        instrument — pay them down efficiently when you can,
        protect yourself with IDR when you need to, and treat any
        decision to refinance them into private loans as a one-way
        door. Private loans are simpler but offer no margin for
        error. The right repayment strategy depends as much on the
        stability of your income and your career path as it does on
        the interest rate.
      </p>
    </>
  );
}
