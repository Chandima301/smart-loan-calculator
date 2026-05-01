import type { GuideMeta } from '@/components/landing/LoanLandingPage';

export const meta: GuideMeta = {
  headline: 'The Complete Guide to Mortgage Payments and Total Cost',
  description:
    'How fixed-rate mortgages work, the math behind monthly payments, the true lifetime cost of a 30-year loan, and the practical decisions that change the result by tens of thousands of dollars.',
  datePublished: '2026-04-27',
};

export default function MortgageGuide() {
  return (
    <>
      <h2>How a Mortgage Payment Is Calculated</h2>
      <p>
        A fixed-rate mortgage payment is calculated using a single formula that
        every bank, broker, and online calculator uses. The payment is constant
        for the life of the loan, but the split between principal and interest
        shifts month by month — early payments are dominated by interest, and
        the balance only starts dropping meaningfully after several years. The
        mechanic that drives this is called <strong>amortization</strong>, and
        understanding it changes how you evaluate every mortgage decision you
        make.
      </p>

      <h3>The Formula</h3>
      <p>
        For a fixed-rate, fully-amortizing mortgage, the monthly payment{' '}
        <em>M</em> is:
      </p>
      <p>
        <strong>M = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)</strong>
      </p>
      <p>
        Where <em>P</em> is the loan principal, <em>r</em> is the monthly
        interest rate (annual rate divided by 12, expressed as a decimal), and{' '}
        <em>n</em> is the total number of monthly payments. The formula works
        out the constant payment that exactly retires the loan after{' '}
        <em>n</em> months — no balloon at the end, no missing dollars.
      </p>

      <h3>A Worked Example</h3>
      <p>
        On a $500,000 loan at 6.5% over 30 years (360 months), the math runs
        like this. The monthly rate is 6.5% / 12 = 0.005417. (1.005417)
        <sup>360</sup> ≈ 6.992. Plugging in:
      </p>
      <p>
        M = 500,000 × 0.005417 × 6.992 / (6.992 − 1) ≈{' '}
        <strong>$3,160.34 per month</strong>.
      </p>
      <p>
        Over 30 years that adds up to <strong>$1,137,723 in total payments</strong>.
        Of that, $500,000 is principal and{' '}
        <strong>$637,723 is interest</strong>. You pay back the loan more than
        twice. This is not a quirk of any specific lender — it is the
        consequence of compounding interest over a 30-year horizon, and it
        applies to every fixed-rate mortgage at this rate and term.
      </p>

      <h2>What the Calculator Inputs Actually Do</h2>

      <h3>Principal</h3>
      <p>
        The loan amount, after your down payment. A $625,000 home with a 20%
        down payment is a $500,000 mortgage. The principal is the only input
        you can shift dramatically once you choose a property — saving more
        before you buy, or buying a less expensive home, are the two levers.
      </p>

      <h3>Interest Rate</h3>
      <p>
        Quoted as an annual percentage rate (APR). A change of half a
        percentage point on a $500,000 / 30-year loan moves the monthly
        payment by about $160 and the lifetime interest by roughly{' '}
        <strong>$60,000</strong>. That is why rate shopping is the single most
        valuable hour of work you can do — most borrowers accept the first
        rate they are quoted, and most leave money on the table by doing so.
      </p>

      <h3>Loan Term</h3>
      <p>
        The most common choices are 15 and 30 years. A 15-year loan has a
        higher monthly payment (often 40–50% higher than the 30-year payment
        on the same principal) but slashes the lifetime interest. On the same
        $500,000 / 6.5% loan, a 15-year version costs roughly $4,355 per
        month and finishes at about $784,000 total — saving more than{' '}
        <strong>$350,000 in interest</strong> over the 30-year version, at the
        cost of a much larger monthly commitment.
      </p>

      <h2>The Costs Most Calculators Don&apos;t Show</h2>
      <p>
        The principal and interest payment is only one component of the
        amount your lender debits from your account each month. In the United
        States, the typical mortgage statement also includes:
      </p>
      <ul>
        <li>
          <strong>Property taxes.</strong> Collected monthly into an escrow
          account and paid to the local government on your behalf. Annual
          property taxes commonly run between 0.5% and 2.5% of home value
          depending on the state.
        </li>
        <li>
          <strong>Homeowners insurance.</strong> Also escrowed. A typical
          single-family-home policy in the U.S. costs $1,200–$2,500 per year
          for roughly $300,000 of coverage.
        </li>
        <li>
          <strong>Private Mortgage Insurance (PMI).</strong> Required by most
          lenders when you put down less than 20%. PMI typically costs 0.3%
          to 1.5% of the loan balance per year. It is removed automatically
          when your loan-to-value ratio falls below 78%, and you can request
          early removal at 80%.
        </li>
        <li>
          <strong>HOA fees.</strong> If you buy in a planned community or
          condo. These are not in your mortgage payment but are very much
          part of the cost of carrying the property.
        </li>
      </ul>
      <p>
        On a $500,000 mortgage in a typical U.S. suburb, the difference
        between the principal-and-interest payment and the full
        out-the-door monthly cost is often $600–$1,000. Your affordability
        analysis should always be done on the full PITI (principal, interest,
        taxes, insurance) figure, not the mortgage-only number.
      </p>

      <h2>15 vs 30: How to Decide</h2>
      <p>
        The 30-year mortgage is the default in the United States — about
        nine in ten purchase mortgages — for one reason: it produces the
        smallest monthly payment, which is the constraint most buyers care
        about. The 15-year mortgage is the cheaper loan in lifetime terms,
        but the higher payment squeezes other goals out of your budget.
        Three honest questions cut through the marketing on both sides:
      </p>
      <ol>
        <li>
          <strong>If you took the 30-year payment, what would you actually
          do with the cash difference?</strong> If the answer is &quot;invest
          it consistently in a low-cost index fund inside a tax-advantaged
          account,&quot; the 30-year is mathematically defensible because
          your investment return is likely to exceed your mortgage rate over
          long horizons. If the answer is &quot;spend it,&quot; the 15-year
          forces a behavioral discipline you would not otherwise impose.
        </li>
        <li>
          <strong>How stable is your income?</strong> A 15-year payment is a
          larger fixed obligation. If your income is volatile (commission
          sales, a small business, contract work), the 30-year gives you
          flexibility — you can always pay extra principal voluntarily, but
          you cannot easily make a 15-year payment smaller.
        </li>
        <li>
          <strong>How long will you keep this house?</strong> If you&apos;re
          likely to move in five years, the lifetime-interest savings of the
          15-year are mostly theoretical. The first five years of either
          loan are dominated by interest, and you&apos;ll pay off relatively
          little principal regardless.
        </li>
      </ol>
      <p>
        A common middle path: take the 30-year mortgage and{' '}
        <em>voluntarily</em> add an extra 1/12 of a payment each month
        (effectively a 13th payment per year). That single behavior shaves
        roughly four years off a 30-year mortgage and saves around 25% of
        the lifetime interest, while preserving your option to reduce the
        payment if life requires it.
      </p>

      <h2>The Tax Deduction Reality</h2>
      <p>
        Mortgage interest is deductible on U.S. federal tax returns up to a
        principal cap (currently $750,000 for loans originated after late
        2017). In practice, the value of the deduction is much smaller than
        most buyers expect, because the standard deduction was roughly
        doubled in 2017 and many taxpayers no longer itemize. If your total
        itemized deductions don&apos;t exceed the standard deduction, the
        mortgage interest write-off has no real value — you would have
        gotten the standard deduction either way. Run the numbers on your
        actual situation before factoring &quot;tax savings&quot; into your
        affordability math; for a large share of borrowers the answer is{' '}
        <em>zero</em>.
      </p>

      <h2>Mistakes That Cost the Most Money</h2>
      <ul>
        <li>
          <strong>Not shopping the rate.</strong> Lenders quote different
          rates to identical borrowers on the same day. Pulling three
          competitive quotes within a 14-day window counts as a single
          credit inquiry for FICO purposes — there is no scoring penalty,
          and the dollar savings are large.
        </li>
        <li>
          <strong>Buying down the rate without doing the break-even
          math.</strong> &quot;Discount points&quot; are upfront cash you
          pay to lower your rate. Each point typically reduces the rate by
          about 0.25% and costs 1% of the loan. Whether it pays off depends
          entirely on how long you&apos;ll keep the loan — if you refinance
          or sell within five years on most rate-buy-down structures, you
          lose money.
        </li>
        <li>
          <strong>Skipping the loan estimate comparison.</strong> Every
          U.S. lender must give you a standardized Loan Estimate within
          three business days of application. Lining up three estimates
          side by side reveals fee differences that can run into thousands
          — origination fees, lender credits, third-party costs all vary.
        </li>
        <li>
          <strong>Stretching to the maximum loan you qualify for.</strong>
          Lenders qualify you on a debt-to-income ratio that ignores the
          rest of your life — daycare, retirement contributions, future
          income volatility, the new water heater. The payment that the
          bank approves and the payment you can comfortably carry are
          rarely the same number.
        </li>
      </ul>

      <h2>When the Calculator&apos;s Answer Isn&apos;t the Whole Picture</h2>
      <p>
        A monthly-payment calculator gives you a useful but incomplete
        view. It cannot price the value of the optionality you give up by
        committing to a long-term fixed obligation, the opportunity cost
        of money tied up in home equity rather than diversified
        investments, or the non-financial value of housing stability.
        Treat the calculator as the floor of your decision — the math you
        must understand before talking to a lender — rather than the
        ceiling. The right mortgage is the one where the worst plausible
        version of the next ten years of your life still leaves you able
        to make the payment without eroding your other goals.
      </p>
    </>
  );
}
