import Link from 'next/link';
import {
  Home,
  Building,
  CalendarRange,
  CreditCard,
  Car,
  Truck,
  GraduationCap,
  RefreshCw,
  Calculator,
  type LucideIcon,
} from 'lucide-react';

interface CalcMeta {
  label: string;
  desc: string;
  Icon: LucideIcon;
}

/**
 * Master metadata for every calculator route. Keys are canonical paths.
 */
const ALL: Record<string, CalcMeta> = {
  '/': {
    label: 'Loan / EMI Calculator',
    desc: 'Generic loan EMI, comparison, prepayment & affordability tool.',
    Icon: Calculator,
  },
  '/home-loan-calculator': {
    label: 'Home Loan Calculator',
    desc: 'Estimate monthly home loan EMI and full amortization.',
    Icon: Home,
  },
  '/mortgage-calculator': {
    label: 'Mortgage Calculator',
    desc: '15 vs 30-year fixed-rate mortgage payment & interest.',
    Icon: Building,
  },
  '/biweekly-mortgage-calculator': {
    label: 'Biweekly Mortgage Calculator',
    desc: 'See how much you save by paying biweekly instead of monthly.',
    Icon: CalendarRange,
  },
  '/personal-loan-calculator': {
    label: 'Personal Loan Calculator',
    desc: 'Unsecured loan EMI, total interest, and amortization.',
    Icon: CreditCard,
  },
  '/car-loan-calculator': {
    label: 'Car Loan Calculator',
    desc: 'Vehicle financing payment estimator with full schedule.',
    Icon: Car,
  },
  '/auto-loan-calculator': {
    label: 'Auto Loan Calculator',
    desc: 'US auto loan APR, monthly payment, and lifetime interest.',
    Icon: Truck,
  },
  '/student-loan-calculator': {
    label: 'Student Loan Calculator',
    desc: 'Repayment schedule and payoff timeline for student debt.',
    Icon: GraduationCap,
  },
  '/refinance-calculator': {
    label: 'Refinance Calculator',
    desc: 'Break-even month and lifetime savings from refinancing.',
    Icon: RefreshCw,
  },
};

/**
 * Curated "what would a user logically need next?" map.
 * 3–4 strategically chosen links per page to maximize internal linking
 * for SEO (depth + topic clustering) without becoming spammy.
 */
const RELATIONS: Record<string, string[]> = {
  '/': [
    '/home-loan-calculator',
    '/mortgage-calculator',
    '/personal-loan-calculator',
    '/auto-loan-calculator',
  ],
  '/home-loan-calculator': [
    '/mortgage-calculator',
    '/biweekly-mortgage-calculator',
    '/refinance-calculator',
    '/personal-loan-calculator',
  ],
  '/mortgage-calculator': [
    '/biweekly-mortgage-calculator',
    '/home-loan-calculator',
    '/refinance-calculator',
    '/auto-loan-calculator',
  ],
  '/biweekly-mortgage-calculator': [
    '/mortgage-calculator',
    '/home-loan-calculator',
    '/refinance-calculator',
    '/',
  ],
  '/personal-loan-calculator': [
    '/car-loan-calculator',
    '/student-loan-calculator',
    '/auto-loan-calculator',
    '/refinance-calculator',
  ],
  '/car-loan-calculator': [
    '/auto-loan-calculator',
    '/personal-loan-calculator',
    '/refinance-calculator',
    '/',
  ],
  '/auto-loan-calculator': [
    '/car-loan-calculator',
    '/personal-loan-calculator',
    '/refinance-calculator',
    '/mortgage-calculator',
  ],
  '/student-loan-calculator': [
    '/personal-loan-calculator',
    '/refinance-calculator',
    '/biweekly-mortgage-calculator',
    '/',
  ],
  '/refinance-calculator': [
    '/mortgage-calculator',
    '/biweekly-mortgage-calculator',
    '/home-loan-calculator',
    '/auto-loan-calculator',
  ],
};

interface Props {
  /** Canonical path of the current page, e.g. "/home-loan-calculator" */
  currentPath: string;
}

export default function RelatedCalculators({ currentPath }: Props) {
  const relatedPaths = RELATIONS[currentPath] ?? [];
  if (relatedPaths.length === 0) return null;

  return (
    <section
      aria-labelledby="related-calculators-heading"
      className="container mx-auto max-w-5xl px-4 py-10 border-t"
    >
      <div className="flex items-baseline justify-between mb-5">
        <h2 id="related-calculators-heading" className="text-lg font-semibold">
          Related calculators
        </h2>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          You might also find these useful
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {relatedPaths.map((path) => {
          const meta = ALL[path];
          if (!meta) return null;
          const { label, desc, Icon } = meta;
          return (
            <Link
              key={path}
              href={path}
              className="rounded-lg border p-3 hover:border-primary hover:bg-muted/50 transition-colors flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <p className="font-semibold text-sm leading-tight">{label}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
