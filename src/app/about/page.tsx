import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Smart Loan Analyzer — a free, signup-free loan calculator built to make borrowing decisions transparent.',
  alternates: { canonical: `${SITE_URL}/about` },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <LegalPage
      title="About Smart Loan Analyzer"
      subtitle="A free, no-signup loan calculator built to make borrowing decisions transparent."
    >
      <h2>Our mission</h2>
      <p>
        Most loan calculators online are buried under signup forms, lead-capture popups, or
        regional limitations that don&apos;t match your situation. Smart Loan Analyzer was built
        to fix that. Our mission is simple: <strong>give borrowers the math, fast, free, and
        without strings attached.</strong>
      </p>

      <h2>What we offer</h2>
      <p>
        Smart Loan Analyzer is a suite of loan calculators covering the most common borrowing
        scenarios:
      </p>
      <ul>
        <li>
          <strong>EMI / monthly payment calculator</strong> — instant repayment estimates with
          full amortization schedules.
        </li>
        <li>
          <strong>Loan comparison</strong> — put up to three offers side by side to find the
          cheapest option.
        </li>
        <li>
          <strong>Prepayment simulation</strong> — see exactly how much interest and time you
          save by paying extra principal.
        </li>
        <li>
          <strong>Affordability check</strong> — find the maximum loan you can comfortably take
          based on your income.
        </li>
        <li>
          <strong>Refinance analyzer</strong> — calculate break-even months and lifetime savings
          from switching lenders.
        </li>
        <li>
          <strong>Specialty calculators</strong> — biweekly mortgage savings, home loans,
          mortgages, auto loans, personal loans, student loans, and more.
        </li>
      </ul>

      <h2>How it works</h2>
      <p>
        All calculations run entirely in your browser using industry-standard amortization
        formulas. We don&apos;t store the numbers you enter, we don&apos;t require an account,
        and we don&apos;t ask for personal information. Switch currencies, adjust scenarios,
        and explore freely — every result you see is computed on your own device in real time.
      </p>

      <h2>Who we are</h2>
      <p>
        Smart Loan Analyzer is built and maintained by an independent developer focused on
        making financial tools more accessible. The site is free to use and supported by
        unobtrusive advertising. We&apos;re not affiliated with any bank, lender, or brokerage,
        which means our calculators don&apos;t favor any particular financial product — you
        just get the math.
      </p>

      <h2>Important notice</h2>
      <p>
        Smart Loan Analyzer provides calculators for informational purposes only. Our outputs
        are mathematical estimates and should not be treated as financial advice. Before signing
        any loan, always verify the exact figures with your lender and consider consulting a
        qualified financial advisor. See our <a href="/disclaimer">full disclaimer</a> for
        details.
      </p>

      <h2>Get in touch</h2>
      <p>
        Have feedback, found a bug, or want a new calculator added? Reach out via the{' '}
        <a href="/contact">Contact page</a> or email us directly at{' '}
        <a href="mailto:chandimaamarasena12@gmail.com">chandimaamarasena12@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
