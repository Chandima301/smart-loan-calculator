import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions that govern your use of Smart Loan Analyzer.',
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The terms governing your use of Smart Loan Analyzer."
      effectiveDate="April 25, 2026"
    >
      <p>
        By accessing or using Smart Loan Analyzer (the &quot;Service&quot;) at{' '}
        <a href={SITE_URL}>smartloanalyzer.com</a>, you agree to be bound by these Terms of
        Service. If you disagree with any part of these terms, please do not use the Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        Smart Loan Analyzer provides free online loan calculators including (but not limited to)
        EMI calculation, loan comparison, prepayment simulation, affordability analysis, and
        refinance break-even modeling. The Service is provided &quot;as is&quot; for informational
        purposes only.
      </p>

      <h2>2. Not Financial Advice</h2>
      <p>
        <strong>The Service does not constitute financial, legal, tax, or investment advice.</strong>{' '}
        All calculations, estimates, and outputs are mathematical projections based on the inputs
        you provide. Real-world loan terms, fees, taxes, insurance, and lender-specific charges
        are not included unless explicitly entered. You should always consult a qualified
        financial advisor, accountant, or licensed lender before making any borrowing or
        refinancing decision.
      </p>

      <h2>3. Accuracy of Calculations</h2>
      <p>
        We make every reasonable effort to ensure the calculators use industry-standard formulas
        (reducing-balance amortization, etc.). However, we make no warranty that the results
        match the figures any particular lender will quote. Lenders may apply different day-count
        conventions, rounding rules, fees, or compounding schedules. Always verify your final
        numbers with your lender&apos;s official quote.
      </p>

      <h2>4. Use of the Service</h2>
      <p>You agree to use the Service only for lawful purposes. You agree NOT to:</p>
      <ul>
        <li>Use the Service in any way that violates any applicable local, national, or international law.</li>
        <li>Attempt to scrape, replicate, mirror, or reverse-engineer the Service for commercial purposes.</li>
        <li>Attempt to gain unauthorized access to our systems or interfere with the Service&apos;s operation.</li>
        <li>Use automated tools to overload the Service.</li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        The Service, including its design, code, branding, and content, is owned by Smart Loan
        Analyzer and protected by copyright and other intellectual-property laws. Calculator
        outputs are yours to use freely. The underlying interface, code, and content may not be
        copied without permission.
      </p>

      <h2>6. Third-Party Links and Services</h2>
      <p>
        The Service may contain links to third-party websites or services (including lender
        websites referenced in informational content). We are not responsible for the content,
        privacy policies, or practices of any third-party site. Use of third-party services is
        at your own risk.
      </p>

      <h2>7. Advertising</h2>
      <p>
        The Service is supported by advertising, including Google AdSense. We do not endorse
        advertised products or lenders. Always research any advertised financial product
        independently before applying.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Smart Loan Analyzer and its operators shall not
        be liable for any direct, indirect, incidental, special, consequential, or punitive
        damages arising out of your use of the Service, including but not limited to: financial
        loss from acting on calculator outputs, loan decisions made based on the Service, or
        unavailability of the Service.
      </p>
      <p>
        You acknowledge that you use the Service at your own risk and that any reliance on
        calculator outputs is solely your responsibility.
      </p>

      <h2>9. No Warranty</h2>
      <p>
        The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis without
        warranties of any kind, either express or implied, including but not limited to warranties
        of merchantability, fitness for a particular purpose, or non-infringement.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We may revise these Terms at any time. Changes will be reflected by an updated
        &quot;Effective date&quot; at the top of this page. Continued use of the Service after
        changes constitutes your acceptance of the revised Terms.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms? Email us at{' '}
        <a href="mailto:chandimaamarasena12@gmail.com">chandimaamarasena12@gmail.com</a> or use
        the <a href="/contact">Contact page</a>.
      </p>
    </LegalPage>
  );
}
