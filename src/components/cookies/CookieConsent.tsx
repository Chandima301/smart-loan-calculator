'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'cookie-consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GDPR / CCPA / AdSense-compliant cookie consent banner.
 *
 * Works in tandem with the Google Consent Mode v2 default state in layout.tsx,
 * which sets all advertising + analytics storage to "denied" until the user
 * makes a choice here. On accept/reject we update the consent state via gtag().
 *
 * "Accept" and "Reject" are equally prominent — required by GDPR. The banner
 * doesn't reappear once the user has chosen.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      // localStorage unavailable (private mode, etc.) — show banner anyway
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'granted');
    } catch {}
    window.gtag?.('consent', 'update', {
      ad_storage:         'granted',
      ad_user_data:       'granted',
      ad_personalization: 'granted',
      analytics_storage:  'granted',
    });
    setVisible(false);
  };

  const reject = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'denied');
    } catch {}
    // No update needed — defaults are already "denied"
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4 pointer-events-none"
    >
      <div className="container mx-auto max-w-3xl pointer-events-auto rounded-xl border bg-background/95 backdrop-blur shadow-lg">
        <div className="flex flex-col gap-4 p-4 sm:p-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-3 flex-1">
            <div className="rounded-md bg-primary/10 p-2 shrink-0">
              <Cookie className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm leading-relaxed text-foreground/90">
              <p className="font-medium text-foreground mb-1">We use cookies</p>
              <p className="text-xs text-muted-foreground">
                Smart Loan Analyzer uses cookies for analytics and personalized ads (Google
                AdSense, Google Analytics). You can accept all or reject non-essential cookies.
                Essential cookies for site functionality are always active. See our{' '}
                <Link href="/privacy-policy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
            </div>
          </div>

          <div className="flex gap-2 sm:flex-col sm:w-auto sm:items-stretch shrink-0">
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Accept all
            </button>
            <button
              onClick={reject}
              className="flex-1 sm:flex-none px-4 py-2 rounded-md border border-input bg-transparent text-xs font-semibold hover:bg-muted transition-colors whitespace-nowrap"
            >
              Reject all
            </button>
          </div>

          <button
            onClick={reject}
            aria-label="Dismiss cookie banner"
            className="absolute top-2 right-2 sm:hidden p-1 rounded-md hover:bg-muted text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
