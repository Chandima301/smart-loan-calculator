import Link from 'next/link';
import { ALL, RELATIONS } from './RelatedCalculators';

interface Props {
  /** Canonical path of the current page, e.g. "/mortgage-calculator" */
  currentPath: string;
}

/**
 * Compact, horizontally-scrollable chip row of related calculators,
 * rendered immediately after the calculator (above the guide).
 *
 * Visually distinct from the footer `RelatedCalculators` card grid:
 * this one is a single scannable row of pills for quick navigation,
 * matching the calculator.net pattern of always-visible cross-links
 * near the tool. Increases internal-link density and pages/session.
 *
 * Reuses the single source of truth (ALL + RELATIONS) from
 * RelatedCalculators — no duplicated metadata.
 */
export default function InlineRelatedCalculators({ currentPath }: Props) {
  const related = RELATIONS[currentPath] ?? [];
  if (related.length === 0) return null;

  return (
    <div className="container mx-auto max-w-5xl px-4 pt-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-medium text-muted-foreground shrink-0">
          Related:
        </span>
        {related.map((path) => {
          const meta = ALL[path];
          if (!meta) return null;
          const { label, Icon } = meta;
          return (
            <Link
              key={path}
              href={path}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap hover:border-primary hover:bg-muted/50 transition-colors shrink-0"
            >
              <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
