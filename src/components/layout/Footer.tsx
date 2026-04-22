import Link from 'next/link';

const CALCULATOR_LINKS = [
  { href: '/',                          label: 'EMI Calculator'      },
  { href: '/home-loan-calculator',      label: 'Home Loan'           },
  { href: '/personal-loan-calculator',  label: 'Personal Loan'       },
  { href: '/car-loan-calculator',       label: 'Car Loan'            },
  { href: '/mortgage-calculator',       label: 'Mortgage'            },
  { href: '/student-loan-calculator',   label: 'Student Loan'        },
  { href: '/auto-loan-calculator',      label: 'Auto Loan'           },
  { href: '/refinance-calculator',      label: 'Refinance'           },
];

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto max-w-5xl px-4 py-10 text-sm text-muted-foreground">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Left — brand */}
          <div>
            <p className="font-semibold text-foreground mb-1">Smart Loan Analyzer</p>
            <p className="text-xs leading-relaxed max-w-xs">
              Free loan calculators for EMI, comparison, prepayment simulation, and affordability
              checks — no signup required.
            </p>
          </div>

          {/* Right — calculators */}
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
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Smart Loan Analyzer. Free to use.</p>
        </div>
        <p className="mt-3 text-xs">
          Disclaimer: Calculations are for informational purposes only. Actual loan terms may vary
          by lender. Always consult a financial advisor before taking a loan.
        </p>
      </div>
    </footer>
  );
}
