import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { SITE_URL } from '@/lib/constants';
import { Mail, MessageSquare, Bug } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Smart Loan Analyzer for feedback, feature requests, bug reports, or partnership inquiries.',
  alternates: { canonical: `${SITE_URL}/contact` },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact Us"
      subtitle="Feedback, feature requests, bug reports, or partnership inquiries — we want to hear from you."
    >
      <p>
        Smart Loan Analyzer is built and maintained by an independent developer. The fastest
        way to reach us is by email — we read every message and typically respond within 1–3
        business days.
      </p>

      {/* Contact cards */}
      <div className="not-prose grid gap-4 sm:grid-cols-3 my-6">
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              General
            </span>
          </div>
          <p className="text-sm">
            Questions, partnerships, or general feedback.
          </p>
          <a
            href="mailto:chandimaamarasena12@gmail.com"
            className="text-xs font-medium text-primary hover:underline break-all"
          >
            chandimaamarasena12@gmail.com
          </a>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Feature requests
            </span>
          </div>
          <p className="text-sm">
            Have a calculator we don&apos;t cover yet? Tell us.
          </p>
          <a
            href="mailto:chandimaamarasena12@gmail.com?subject=Feature%20Request"
            className="text-xs font-medium text-primary hover:underline"
          >
            Send a request →
          </a>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Bug reports
            </span>
          </div>
          <p className="text-sm">
            Spotted a wrong calculation or broken link?
          </p>
          <a
            href="mailto:chandimaamarasena12@gmail.com?subject=Bug%20Report"
            className="text-xs font-medium text-primary hover:underline"
          >
            Report a bug →
          </a>
        </div>
      </div>

      <h2>What to include in your message</h2>
      <p>To help us respond as quickly as possible, please include:</p>
      <ul>
        <li>The page or calculator you were using (e.g. <code>/biweekly-mortgage-calculator</code>).</li>
        <li>The inputs you entered (loan amount, rate, tenure).</li>
        <li>What you expected to see vs. what actually happened.</li>
        <li>Your device and browser, if reporting a display issue.</li>
      </ul>

      <h2>Privacy</h2>
      <p>
        Anything you send us via email is used only to respond to your message. We don&apos;t
        add you to a mailing list, share your email with third parties, or use it for marketing.
        See our <a href="/privacy-policy">Privacy Policy</a> for full details.
      </p>

      <h2>Response time</h2>
      <p>
        We&apos;re a small operation, so we usually reply within 1–3 business days. Bug reports
        affecting calculations are prioritized and typically addressed within 24–48 hours.
      </p>
    </LegalPage>
  );
}
