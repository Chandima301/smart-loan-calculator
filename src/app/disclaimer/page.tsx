import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important notice about the limitations of Smart Loan Analyzer calculations and outputs.',
  alternates: { canonical: `${SITE_URL}/disclaimer` },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      subtitle="Important notice about the use and limitations of Smart Loan Analyzer."
      effectiveDate="April 25, 2026"
    >
      <p>
        The information provided by Smart Loan Analyzer (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
        on <a href={SITE_URL}>smartloanalyzer.com</a> (the &quot;Service&quot;) is for general
        informational purposes only. All calculations, estimates, and content on this site are
        provided in good faith but we make no representation or warranty, express or implied,
        regarding the accuracy, adequacy, validity, reliability, or completeness of any
        information.
      </p>

      <h2>Not Financial Advice</h2>
      <p>
        <strong>The Service does not provide financial, legal, tax, investment, or accounting
        advice.</strong> The calculators on this site are mathematical tools that compute
        amortization schedules, payments, and savings based on inputs you provide. They are not
        a substitute for advice from a licensed financial professional.
      </p>
      <p>
        Before making any borrowing, refinancing, or investment decision, you should consult
        with a qualified financial advisor, accountant, lender, or attorney who can review your
        specific situation.
      </p>

      <h2>Calculator Accuracy</h2>
      <p>
        Our calculators use standard amortization formulas (reducing-balance method) and
        industry-accepted mathematical approaches. However, the actual figures any specific
        lender quotes you may differ for several reasons:
      </p>
      <ul>
        <li>
          <strong>Fees and charges:</strong> origination fees, processing fees, insurance
          premiums, taxes, and other charges are typically not included unless you explicitly
          enter them.
        </li>
        <li>
          <strong>Day-count conventions:</strong> lenders may use 30/360, actual/365, or other
          day-count methods that produce slightly different interest totals.
        </li>
        <li>
          <strong>Compounding frequency:</strong> some loans compound interest daily or
          continuously rather than monthly.
        </li>
        <li>
          <strong>Variable rates:</strong> our calculators assume a fixed rate for the entire
          tenure. Variable / adjustable-rate loans will produce different results.
        </li>
        <li>
          <strong>Prepayment penalties, lock-in periods, or other contractual terms</strong>{' '}
          imposed by your specific lender.
        </li>
        <li>
          <strong>Currency conversion, exchange rates, and tax implications</strong> when used
          across countries.
        </li>
      </ul>
      <p>
        <strong>Always verify the final numbers against your lender&apos;s official quote
        before signing any loan agreement.</strong>
      </p>

      <h2>No Guarantees</h2>
      <p>
        We do not guarantee that you will qualify for any particular loan, rate, or term shown
        in our calculators. Loan approval, interest rates, and terms depend on factors such as
        credit score, income, debt-to-income ratio, employment history, collateral, and
        lender-specific policies that our calculators do not evaluate.
      </p>

      <h2>External Links</h2>
      <p>
        The Service may contain links to external websites that are not maintained by us. We
        have no control over the content, privacy practices, or accuracy of those external
        sites and accept no responsibility for them.
      </p>

      <h2>Advertising Disclaimer</h2>
      <p>
        The Service is supported by advertising, including Google AdSense. The presence of an
        advertisement on this site does not constitute an endorsement, recommendation, or
        approval of the advertised product, service, or company. We do not vet advertisers and
        are not responsible for any transactions or decisions you make based on advertised
        content.
      </p>

      <h2>Errors and Omissions</h2>
      <p>
        While we strive for accuracy, our calculators and content may occasionally contain
        errors or omissions. If you spot one, please report it via our{' '}
        <a href="/contact">Contact page</a> so we can fix it. We will not be liable for any
        loss or damage arising from reliance on information that turns out to be inaccurate.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Under no circumstances shall Smart Loan Analyzer or its operators be liable for any
        loss or damage of any kind incurred as a result of the use of the Service or reliance
        on any information provided. Your use of the Service and your reliance on any
        information from the Service is solely at your own risk.
      </p>

      <h2>Consent</h2>
      <p>
        By using the Service, you hereby consent to this Disclaimer and agree to its terms.
      </p>
    </LegalPage>
  );
}
