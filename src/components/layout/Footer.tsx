import Link from 'next/link';
import FeaturedOn from './FeaturedOn';

const CALCULATOR_LINKS = [
  { href: '/',                          label: 'EMI Calculator'      },
  { href: '/home-loan-calculator',      label: 'Home Loan'           },
  { href: '/mortgage-calculator',       label: 'Mortgage'            },
  { href: '/biweekly-mortgage-calculator', label: 'Biweekly Mortgage' },
  { href: '/refinance-calculator',      label: 'Refinance'           },
  { href: '/auto-loan-calculator',      label: 'Auto / Car Loan'     },
  { href: '/personal-loan-calculator',  label: 'Personal Loan'       },
  { href: '/student-loan-calculator',   label: 'Student Loan'        },
  { href: '/student-loan-payoff-calculator', label: 'Student Loan Payoff' },
  { href: '/pslf-calculator',           label: 'PSLF Calculator'     },
  { href: '/student-loan-refinance-calculator', label: 'Student Loan Refinance' },
];

const GUIDE_LINKS = [
  { href: '/guides',                                    label: 'All Guides'                  },
  { href: '/guides/biweekly-vs-extra-monthly-payments', label: 'Biweekly vs Extra Payments'  },
  { href: '/guides/pslf-vs-income-driven-repayment',    label: 'PSLF vs IDR'                 },
  { href: '/guides/mortgage-recast-vs-refinance',       label: 'Recast vs Refinance'         },
];

const COMPANY_LINKS = [
  { href: '/about',           label: 'About'           },
  { href: '/contact',         label: 'Contact'         },
];

const LEGAL_LINKS = [
  { href: '/privacy-policy',  label: 'Privacy Policy'  },
  { href: '/terms',           label: 'Terms of Service'},
  { href: '/disclaimer',      label: 'Disclaimer'      },
];

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto max-w-5xl px-4 py-10 text-sm text-muted-foreground">
        {/* Multi-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="font-semibold text-foreground mb-1">Smart Loan Analyzer</p>
            <p className="text-xs leading-relaxed max-w-xs">
              Free loan calculators for EMI, comparison, prepayment simulation, and affordability
              checks — no signup required.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <p className="font-semibold text-foreground mb-3">Calculators</p>
            <nav className="flex flex-col gap-2">
              {CALCULATOR_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs hover:text-foreground transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Guides */}
          <div>
            <p className="font-semibold text-foreground mb-3">Guides</p>
            <nav className="flex flex-col gap-2">
              {GUIDE_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs hover:text-foreground transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-foreground mb-3">Company</p>
            <nav className="flex flex-col gap-2">
              {COMPANY_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs hover:text-foreground transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="font-semibold text-foreground mb-3">Legal</p>
            <nav className="flex flex-col gap-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs hover:text-foreground transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Featured on — directory badges (auto-hidden if no badges configured) */}
        <FeaturedOn />

        {/* Bottom bar */}
        <div className="border-t pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Smart Loan Analyzer. Free to use.</p>
        </div>
        <p className="mt-3 text-xs">
          Disclaimer: Calculations are for informational purposes only. Actual loan terms may vary
          by lender. Always consult a financial advisor before taking a loan. See our{' '}
          <Link href="/disclaimer" className="underline hover:text-foreground">full disclaimer</Link>{' '}
          for details.
        </p>
      </div>
    </footer>
  );
}
