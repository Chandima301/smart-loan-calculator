import type { Metadata } from 'next';
import LoanCalculatorShell from '@/components/calculator/LoanCalculatorShell';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Smart Loan Analyzer — Free EMI Calculator',
  description:
    'Calculate EMI, total interest, and repayment for any loan instantly. Compare multiple scenarios, simulate prepayments, and check affordability.',
  alternates: { canonical: SITE_URL },
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="sr-only">Smart Loan Analyzer — Free EMI Calculator</h1>
      <LoanCalculatorShell />
    </>
  );
}
