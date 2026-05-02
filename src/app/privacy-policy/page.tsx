import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Smart Loan Analyzer collects, uses, and protects your data when you use our free loan calculators.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How we handle your data when you use Smart Loan Analyzer."
      effectiveDate="April 25, 2026"
    >
      <p>
        Smart Loan Analyzer (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{' '}
        <a href={SITE_URL}>smartloanalyzer.com</a> (the &quot;Service&quot;). This page informs you of
        our policies regarding the collection, use, and disclosure of personal information when
        you use our Service.
      </p>

      <h2>Information We Collect</h2>
      <p>
        Smart Loan Analyzer is a free loan calculator tool. We do <strong>not</strong> require
        signup, login, or any personal information to use any of our calculators. The numbers
        you enter into the calculators (loan amount, interest rate, tenure, income, etc.) are
        processed entirely in your browser and are not transmitted to or stored on our servers.
      </p>

      <p>We do collect limited information automatically through standard analytics tools:</p>
      <ul>
        <li>
          <strong>Usage data:</strong> pages visited, time on site, browser type, device type,
          approximate geographic region (country / city level), and referral source.
        </li>
        <li>
          <strong>Technical data:</strong> IP address (anonymized), operating system, browser
          version, and screen resolution.
        </li>
        <li>
          <strong>Preferences:</strong> if you change the displayed currency, your selection is
          stored locally in your browser (via <code>localStorage</code>) so it persists across
          visits. This information never leaves your device.
        </li>
      </ul>

      <h2>Cookies and Similar Technologies</h2>
      <p>
        We and our service providers use cookies and similar tracking technologies to operate
        and improve the Service. The cookies we use fall into the following categories:
      </p>
      <ul>
        <li>
          <strong>Essential cookies:</strong> required for the Service to function (e.g.
          remembering your currency preference).
        </li>
        <li>
          <strong>Analytics cookies:</strong> Google Analytics (GA4) and Vercel Analytics use
          cookies to understand how visitors use the site. This helps us improve the calculators.
        </li>
        <li>
          <strong>Advertising cookies:</strong> Google AdSense and its partners use cookies to
          serve ads based on your prior visits to this and other websites. You can opt out of
          personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ad Settings
          </a>{' '}
          or{' '}
          <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer">
            aboutads.info
          </a>.
        </li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>We use the following third-party services, each with their own privacy policies:</p>
      <ul>
        <li>
          <strong>Google Analytics</strong> —{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
        </li>
        <li>
          <strong>Google AdSense</strong> — third-party vendor that uses cookies to serve ads
          based on a user&apos;s prior visits to this website or other websites.{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
            Google Advertising Policies
          </a>
        </li>
        <li>
          <strong>Vercel</strong> (hosting and analytics) —{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercel Privacy Policy
          </a>
        </li>
      </ul>

      <h2>Google AdSense and Personalized Ads</h2>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s
        prior visits to our website or other websites. Google&apos;s use of advertising cookies
        enables it and its partners to serve ads to our users based on their visit to our sites
        and/or other sites on the Internet.
      </p>
      <p>
        Users may opt out of personalized advertising by visiting{' '}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          Google Ad Settings
        </a>. Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for
        personalized advertising by visiting{' '}
        <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer">
          www.aboutads.info
        </a>.
      </p>

      <h2>Managing Your Cookie Consent</h2>
      <p>
        When you first visit Smart Loan Analyzer, basic anonymized analytics
        (Google Analytics) is enabled by default so we can understand site
        usage and reliability — this is treated as operationally necessary.
        Personalized advertising cookies (Google AdSense) are <strong>off by
        default</strong> until you explicitly opt in via the cookie consent
        banner. The banner gives you two clearly labelled options:
      </p>
      <ul>
        <li>
          <strong>Accept all:</strong> enables both analytics and personalized
          advertising cookies (Google AdSense, Google Analytics) so we can
          measure usage and show relevant ads.
        </li>
        <li>
          <strong>Reject all:</strong> opts you out of analytics tracking{' '}
          <em>and</em> personalized advertising. You will still see ads, but
          they will not be personalized to you.
        </li>
      </ul>
      <p>
        We implement{' '}
        <a
          href="https://developers.google.com/tag-platform/security/concepts/consent-mode"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Consent Mode v2
        </a>
        , which means advertising and analytics tags respect your choice from the moment the
        page loads. To change your decision later, clear your browser&apos;s site data for
        smartloanalyzer.com — the banner will reappear on your next visit.
      </p>

      <h2>Data Retention</h2>
      <p>
        Because we don&apos;t collect personal information directly, we have nothing to retain.
        Analytics data collected by Google and Vercel is retained according to their respective
        retention policies.
      </p>

      <h2>Your Rights</h2>
      <p>Depending on your jurisdiction (e.g. GDPR for the EU, CCPA for California), you may have the right to:</p>
      <ul>
        <li>Request access to the personal data we hold about you (we hold none directly).</li>
        <li>Request deletion of your data.</li>
        <li>Opt out of personalized advertising via the Google Ad Settings link above.</li>
        <li>Disable cookies via your browser settings.</li>
      </ul>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Our Service is not intended for use by anyone under 13 years of age. We do not knowingly
        collect personal information from children under 13.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be reflected by an
        updated &quot;Effective date&quot; at the top of this page. We encourage you to review
        this page periodically.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at{' '}
        <a href="mailto:chandimaamarasena12@gmail.com">chandimaamarasena12@gmail.com</a> or
        through our <a href="/contact">Contact page</a>.
      </p>
    </LegalPage>
  );
}
