import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, BarChart2, Wallet, RefreshCw } from 'lucide-react';
import LoanCalculatorShell from '@/components/calculator/LoanCalculatorShell';
import { buildSoftwareAppSchema, STANDARD_CALCULATOR_FEATURES } from '@/lib/seo/softwareAppSchema';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Free Loan Calculator — EMI, Comparison, Prepayment & Affordability',
  description:
    'Calculate monthly payments, total interest, and full amortization for any loan. Compare offers, simulate prepayments, and check affordability — free, no signup.',
  alternates: { canonical: SITE_URL },
};

const CALCULATOR_LINKS = [
  { href: '/home-loan-calculator',     label: 'Home Loan',     desc: 'Monthly payment & mortgage estimator' },
  { href: '/mortgage-calculator',      label: 'Mortgage',      desc: '15 vs 30-year fixed-rate payments' },
  { href: '/biweekly-mortgage-calculator', label: 'Biweekly Mortgage', desc: 'Save years & interest with biweekly payments' },
  { href: '/personal-loan-calculator', label: 'Personal Loan', desc: 'Unsecured loan EMI calculator' },
  { href: '/car-loan-calculator',      label: 'Car Loan',      desc: 'Auto finance payment estimator' },
  { href: '/auto-loan-calculator',     label: 'Auto Loan',     desc: 'US auto loan interest & amortization' },
  { href: '/student-loan-calculator',  label: 'Student Loan',  desc: 'Monthly payment & payoff timeline' },
  { href: '/refinance-calculator',     label: 'Refinance',     desc: 'Break-even & lifetime savings' },
];

const FEATURES = [
  { Icon: Calculator,  label: 'Calculator',    desc: 'Instant EMI, total interest, and full amortization schedule.' },
  { Icon: BarChart2,   label: 'Compare',       desc: 'Put up to 3 loan offers side by side to find the cheapest.' },
  { Icon: Wallet,      label: 'Affordability', desc: 'Find the maximum loan size you can comfortably borrow.' },
  { Icon: RefreshCw,   label: 'Restructure',   desc: 'Calculate refinance break-even and total lifetime savings.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Smart Loan Analyzer',
  url: SITE_URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Free EMI calculator with loan comparison, prepayment simulation, and affordability check.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'EMI Calculator',
    'Loan Comparison',
    'Prepayment Simulation',
    'Affordability Check',
    'Amortization Schedule',
  ],
};

const softwareJsonLd = buildSoftwareAppSchema({
  name: 'Smart Loan Analyzer',
  url: SITE_URL,
  description:
    'Free, no-signup loan and EMI calculator suite with 11 specialized tools (mortgage, refinance, biweekly, student loans, PSLF, auto, personal) and AI-enhanced insights. Monthly payment follows M = P * r * (1+r)^n / ((1+r)^n - 1). Multi-currency, mobile-first, all math on-device.',
  featureList: [
    ...STANDARD_CALCULATOR_FEATURES,
    'Dedicated student-loan suite (general / payoff / PSLF / refinance)',
    'Biweekly mortgage simulation (true 26 payments per year)',
  ],
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I calculate my loan EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your loan amount, annual interest rate, and tenure in months into the Calculator tab. The EMI is computed instantly using the reducing-balance formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is principal, r is the monthly rate, and n is the number of months.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I compare two loan offers side by side?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Switch to the Compare tab, add up to three scenarios, and set different principals, rates, or tenures for each. The tool shows EMI, total interest, and total repayment for every scenario simultaneously so you can identify the cheapest option.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I save with loan prepayments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prepayments reduce your outstanding principal directly, cutting interest on every future payment. Use the Prepayment Simulator in the Calculator tab to enter an extra monthly amount and see the exact interest saved and months removed from your tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check how much loan I can afford?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open the Affordability tab, enter your monthly income, and set your preferred EMI-to-income ratio (e.g. 40%). The calculator instantly shows the maximum loan amount you can borrow at any given rate and tenure without exceeding that ratio.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero banner — compact on mobile so the calculator is above the fold */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-5xl px-4 py-4 sm:py-7">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
            Free Loan Calculator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl sm:mt-2 sm:text-base">
            Calculate monthly payments, total interest, and full amortization for any loan — home, mortgage, auto, student, or personal.
          </p>
          <p className="mt-2 hidden text-sm text-muted-foreground max-w-2xl md:block">
            Smart Loan Analyzer is a <strong>free, no-signup loan calculator</strong> with 11 specialized tools — mortgage, refinance, biweekly, student loans, PSLF, auto, personal. Any amortizing loan&apos;s monthly payment follows <strong>M = P × r × (1+r)^n / ((1+r)^n − 1)</strong>, where P is principal, r is the monthly rate (annual / 12), and n is the number of months. Multi-currency, mobile-first, all math runs locally in your browser.
          </p>
        </div>
      </div>

      {/* Generic calculator — placed first so it's above the fold on landing */}
      <LoanCalculatorShell pdfTitle="Loan / EMI Calculator" pdfSlug="loan-emi" />

      {/* Specialized calculators — funnel routing to per-loan-type pages */}
      <div className="container mx-auto max-w-5xl px-4 pt-8 pb-2">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-semibold">Pick a calculator for your loan type</h2>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            More tuned for your specific loan
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CALCULATOR_LINKS.map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border p-3 hover:border-primary hover:bg-muted/50 transition-colors"
            >
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="container mx-auto max-w-5xl px-4 pt-6 pb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ Icon, label, desc }) => (
            <div key={label} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2 min-w-0">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-muted-foreground uppercase truncate">
                  {label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
