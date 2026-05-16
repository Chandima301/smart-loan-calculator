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

      <h2>Worked Examples at Three Price Points</h2>
      <p>
        The payment scales linearly with the loan amount when the rate and
        term are held constant, but the lifetime interest grows just as fast.
        Here is the same 6.5%, 30-year fixed-rate mortgage at three common
        loan sizes, so you can see how the numbers move with the property
        price:
      </p>
      <table>
        <thead>
          <tr>
            <th>Loan Amount</th>
            <th>Monthly P&amp;I</th>
            <th>Total Paid (30 yr)</th>
            <th>Total Interest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$300,000</td>
            <td>$1,896</td>
            <td>$682,632</td>
            <td>$382,632</td>
          </tr>
          <tr>
            <td>$500,000</td>
            <td>$3,160</td>
            <td>$1,137,723</td>
            <td>$637,723</td>
          </tr>
          <tr>
            <td>$800,000</td>
            <td>$5,057</td>
            <td>$1,820,353</td>
            <td>$1,020,353</td>
          </tr>
        </tbody>
      </table>
      <p>
        Two things are worth absorbing from this table. First, the interest
        on an $800,000 loan ($1.02 million) exceeds the original principal —
        you pay for the house roughly 2.3 times over. Second, the jump from
        a $500,000 to an $800,000 loan adds about $1,897 to the monthly
        payment but nearly <strong>$383,000 to the lifetime interest</strong>.
        Every dollar of additional principal at this rate-and-term carries
        roughly $1.28 of additional interest over the life of the loan.
      </p>
      <p>
        Now hold the loan amount fixed and change the term instead. The
        $500,000 loan at 6.5% costs $3,160/month over 30 years (total
        interest $637,723). The identical loan over 15 years costs about
        $4,356/month — a 38% higher payment — but the total interest falls
        to roughly <strong>$284,163</strong>. Cutting the term in half
        more than halves the lifetime interest, because you spend far fewer
        months exposed to compounding. This is the single largest lever in
        the entire calculation, which is why the 15-vs-30 decision gets its
        own section below.
      </p>
      <p>
        A third worked scenario shows the effect of the interest rate alone.
        The $500,000 loan at 6.5% over 30 years costs $637,723 in interest.
        At 5.5% — one percentage point lower — the payment drops to about
        $2,838 and the lifetime interest falls to roughly{' '}
        <strong>$521,683</strong>. A single percentage point is worth about
        $116,000 on a half-million-dollar mortgage. That is the entire reason
        the &quot;shop at least three lenders&quot; advice exists: the rate
        spread between lenders on the same day, for the same borrower, is
        frequently 0.25–0.5 percentage points, which is $30,000–$60,000 of
        real money on a loan this size.
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

      <h2>A Brief History of the American Mortgage</h2>
      <p>
        The 30-year fixed-rate mortgage feels like a law of nature to most
        American buyers, but it is barely 90 years old and largely an
        artifact of government policy. Before the 1930s, a typical home loan
        in the United States was a 5-to-10-year, interest-only or
        partially-amortizing &quot;balloon&quot; loan with a 50% down payment
        requirement. At the end of the short term the entire principal came
        due, and most borrowers simply refinanced — a system that worked
        until the credit markets froze during the Great Depression and an
        estimated one in ten homes entered foreclosure.
      </p>
      <p>
        The federal response reshaped housing finance permanently. The Home
        Owners&apos; Loan Corporation (1933) refinanced defaulted balloon
        loans into long-term amortizing ones. The Federal Housing
        Administration (1934) insured lenders against default, which made
        them willing to offer 20-plus-year terms with smaller down payments.
        The Federal National Mortgage Association — Fannie Mae — was created
        in 1938 to buy FHA-insured loans from banks, freeing up bank capital
        to originate more mortgages. The combination produced the modern
        long-term, low-down-payment, fully-amortizing mortgage.
      </p>
      <p>
        The 30-year term specifically became dominant after World War II,
        when the GI Bill and a housing boom pushed lenders and the
        government-sponsored secondary market toward the longest term that
        still produced an acceptable default rate. By the 1970s the
        30-year fixed was the default product. The 1970s and early 1980s
        introduced adjustable-rate mortgages (ARMs) as an inflation-era
        innovation; the 2008 financial crisis, driven substantially by
        exotic ARM and interest-only structures, pushed the market back
        toward the plain 30-year fixed, which now accounts for the large
        majority of U.S. purchase mortgages.
      </p>
      <p>
        The practical takeaway is not historical trivia. The 30-year fixed
        exists because it shifts interest-rate risk to the lender (and
        ultimately the government-backed secondary market) and maximizes
        the size of loan a given monthly payment can support. It is
        optimized for affordability of the monthly payment, not for
        minimizing what you pay. Understanding that the product was
        designed around a policy goal — get more people into houses —
        rather than around your financial efficiency reframes every
        15-vs-30 and prepayment decision you will make.
      </p>

      <h2>Mortgage Glossary: Every Term on Your Loan Estimate</h2>
      <p>
        When you apply for a mortgage in the U.S., the lender must give you
        a standardized three-page Loan Estimate within three business days.
        It is dense with terms most buyers have never seen. Here is what
        each one actually means and why it matters to your bottom line.
      </p>
      <ul>
        <li>
          <strong>Principal.</strong> The amount you borrow. Every payment
          splits between principal (reduces what you owe) and interest
          (the lender&apos;s fee for the money).
        </li>
        <li>
          <strong>APR (Annual Percentage Rate).</strong> The interest rate
          plus most upfront finance charges, expressed as a yearly rate.
          Always compare lenders on APR, not the headline note rate — APR
          captures fees the note rate hides.
        </li>
        <li>
          <strong>Note rate.</strong> The raw interest rate used to
          compute your monthly principal-and-interest payment. Lower than
          APR whenever fees are involved.
        </li>
        <li>
          <strong>Amortization.</strong> The schedule by which the loan is
          repaid. In a fully-amortizing loan every payment is identical and
          the balance reaches exactly zero at the end of the term.
        </li>
        <li>
          <strong>Escrow.</strong> An account your servicer uses to collect
          1/12 of your annual property tax and insurance each month and pay
          those bills on your behalf. It makes the monthly payment larger
          than principal-and-interest alone.
        </li>
        <li>
          <strong>PITI.</strong> Principal, Interest, Taxes, and Insurance —
          the full monthly housing payment. Lenders qualify you on PITI, not
          the bare mortgage payment, and so should you.
        </li>
        <li>
          <strong>PMI (Private Mortgage Insurance).</strong> Insurance the
          borrower pays to protect the lender when the down payment is below
          20%. Typically 0.3%–1.5% of the loan per year. Removable once the
          loan-to-value ratio drops below 80% (request) or 78% (automatic).
        </li>
        <li>
          <strong>LTV (Loan-to-Value ratio).</strong> Loan amount divided by
          property value. Lower LTV means less lender risk, often a better
          rate, and the threshold at which PMI disappears.
        </li>
        <li>
          <strong>DTI (Debt-to-Income ratio).</strong> Your total monthly
          debt payments divided by gross monthly income. Most conforming
          lenders cap total DTI around 43%–50%.
        </li>
        <li>
          <strong>Discount points.</strong> Optional upfront cash to lower
          the note rate. One point costs 1% of the loan and typically cuts
          the rate by about 0.25%. Worth it only if you keep the loan past
          the break-even month.
        </li>
        <li>
          <strong>Origination fee.</strong> The lender&apos;s charge for
          processing the loan, usually 0.5%–1% of the loan amount.
          Negotiable, and a primary line item to compare across Loan
          Estimates.
        </li>
        <li>
          <strong>Conforming loan.</strong> A loan within the size limit
          eligible for purchase by Fannie Mae or Freddie Mac. Below the
          limit, rates are typically lower because the secondary market is
          deeper.
        </li>
        <li>
          <strong>Jumbo loan.</strong> A loan above the conforming limit.
          Usually carries a slightly higher rate and stricter underwriting
          because it cannot be sold to the government-sponsored entities.
        </li>
        <li>
          <strong>Fixed-rate mortgage.</strong> The rate never changes. The
          payment is fully predictable for the entire term.
        </li>
        <li>
          <strong>ARM (Adjustable-Rate Mortgage).</strong> A rate fixed for
          an initial period (e.g. 5 years on a 5/1 ARM), then resetting
          periodically against a benchmark. Lower initial rate, real
          long-term risk.
        </li>
        <li>
          <strong>Rate lock.</strong> A lender commitment to hold a quoted
          rate for a set window (commonly 30–60 days) while the loan
          closes. Protects you if rates rise before closing.
        </li>
        <li>
          <strong>Closing costs.</strong> The total of all fees due at
          closing — origination, appraisal, title insurance, recording,
          escrow setup. Commonly 2%–5% of the loan amount.
        </li>
        <li>
          <strong>Prepayment penalty.</strong> A fee for paying the loan
          off early. Rare on modern conforming loans but still present on
          some products — always confirm before assuming you can prepay
          freely.
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
