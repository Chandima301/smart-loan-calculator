import type { GuideMeta } from '@/components/landing/LoanLandingPage';

export const meta: GuideMeta = {
  headline: 'Refinancing a Loan: Break-Even Math, Closing Costs, and When Not to Refinance',
  description:
    'A practical guide to evaluating a refinance — the break-even-month formula, how closing costs affect the decision, the difference between rate-and-term and cash-out refinances, and the situations where refinancing destroys value.',
  datePublished: '2026-04-27',
};

export default function RefinanceGuide() {
  return (
    <>
      <h2>What Refinancing Actually Is</h2>
      <p>
        Refinancing is the process of replacing an existing loan
        with a new loan. The new loan pays off the old one in full,
        and from that day forward you make payments on the new loan
        — typically at a different rate, a different term, or both.
        The mechanics are the same whether you&apos;re refinancing a
        mortgage, an auto loan, a student loan, or a personal loan,
        but the costs and trade-offs differ by loan type.
      </p>
      <p>
        The single most important question in any refinance
        decision is: <strong>when do the lifetime interest savings
        exceed the upfront cost of refinancing?</strong> That
        answer is the &quot;break-even month.&quot; If you keep the
        new loan past the break-even month you save money; if you
        sell, refinance again, or pay off the loan before then, the
        refinance was a net loss.
      </p>

      <h2>The Break-Even Formula</h2>
      <p>
        The simplest version of the break-even calculation is:
      </p>
      <p>
        <strong>Break-even months = Total closing costs ÷ Monthly
        payment savings</strong>
      </p>
      <p>
        Suppose you have a $300,000 mortgage at 7% with 28 years
        remaining. You can refinance to 5.5% with closing costs of
        $6,000. Your old monthly payment was about $1,996; the new
        payment at the same 28-year term is about $1,728.
        Difference: $268/month. Break-even = $6,000 / $268 ≈{' '}
        <strong>22 months</strong>. If you stay in the home and
        keep the new mortgage for at least 22 months, you come out
        ahead. If you sell or refinance again before month 22, the
        deal lost money.
      </p>
      <p>
        This simple version is good enough to make most decisions.
        A more rigorous version accounts for the fact that the new
        loan may have a different remaining term — you save monthly
        cash but you may also be extending the loan, which costs
        you in lifetime interest. The right framing depends on
        which problem you&apos;re solving.
      </p>

      <h2>Two Different Reasons to Refinance</h2>
      <h3>Lower the Rate (Same or Shorter Term)</h3>
      <p>
        The classic case. Rates have fallen since you took out the
        original loan, so you replace it with a cheaper one. The
        cleanest version keeps the loan&apos;s remaining term the
        same — instead of 28 years remaining at 7%, you take 28
        years at 5.5%. Lower payment, less lifetime interest,
        otherwise unchanged.
      </p>
      <p>
        An even better version uses the rate reduction to{' '}
        <em>shorten</em> the term. With the same example, you
        could refinance to a 20-year loan at 5.5%. The monthly
        payment would be $2,065 — slightly higher than the old
        $1,996 — but you finish the mortgage 8 years sooner and
        save dramatically more in lifetime interest. Whether
        you&apos;d rather have lower monthly payments or a faster
        payoff is the real question; the rate drop just gives you
        the option.
      </p>

      <h3>Cash Out</h3>
      <p>
        A cash-out refinance replaces the existing loan with a
        larger loan and gives you the difference in cash. On a
        home worth $400,000 with a $200,000 mortgage, you might
        refinance to a new $300,000 mortgage and walk away with
        $100,000 of cash (minus closing costs). The math is
        straightforward but the decision is harder, because you
        are converting equity into a higher monthly payment for
        years to come.
      </p>
      <p>
        Cash-out refinancing makes sense when you&apos;re trading
        higher-rate debt (credit cards, personal loans) for
        lower-rate debt (the mortgage). It rarely makes sense to
        cash-out for consumption — vacations, weddings, vehicles
        — because you&apos;re mortgaging future months of your
        life for current spending and adding decades to debt that
        could otherwise have been paid off.
      </p>

      <h2>What Closing Costs Actually Include</h2>
      <p>
        On a typical mortgage refinance, closing costs run 2%–5%
        of the loan amount. The line items vary by lender and
        market but commonly include:
      </p>
      <ul>
        <li>
          <strong>Loan origination fee</strong> — the lender&apos;s
          underwriting fee, typically 0.5%–1% of the loan amount
        </li>
        <li>
          <strong>Appraisal</strong> — required to confirm the
          property is worth what the loan assumes; $400–$700
        </li>
        <li>
          <strong>Title insurance and title search</strong> —
          ensures clear ownership; $500–$1,500 depending on state
        </li>
        <li>
          <strong>Recording fees and transfer taxes</strong> —
          state and local government charges; varies widely
        </li>
        <li>
          <strong>Credit report, flood certification, escrow
          setup</strong> — small individual fees that add up to
          $200–$500
        </li>
      </ul>
      <p>
        Some lenders advertise &quot;no-cost&quot; refinances. The
        costs aren&apos;t free — the lender is either rolling them
        into the loan balance (so you finance the closing costs
        over the life of the loan and pay interest on them) or
        offering you a slightly higher rate that recovers the
        same revenue over time. A no-cost refinance can be the
        right choice if you&apos;re unsure how long you&apos;ll
        keep the loan, but compare the all-in math, not the
        marketing label.
      </p>

      <h2>How Much Rate Drop Justifies a Refinance?</h2>
      <p>
        The traditional rule of thumb was &quot;refinance when
        rates drop 1–2 percentage points.&quot; That rule is
        outdated; the right answer depends on your specific loan
        balance, closing costs, and how long you&apos;ll keep the
        loan.
      </p>
      <p>
        The correct framing: compute the break-even month and
        compare it to your honest expectation of how long
        you&apos;ll keep the loan. If your break-even is 22 months
        and you confidently expect to stay in the home for 5+
        years, the math is overwhelmingly positive even on a
        modest rate drop. If your break-even is 60 months and you
        might move within 3 years, the math is negative even on a
        large rate drop.
      </p>
      <p>
        On large balances, even half-point reductions can be
        worthwhile. On a $1,000,000 mortgage, a 0.5-percentage-
        point rate reduction saves around $300/month. With $7,000
        of closing costs, the break-even is roughly 24 months —
        well within the typical holding period for a primary
        residence.
      </p>

      <h2>When Not to Refinance</h2>
      <ol>
        <li>
          <strong>You&apos;re likely to sell or move within 2
          years.</strong> Most refinances need 18–36 months to
          break even on closing costs. If you&apos;re moving
          before then, you almost certainly lose money.
        </li>
        <li>
          <strong>You&apos;re late in the loan term.</strong> If
          you&apos;re 25 years into a 30-year mortgage, the
          remaining principal is small and most of the future
          payments are already principal, not interest. The
          potential rate savings are small relative to the
          closing costs.
        </li>
        <li>
          <strong>The new loan is a step backward in
          structure.</strong> Refinancing a 6%, 15-year mortgage
          into a 5.5%, 30-year mortgage looks like a rate win on
          paper, but you&apos;re extending the loan by 15 years
          — your lifetime interest can actually increase even
          though the rate is lower.
        </li>
        <li>
          <strong>You&apos;re using the refinance to consolidate
          short-term debt into long-term debt without changing
          the spending behavior that created it.</strong>{' '}
          Cash-out refinancing credit card balances doesn&apos;t
          fix the cash-flow problem; it converts a high-rate
          short-term problem into a low-rate long-term one and
          uses your home as collateral.
        </li>
        <li>
          <strong>You&apos;re refinancing federal student loans
          into private loans without understanding what you give
          up.</strong> The protections of federal loans (income-
          driven repayment, PSLF, deferment, discharge) are gone
          permanently the moment you refinance to private. See
          the student loan guide on this site for the trade-off
          analysis.
        </li>
      </ol>

      <h2>Mistakes That Cost the Most</h2>
      <ul>
        <li>
          <strong>Resetting the loan term to 30 years every time
          you refinance.</strong> Each new 30-year term restarts
          the amortization schedule and front-loads interest into
          the early payments. Refinancing at year 5, year 10, and
          year 15 — each time to a fresh 30-year term — can mean
          paying interest for 45 years on what started as a
          30-year loan.
        </li>
        <li>
          <strong>Ignoring the rate type change.</strong>{' '}
          Refinancing a fixed-rate loan into an adjustable-rate
          loan to chase a lower initial rate exposes you to
          interest-rate risk you didn&apos;t have before. The
          discount on the teaser period can disappear with one
          rate reset.
        </li>
        <li>
          <strong>Comparing only the rate, not the APR.</strong>{' '}
          The APR includes mandatory fees and is the legally
          required apples-to-apples comparison number. Two loans
          with the same rate but different APRs cost you
          different amounts.
        </li>
        <li>
          <strong>Locking in too late.</strong> Mortgage rate
          locks typically last 30–60 days. If you start the
          refinance process and rates move while you&apos;re
          still in underwriting, you can pay for points to lock
          the lower rate or wait — but if rates move against
          you and your lock expires, you&apos;re back to the
          current market rate.
        </li>
      </ul>

      <h2>Bottom Line</h2>
      <p>
        A refinance is a good idea when the break-even month is
        comfortably shorter than your expected holding period and
        the structural change (new term, rate type, payment
        profile) doesn&apos;t introduce risks you don&apos;t want.
        It is a bad idea when you&apos;re using it to mask a
        spending problem, when you&apos;re likely to move soon,
        or when you&apos;re trading away protections you may
        need. The calculator on this page is the right place to
        start: model the break-even month with realistic closing
        costs, then compare against an honest read of how long
        the new loan will actually live.
      </p>
    </>
  );
}
