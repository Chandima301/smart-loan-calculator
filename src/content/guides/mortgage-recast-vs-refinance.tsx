import type { GuideMeta } from '@/components/landing/LoanLandingPage';

export const meta: GuideMeta = {
  headline: 'Mortgage Recast vs Refinance: The Cheaper Way to Lower Your Payment',
  description:
    'A recast applies a lump sum to principal and re-amortizes your existing loan for a $150–$500 flat fee — no closing costs, no rate change, no credit check. A refinance replaces the loan entirely. The worked numbers show which move fits which goal.',
  datePublished: '2026-06-10',
};

export const faq = [
  {
    question: 'What exactly is a mortgage recast?',
    answer:
      'A recast (re-amortization) is when you pay a lump sum toward principal — most lenders require $5,000–$10,000 minimum — and the lender recalculates your monthly payment over the remaining original term at your existing rate. Your payment drops, your rate and payoff date stay the same, and the fee is typically a flat $150–$500 with no appraisal, credit check, or closing costs.',
  },
  {
    question: 'How is a recast different from just making a big extra payment?',
    answer:
      'An extra principal payment shortens the loan but leaves the required monthly payment unchanged. A recast keeps the payoff date and lowers the required monthly payment instead. Same lump sum, different lever: extra payment buys time, recast buys monthly breathing room.',
  },
  {
    question: 'When does a refinance beat a recast?',
    answer:
      'When current market rates are meaningfully below your existing rate — roughly 0.75–1 percentage point or more — or when you want to change the loan structure itself: shorten the term, switch from adjustable to fixed, or remove a borrower. A recast can never change your rate; it only re-spreads the smaller balance over the same schedule.',
  },
  {
    question: 'Can every mortgage be recast?',
    answer:
      'No. FHA, VA, and USDA loans generally cannot be recast, and not every lender offers recasting on conventional loans — it is a courtesy service, not a right. Jumbo loan policies vary by lender. Call your servicer and ask for their recast minimum, fee, and process before planning around it.',
  },
  {
    question: 'Does recasting save interest?',
    answer:
      'Yes, but less than the same lump sum used as a plain extra payment. The lump sum cuts the balance either way, which reduces total interest. But because a recast then lowers your monthly payment instead of shortening the term, you repay the remaining balance more slowly than if you had kept the old payment. Recast for cash-flow relief; make extra payments for maximum interest savings.',
  },
  {
    question: 'Can I recast after a refinance, or combine the two?',
    answer:
      'Yes — they are independent tools. A common sequence: refinance when rates drop to capture a lower rate, then recast later when a windfall (bonus, home sale proceeds, inheritance) arrives. Some borrowers also recast instead of refinancing precisely because their existing rate is better than anything currently on offer.',
  },
];

