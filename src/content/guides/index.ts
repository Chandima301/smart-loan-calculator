import type { ComponentType } from 'react';
import type { GuideMeta } from '@/components/landing/LoanLandingPage';

// Embedded guide metas (guides themselves render inside their calculator pages)
import { meta as homeLoanMeta } from './home-loan';
import { meta as mortgageMeta } from './mortgage';
import { meta as biweeklyMortgageMeta } from './biweekly-mortgage';
import { meta as refinanceMeta } from './refinance';
import { meta as autoLoanMeta } from './auto-loan';
import { meta as personalLoanMeta } from './personal-loan';
import { meta as studentLoanMeta } from './student-loan';
import { meta as studentLoanPayoffMeta } from './student-loan-payoff';
import { meta as pslfMeta } from './pslf';
import { meta as studentLoanRefinanceMeta } from './student-loan-refinance';

// Standalone articles (own routes under /guides/<slug>)
import BiweeklyVsExtraMonthlyPaymentsArticle, {
  meta as biweeklyVsExtraMeta,
  faq as biweeklyVsExtraFaq,
} from './biweekly-vs-extra-monthly-payments';
import PslfVsIncomeDrivenRepaymentArticle, {
  meta as pslfVsIdrMeta,
  faq as pslfVsIdrFaq,
} from './pslf-vs-income-driven-repayment';
import MortgageRecastVsRefinanceArticle, {
  meta as recastVsRefinanceMeta,
  faq as recastVsRefinanceFaq,
} from './mortgage-recast-vs-refinance';

export interface GuideFaqItem {
  question: string;
  answer: string;
}

/**
 * Content registry for the /guides hub. Two kinds of entry:
 *
 * - `embedded` — the 10 long-form guides that render INSIDE their calculator
 *   pages (AdSense constraint: they must stay there; the hub links to the
 *   `#guide` anchor on the calculator page rather than duplicating content).
 * - `standalone` — net-new comparison/decision articles with their own
 *   /guides/<slug> route, Article + FAQPage JSON-LD, and calculator CTAs.
 *
 * This registry is deliberately SEPARATE from RelatedCalculators.tsx
 * (ALL/RELATIONS/CATEGORIES) — that one drives the calculator discovery
 * grid and breadcrumbs and must only contain calculator routes.
 */
export interface EmbeddedGuideEntry {
  kind: 'embedded';
  title: string;
  description: string;
  /** Calculator page hosting the guide (also the CTA target). */
  calculatorPath: string;
  /** Link target: the guide anchor on the calculator page. */
  href: string;
}

export interface StandaloneGuideEntry {
  kind: 'standalone';
  slug: string;
  title: string;
  description: string;
  href: string;
  meta: GuideMeta;
  /** CTA calculators, first entry is primary (used for RelatedCalculators). */
  calculatorPaths: string[];
  faq: GuideFaqItem[];
  Component: ComponentType;
}

export type GuideEntry = EmbeddedGuideEntry | StandaloneGuideEntry;

function embedded(calculatorPath: string, meta: GuideMeta): EmbeddedGuideEntry {
  return {
    kind: 'embedded',
    title: meta.headline,
    description: meta.description,
    calculatorPath,
    href: `${calculatorPath}#guide`,
  };
}

function standalone(
  slug: string,
  meta: GuideMeta,
  calculatorPaths: string[],
  faq: GuideFaqItem[],
  Component: ComponentType,
): StandaloneGuideEntry {
  return {
    kind: 'standalone',
    slug,
    title: meta.headline,
    description: meta.description,
    href: `/guides/${slug}`,
    meta,
    calculatorPaths,
    faq,
    Component,
  };
}

export const STANDALONE_GUIDES: StandaloneGuideEntry[] = [
  standalone(
    'biweekly-vs-extra-monthly-payments',
    biweeklyVsExtraMeta,
    ['/biweekly-mortgage-calculator', '/mortgage-calculator'],
    biweeklyVsExtraFaq,
    BiweeklyVsExtraMonthlyPaymentsArticle,
  ),
  standalone(
    'pslf-vs-income-driven-repayment',
    pslfVsIdrMeta,
    ['/pslf-calculator', '/student-loan-calculator'],
    pslfVsIdrFaq,
    PslfVsIncomeDrivenRepaymentArticle,
  ),
  standalone(
    'mortgage-recast-vs-refinance',
    recastVsRefinanceMeta,
    ['/refinance-calculator', '/mortgage-calculator'],
    recastVsRefinanceFaq,
    MortgageRecastVsRefinanceArticle,
  ),
];

export const EMBEDDED_GUIDES: EmbeddedGuideEntry[] = [
  embedded('/home-loan-calculator', homeLoanMeta),
  embedded('/mortgage-calculator', mortgageMeta),
  embedded('/biweekly-mortgage-calculator', biweeklyMortgageMeta),
  embedded('/refinance-calculator', refinanceMeta),
  embedded('/auto-loan-calculator', autoLoanMeta),
  embedded('/personal-loan-calculator', personalLoanMeta),
  embedded('/student-loan-calculator', studentLoanMeta),
  embedded('/student-loan-payoff-calculator', studentLoanPayoffMeta),
  embedded('/pslf-calculator', pslfMeta),
  embedded('/student-loan-refinance-calculator', studentLoanRefinanceMeta),
];

export const GUIDES: GuideEntry[] = [...STANDALONE_GUIDES, ...EMBEDDED_GUIDES];

export const GUIDE_BY_SLUG: Record<string, StandaloneGuideEntry> =
  Object.fromEntries(STANDALONE_GUIDES.map((g) => [g.slug, g]));
