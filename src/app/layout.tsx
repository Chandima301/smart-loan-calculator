import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/cookies/CookieConsent';
import { SITE_URL } from '@/lib/constants';
import './globals.css';

/**
 * Google Consent Mode v2 — initialized BEFORE any GA / AdSense script loads.
 * Defaults all advertising + analytics storage to "denied" until the user
 * explicitly consents via the banner. If the user previously consented, we
 * restore that state synchronously so they don't see the banner again.
 *
 * GDPR / CCPA / AdSense Personalized-Ads policy compliant.
 */
const consentDefaultScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('consent', 'default', {
    'ad_storage':            'denied',
    'ad_user_data':          'denied',
    'ad_personalization':    'denied',
    'analytics_storage':     'denied',
    'functionality_storage': 'granted',
    'security_storage':      'granted',
    'wait_for_update':       500
  });
  try {
    var saved = localStorage.getItem('cookie-consent');
    if (saved === 'granted') {
      gtag('consent', 'update', {
        'ad_storage':         'granted',
        'ad_user_data':       'granted',
        'ad_personalization': 'granted',
        'analytics_storage':  'granted'
      });
    }
  } catch (e) {}
`;

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Smart Loan Analyzer',
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  description: 'Free online loan calculators for EMI, comparison, prepayment, and affordability.',
};

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Smart Loan Analyzer — Free EMI Calculator',
    template: '%s | Smart Loan Analyzer',
  },
  description:
    'Free EMI calculator with loan comparison, prepayment simulation, and affordability check. Calculate home loan, personal loan, and vehicle loan EMIs instantly.',
  keywords: [
    'EMI calculator',
    'loan calculator',
    'home loan calculator',
    'mortgage calculator',
    'personal loan calculator',
    'car loan calculator',
    'auto loan calculator',
    'prepayment calculator',
    'loan comparison tool',
    'loan affordability calculator',
    'amortization calculator',
    'loan restructure calculator',
    'free loan calculator',
    'online EMI calculator',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Smart Loan Analyzer',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        {/* Google Consent Mode v2 default — must run before GA + AdSense */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <TooltipProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </TooltipProvider>
        <CookieConsent />
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8973602955210703"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