export default function MortgageRecastVsRefinanceArticle() {
  return (
    <>
      <h2>Same Goal, Wildly Different Price Tags</h2>
      <p>
        Borrowers usually discover recasting late — often after paying
        thousands in refinance closing costs to achieve something a $300
        flat fee would have done. Both moves can lower your monthly
        mortgage payment, but they work on different levers:
        a <strong>refinance replaces your loan</strong> (new rate, new
        term, new closing costs), while a <strong>recast keeps your loan
        and re-spreads a smaller balance</strong> over the schedule you
        already have. Which lever you should pull depends on one question:
        is the problem your <em>rate</em>, or your <em>payment</em>?
      </p>

      <h2>How Each One Works</h2>
      <h3>Recast: re-amortize what you already have</h3>
      <p>
        You send the lender a lump sum toward principal — typical minimums
        are <strong>$5,000–$10,000</strong> — and pay a flat fee of{' '}
        <strong>$150–$500</strong>. The lender recalculates the monthly
        payment on the now-smaller balance over the{' '}
        <strong>remaining original term at the existing rate</strong>. No
        appraisal, no credit check, no income verification, no closing
        costs. Your payoff date does not move; your required payment drops.
      </p>
      <h3>Refinance: replace the loan</h3>
      <p>
        A refinance pays off the old loan with a new one. Everything is
        renegotiated — rate, term, sometimes the borrowers themselves. The
        toll is <strong>2–5% of the loan amount in closing costs</strong>{' '}
        (origination, appraisal, title work, recording, often state
        taxes), a hard credit pull, and full underwriting. Worth it when
        the new rate is meaningfully lower; pure overhead when it is not.
      </p>

      <h2>The Worked Numbers: $400,000 Balance, 25 Years Left</h2>
      <p>
        Suppose you hold a 5.0% mortgage with a $400,000 balance, 25 years
        remaining, paying about <strong>$2,338/month</strong> — and you
        have $50,000 to deploy. Current market rates are 6.5% (higher than
        your loan). Compare:
      </p>
      <table>
        <thead>
          <tr>
            <th>Move</th>
            <th>Upfront cost</th>
            <th>New payment</th>
            <th>Rate</th>
            <th>Payoff date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Do nothing</td>
            <td>—</td>
            <td>$2,338</td>
            <td>5.0%</td>
            <td>25 yrs</td>
          </tr>
          <tr>
            <td>Recast with $50,000</td>
            <td>≈ $300 fee</td>
            <td>≈ $2,046 (−$292)</td>
            <td>5.0% (kept)</td>
            <td>25 yrs (kept)</td>
          </tr>
          <tr>
            <td>Refinance $350,000 at 6.5%</td>
            <td>≈ $7,000+ closing costs</td>
            <td>≈ $2,364</td>
            <td>6.5% (worse)</td>
            <td>Resets to 30 yrs</td>
          </tr>
          <tr>
            <td>Extra payment of $50,000 (no recast)</td>
            <td>$0</td>
            <td>$2,338 (unchanged)</td>
            <td>5.0%</td>
            <td>≈ 20 yrs (−5 yrs)</td>
          </tr>
        </tbody>
      </table>
      <p>
        In a higher-rate environment the refinance is strictly worse —
        you would pay $7,000 to get a <em>higher</em> payment at a{' '}
        <em>worse</em> rate with a longer term. The recast delivers
        $292/month of relief for $300, a one-month payback. And the plain
        extra payment shows the third option people forget: if you do not
        need lower payments, skipping the recast saves the most interest
        by shortening the loan instead.
      </p>

      <h2>When Each Move Wins</h2>
      <h3>Recast wins when…</h3>
      <ul>
        <li>
          <strong>Your existing rate beats the market.</strong> Anyone
          holding a low-rate loan from a cheaper era should protect it.
          A recast is the only payment-lowering tool that preserves it.
        </li>
        <li>
          <strong>You have a windfall and want cash-flow relief</strong> —
          home-sale proceeds, a bonus, an inheritance — and the goal is a
          permanently lower required payment, not a faster payoff.
        </li>
        <li>
          <strong>You would not pass underwriting right now.</strong>
          Recasts skip income and credit checks entirely — useful between
          jobs or after credit damage.
        </li>
      </ul>
      <h3>Refinance wins when…</h3>
      <ul>
        <li>
          <strong>Market rates are meaningfully below yours</strong> —
          the classic 0.75–1+ point drop — and you will keep the loan past
          the break-even month (closing costs ÷ monthly savings).
        </li>
        <li>
          <strong>You need to restructure</strong>: shorten 30 to 15
          years, escape an adjustable rate before it resets, or remove an
          ex-partner from the note. A recast cannot touch any of those.
        </li>
        <li>
          <strong>Your loan cannot be recast</strong> — FHA, VA, and USDA
          loans generally do not allow it, so a refinance (e.g. a VA
          streamline) is the available lever.
        </li>
      </ul>

      <h2>The Hybrid Most People Miss</h2>
      <p>
        The tools are not mutually exclusive. Refinance when rates drop to
        fix the <em>rate</em>; recast later when a lump sum arrives to fix
        the <em>payment</em>. And before doing either, sanity-check the
        cheapest option of all: simply adding the lump sum (or monthly
        extra) as principal with no paperwork whatsoever — it saves the
        most interest of any of the three, at a price of exactly zero.
      </p>

      <h2>Checklist Before You Decide</h2>
      <ul>
        <li>Ask your servicer: do you offer recasting, with what minimum and fee?</li>
        <li>Get the itemized Loan Estimate for any refinance — not the advertised cost.</li>
        <li>Compute the refinance break-even month: closing costs ÷ true monthly savings.</li>
        <li>Decide what you are buying: a lower rate (refinance), a lower payment (recast), or a shorter loan (extra payments).</li>
        <li>Confirm there is no prepayment penalty on your current note.</li>
      </ul>
    </>
  );
}
