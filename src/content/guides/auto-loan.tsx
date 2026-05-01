import type { GuideMeta } from '@/components/landing/LoanLandingPage';

export const meta: GuideMeta = {
  headline: 'US Auto Loans: APR, Credit Tiers, and the Numbers Dealers Don’t Volunteer',
  description:
    'A US-focused auto loan guide — APR vs interest rate, credit-score tiers and what they mean for your rate, simple-interest vs precomputed loans, gap insurance, term creep, and how to actually shop a loan.',
  datePublished: '2026-04-27',
};

export default function AutoLoanGuide() {
  return (
    <>
      <h2>How a US Auto Loan Works</h2>
      <p>
        An auto loan in the United States is a fixed-rate, fixed-term
        installment loan secured by the vehicle. The lender holds the
        title until the loan is repaid, and the loan is structured
        almost universally as a <strong>simple-interest</strong> loan
        — interest accrues daily on the outstanding balance, and your
        monthly payment first covers the interest accrued since the
        last payment, with the remainder going to principal. This is
        important to understand because it changes how prepayments
        work compared to older &quot;precomputed&quot; loans (covered
        below).
      </p>
      <p>
        US auto loan terms have lengthened dramatically over the past
        two decades. The historical norm was 36 to 60 months; today
        the average new-car loan is over 70 months and 84-month and
        even 96-month loans are common. The longer terms exist for
        one reason: vehicle prices have risen faster than incomes,
        and lenders stretch the term to keep the monthly payment
        within reach. Whether that benefits the borrower is a
        different question, addressed below.
      </p>

      <h2>APR vs Interest Rate</h2>
      <p>
        Federal law (the Truth in Lending Act) requires every auto
        loan offer to disclose two numbers:
      </p>
      <ul>
        <li>
          The <strong>interest rate</strong>, which is the cost of
          borrowing the principal expressed as an annualized rate.
        </li>
        <li>
          The <strong>APR</strong> (Annual Percentage Rate), which
          includes the interest rate plus mandatory finance charges
          such as loan fees, expressed as an annualized rate.
        </li>
      </ul>
      <p>
        For most auto loans the two numbers are very close because
        the fee structure is small. When they differ noticeably, the
        APR is the apples-to-apples comparison number. Compare APR
        across competing offers — never just the headline rate.
      </p>

      <h2>Credit Tiers and What They Mean for Your Rate</h2>
      <p>
        Auto lenders price loans on credit-score tiers. The exact
        cutoffs vary by lender but the broad pattern is consistent.
        Approximate average new-car APRs by tier (rates change with
        the broader market; treat these as relative spreads, not
        absolute numbers):
      </p>
      <table>
        <thead>
          <tr>
            <th>Credit Tier</th>
            <th>Approx. FICO Range</th>
            <th>Typical New-Car APR</th>
            <th>Typical Used-Car APR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Super Prime</td>
            <td>781–850</td>
            <td>5%–7%</td>
            <td>6%–8%</td>
          </tr>
          <tr>
            <td>Prime</td>
            <td>661–780</td>
            <td>7%–9%</td>
            <td>9%–11%</td>
          </tr>
          <tr>
            <td>Near Prime</td>
            <td>601–660</td>
            <td>10%–12%</td>
            <td>13%–15%</td>
          </tr>
          <tr>
            <td>Subprime</td>
            <td>501–600</td>
            <td>13%–16%</td>
            <td>17%–20%</td>
          </tr>
          <tr>
            <td>Deep Subprime</td>
            <td>≤ 500</td>
            <td>16%+</td>
            <td>20%+</td>
          </tr>
        </tbody>
      </table>
      <p>
        The spread between super-prime and subprime on a $30,000 / 6-
        year loan is roughly $200/month and over $14,000 in lifetime
        interest. If your score is borderline between two tiers,
        spending three months specifically improving it (paying down
        revolving balances, fixing reporting errors, avoiding new
        applications) often returns several thousand dollars over
        the life of the loan.
      </p>

      <h2>Simple-Interest vs Precomputed Loans</h2>
      <p>
        Almost all modern US auto loans are <strong>simple-interest
        </strong> loans. Interest accrues daily on the actual
        outstanding balance, so paying ahead reduces the balance
        immediately and reduces all future interest. There is
        normally no prepayment penalty, and prepaying early in the
        loan saves more than prepaying late.
      </p>
      <p>
        A small number of loans — mostly older subprime deals and
        some buy-here-pay-here arrangements — are{' '}
        <strong>precomputed</strong>. The total interest is
        calculated upfront based on the original schedule and
        allocated across payments using a method like the{' '}
        &quot;Rule of 78&quot; (which front-loads interest into the
        early months). On a precomputed loan, paying off the loan
        early <em>does not</em> save you a fair share of the
        interest — the precomputed schedule has already &quot;
        earned&quot; most of the interest in the early months. If
        you see &quot;Rule of 78&quot; or &quot;sum of digits&quot;
        in your loan documents, you have a precomputed loan.{' '}
        <strong>Avoid these structures</strong> — they punish
        prepayment, which is one of the most powerful tools you have
        as a borrower.
      </p>

      <h2>Term Creep — Why 84 Months Costs So Much More</h2>
      <p>
        Stretching the term reduces the monthly payment but
        increases the total interest paid and keeps you upside down
        (owing more than the car is worth) for longer. On a $30,000
        loan at 8% APR:
      </p>
      <ul>
        <li>
          <strong>48 months:</strong> $732/month, $5,159 total
          interest.
        </li>
        <li>
          <strong>60 months:</strong> $608/month, $6,498 total
          interest.
        </li>
        <li>
          <strong>72 months:</strong> $526/month, $7,884 total
          interest.
        </li>
        <li>
          <strong>84 months:</strong> $468/month, $9,313 total
          interest.
        </li>
      </ul>
      <p>
        Going from 60 to 84 months saves $140/month but adds $2,815
        of lifetime interest. More importantly: at 84 months, the
        car is typically worth substantially less than the
        outstanding balance through year 4, and is approaching the
        end of its useful warranty period in the years when the loan
        is still very much alive. The long-term loan effectively
        couples you to a depreciating asset whose maintenance costs
        are accelerating.
      </p>

      <h2>Gap Insurance — When You Need It and When You Don&apos;t</h2>
      <p>
        If your car is totaled in an accident or stolen, your auto
        insurance pays out the vehicle&apos;s actual cash value.
        That value is based on market price, not the loan balance.
        If you owe more than the car is worth (which is normal for
        the first 1–3 years of most new-car loans), you would
        receive a check that does not cover the loan balance — and
        you would still owe the difference. <strong>Gap insurance
        </strong>covers the gap.
      </p>
      <p>
        You probably need gap insurance if:
      </p>
      <ul>
        <li>You financed more than 100% of the purchase price (i.e., rolled in fees, taxes, or negative equity from a trade-in)</li>
        <li>Your down payment was less than 20%</li>
        <li>Your loan term is 60+ months</li>
        <li>Your vehicle depreciates quickly (most luxury vehicles, EVs in many markets, certain unpopular models)</li>
      </ul>
      <p>
        You probably don&apos;t need it if you put down 25%+ on a
        slow-depreciating vehicle financed for 36–48 months. Gap
        insurance from your dealer is typically expensive ($500–$700
        rolled into the loan); the same coverage from your existing
        auto insurer is usually $20–$60/year as a policy add-on.
        Decline at the dealership and add it to your insurance
        policy if you need it.
      </p>

      <h2>How to Actually Shop an Auto Loan</h2>
      <ol>
        <li>
          <strong>Pull your credit reports</strong> from the three
          bureaus (free at AnnualCreditReport.com once a year).
          Dispute any errors. Pay down revolving balances if you
          can — utilization above 30% drags scores down.
        </li>
        <li>
          <strong>Get pre-approved</strong> at your bank, your
          credit union, and one online lender. This gives you a
          rate, an APR, and a term. The pre-approval period
          (typically 14–30 days) is your shopping window.
        </li>
        <li>
          <strong>Negotiate the vehicle price first.</strong>{' '}
          Pretend financing is not on the table. The price you
          negotiate determines the principal of the loan; everything
          else is secondary.
        </li>
        <li>
          <strong>Then evaluate dealer financing.</strong> If
          they can beat your pre-approval (after factoring in any
          rebate trade-offs), take it. If not, use your
          pre-approval.
        </li>
        <li>
          <strong>Decline the F&amp;I add-ons</strong> — extended
          warranty, gap, paint protection — unless you have priced
          them externally and decided you want them.
        </li>
      </ol>

      <h2>Mistakes to Avoid</h2>
      <ul>
        <li>
          <strong>Letting the dealer pull your credit
          first.</strong> They will run your application through
          multiple lenders, and they have an incentive to choose
          the highest rate they can sell you on. Show up with a
          pre-approval and you control which rate is the floor.
        </li>
        <li>
          <strong>Negotiating &quot;based on payment.&quot;</strong>
          Dealers can hit any monthly payment number you ask for by
          stretching the term. Negotiate the out-the-door price of
          the car, then negotiate the financing as a separate
          transaction.
        </li>
        <li>
          <strong>Buying more car than the term supports.</strong>
          A common rule is that the loan term should not exceed
          either 60 months or the period during which the warranty
          covers the vehicle, whichever is shorter. Borrowing 84
          months on a vehicle that goes out of warranty at 60
          months means paying for repairs while still paying for
          the car.
        </li>
        <li>
          <strong>Skipping the math on rebates vs. promotional
          rates.</strong> Captive financing often presents an
          either/or — a 0%–2% promotional rate <em>or</em> a cash
          rebate, but not both. The right choice depends on the
          loan amount and term. Run both scenarios through this
          calculator before deciding.
        </li>
      </ul>

      <h2>Bottom Line</h2>
      <p>
        The lowest-cost auto loan is short-term, low-APR financing
        on a vehicle you can afford with at least 20% down. The
        US market makes it easy to drift into the opposite —
        long-term financing on an expensive vehicle with little
        money down, locked into a rate set on the dealer&apos;s
        side. Coming in pre-approved, negotiating price first, and
        keeping the term to 60 months or less protects you from
        almost all of the structural traps in the US auto-loan
        system.
      </p>
    </>
  );
}
