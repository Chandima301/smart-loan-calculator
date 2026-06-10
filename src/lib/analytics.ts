/**
 * GA4 event tracking.
 *
 * gtag.js is loaded in src/app/layout.tsx (NEXT_PUBLIC_GA_MEASUREMENT_ID) and
 * Consent Mode v2 (CookieConsent.tsx) gates what is actually transmitted — no
 * extra consent logic is needed here. NOT pure math: guarded browser access.
 *
 * Event names in use (mark as Key Events in the GA4 admin console):
 *   calculator_engaged · pdf_download · share_link_copy ·
 *   comparison_scenario_add · prepayment_simulated
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
