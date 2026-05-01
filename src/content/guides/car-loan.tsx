import type { GuideMeta } from '@/components/landing/LoanLandingPage';

export const meta: GuideMeta = {
  headline: 'Car Loans: How Down Payment, Tenure, and Dealer Tactics Move the Real Cost',
  description:
    'A practical guide to financing a car — how the EMI is calculated, why down payment is the most powerful lever, dealer-finance vs bank-loan trade-offs, and the depreciation reality every buyer should price into the decision.',
  datePublished: '2026-04-27',
};

export default function CarLoanGuide() {
  return (
    <>
      <h2>How a Car Loan EMI Is Calculated</h2>
      <p>
        A standard car loan is a fixed-rate, fixed-tenure installment
        loan secured against the vehicle itself. The lender retains a
        lien on the car until the loan is fully repaid, which is why
        car loan rates are lower than unsecured personal loan rates
        but higher than home loan rates — the collateral protects the
        lender, but a car is a depreciating asset, so the protection
        is partial.
      </p>
      <p>
        The EMI uses the same reducing-balance amortization formula
        you see on every consumer loan:
      </p>
      <p>
        <strong>EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)</strong>
      </p>
      <p>
        On a $25,000 car loan at 9% annual rate over 5 years (60
        months), the monthly EMI is about <strong>$519</strong> and
        total interest comes to roughly <strong>$6,138</strong>. The
        same loan at 7% drops the EMI to $495 and total interest to
        $4,701 — the rate makes a $1,400 difference over the life of
        a fairly typical car loan.
      </p>

      <h2>Down Payment — The Single Biggest Lever</h2>
      <p>
        Most buyers focus on the interest rate when comparing offers.
        Rate matters, but the down payment matters more. Bumping the
        down payment from 10% to 20% on a $30,000 vehicle changes
        every line on the cost sheet:
      </p>
      <table>
        <thead>
          <tr>
            <th>Down Payment</th>
            <th>Loan Amount</th>
            <th>EMI (5 yr @ 9%)</th>
            <th>Total Interest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0%</td>
            <td>$30,000</td>
            <td>$623</td>
            <td>$7,365</td>
          </tr>
          <tr>
            <td>10%</td>
            <td>$27,000</td>
            <td>$561</td>
            <td>$6,629</td>
          </tr>
          <tr>
            <td>20%</td>
            <td>$24,000</td>
            <td>$498</td>
            <td>$5,892</td>
          </tr>
          <tr>
            <td>30%</td>
            <td>$21,000</td>
            <td>$436</td>
            <td>$5,156</td>
          </tr>
        </tbody>
      </table>
      <p>
        A 20% down payment is the level at which most lenders offer
        their best rates and where you avoid being underwater on the
        loan in the early months (more on that in the depreciation
        section). It is also the level at which dealers stop pushing
        you into longer tenures, because the loan-to-value is
        comfortable enough to qualify for any term.
      </p>

      <h2>Tenure: The Trap of the Lower Monthly Payment</h2>
      <p>
        Dealers and finance teams almost always frame the
        affordability conversation in terms of <em>monthly
        payment</em>, not total cost. The reason is simple: stretching
        the loan from 5 years to 7 years makes the monthly EMI
        smaller, which makes it easier to sell you a more expensive
        car. The total cost of borrowing rises sharply.
      </p>
      <p>
        On the same $25,000 / 9% loan:
      </p>
      <ul>
        <li>
          <strong>3 years (36 months):</strong> EMI $795, total
          interest $3,624.
        </li>
        <li>
          <strong>5 years (60 months):</strong> EMI $519, total
          interest $6,138.
        </li>
        <li>
          <strong>7 years (84 months):</strong> EMI $402, total
          interest $8,762.
        </li>
      </ul>
      <p>
        Going from 5 to 7 years saves $117 per month but costs an
        additional <strong>$2,624 in interest</strong> over the life
        of the loan. Worse, by the end of year 3 of a 7-year loan
        you typically owe more than the car is worth — which limits
        your options if you need to sell, trade in, or replace the
        car early.
      </p>

      <h2>Dealer Finance vs Bank Loan</h2>
      <p>
        You have three real sources for a car loan: the dealer&apos;s
        captive finance arm, your bank or credit union, and online
        lenders. Each has structural strengths.
      </p>
      <h3>Dealer Finance</h3>
      <p>
        Manufacturers&apos; captive finance companies (Toyota
        Financial, Honda Financial Services, Ford Credit, etc.) often
        run promotional rates — 0% to 3% APR — on specific models
        they want to move. These deals are usually the cheapest money
        available, but only on the qualifying models, only for buyers
        with strong credit, and often <em>only if you don&apos;t
        also take the cash rebate</em>. Independent dealers without
        captive financing usually sell loans from third-party banks
        at a marked-up rate (a practice sometimes called &quot;dealer
        reserve&quot;) — generally not the best deal.
      </p>
      <h3>Banks and Credit Unions</h3>
      <p>
        Local banks and especially credit unions are usually the
        cheapest source for buyers who don&apos;t qualify for a
        captive promotional rate. Get pre-approved for a specific
        amount and rate before you walk into the dealership. The
        pre-approval letter changes the negotiation: you are now a
        cash buyer from the dealer&apos;s perspective, and any deal
        the dealer offers must beat your pre-approval to win the
        financing piece.
      </p>
      <h3>Online Lenders</h3>
      <p>
        Online auto loan marketplaces let you pull rate quotes from
        multiple lenders with a single soft credit pull, much like
        personal loan shopping. Rates are usually competitive with
        local banks but the experience is faster.
      </p>

      <h2>Depreciation — The Reality Behind the Numbers</h2>
      <p>
        A new car loses 15%–25% of its value the moment you drive it
        off the lot, and another 10%–15% in each of the next several
        years. By year 5, a typical mainstream car is worth roughly
        50% of its purchase price. This is why automotive
        professionals say cars are the worst large purchase most
        people make: you are financing a depreciating asset, paying
        interest on it, while it loses value faster than you pay
        down the loan in the early years.
      </p>
      <p>
        Concretely: if you buy a $30,000 car with a $3,000 (10%)
        down payment and a 7-year loan, the car is worth roughly
        $24,000 the day after purchase, while you owe roughly
        $27,000. You are <strong>$3,000 underwater</strong> on day
        one, and you stay underwater for the first 2.5 to 3 years of
        the loan. If the car is totaled or stolen during this
        period, the insurance payout (based on market value) does
        not cover the loan balance — which is what gap insurance
        exists to fill.
      </p>
      <p>
        Two practical implications:
      </p>
      <ol>
        <li>
          <strong>Larger down payments and shorter tenures</strong>
          are not just cheaper in dollar terms; they keep you from
          being underwater, which is itself a form of financial
          freedom.
        </li>
        <li>
          <strong>Used cars in the 2-to-4-year-old range</strong>{' '}
          have absorbed most of the early depreciation. You pay
          significantly less for almost the same car, and your
          financed amount tracks the actual value far more closely.
          Many lenders charge slightly higher rates on used vehicles,
          but the math still favors used in most cases.
        </li>
      </ol>

      <h2>Total Cost of Ownership — Not Just the EMI</h2>
      <p>
        The car loan EMI is only one component of what owning the
        car actually costs you each month. A useful budget includes:
      </p>
      <ul>
        <li>
          <strong>Loan EMI</strong> (the focus of this calculator)
        </li>
        <li>
          <strong>Insurance</strong> — typically $80–$200/month for
          full coverage on a financed car
        </li>
        <li>
          <strong>Fuel</strong> — varies hugely by vehicle and
          mileage, but commonly $100–$300/month
        </li>
        <li>
          <strong>Maintenance and repairs</strong> — budget at least
          $50/month even on a new car for routine service; older or
          luxury cars need much more
        </li>
        <li>
          <strong>Registration, taxes, parking, tolls</strong> —
          easily $50–$150/month depending on location
        </li>
      </ul>
      <p>
        The all-in cost of ownership for a mainstream new car
        typically runs $700–$1,200/month even without the loan EMI
        being unusually large. If a car is genuinely affordable on
        the EMI line but the all-in cost stresses your budget, the
        car is not affordable.
      </p>

      <h2>Mistakes That Cost the Most</h2>
      <ul>
        <li>
          <strong>Negotiating the monthly payment instead of the
          out-the-door price.</strong> Always negotiate the price of
          the car first, then the trade-in value separately, then
          the financing. Bundling them lets the dealer adjust one to
          hide gains in another.
        </li>
        <li>
          <strong>Accepting dealer add-ons.</strong> Extended
          warranties, paint protection, fabric protection, and
          dealer-installed accessories are typically marked up 200%
          or more. Decline them in the F&amp;I office unless you
          specifically want them and have priced them outside the
          dealership.
        </li>
        <li>
          <strong>Rolling negative equity into a new loan.</strong>{' '}
          If you trade in a car you still owe money on, the
          deficiency gets added to the new loan principal, and you
          start the next car already underwater on a larger balance.
          This is one of the fastest ways to fall into a permanent
          cycle of upside-down auto debt.
        </li>
        <li>
          <strong>Skipping rate shopping.</strong> Even with a
          captive promotional rate, get one outside quote so you
          know what you&apos;re comparing against. Rate-shopping
          within a 14-day window counts as a single inquiry on
          credit reports — there&apos;s no scoring penalty for it.
        </li>
      </ul>

      <h2>Bottom Line</h2>
      <p>
        The car loan EMI is the visible number, but the down
        payment, the tenure, and the negotiated price of the vehicle
        determine the actual cost. Aim for at least 20% down, a
        tenure no longer than 5 years, and a vehicle whose all-in
        cost of ownership leaves you with comfortable cushion.
        Pre-approve through a bank or credit union before stepping
        onto a lot, and treat dealer-side promotional financing as
        an additional option to compare — not the default.
      </p>
    </>
  );
}
