import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_URL } from '@/lib/constants';
import './globals.css';

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
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8973602955210703"
          crossOrigin="anonymous"
          strategy="afterInteractive"
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
