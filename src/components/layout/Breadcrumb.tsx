import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';

export interface BreadcrumbItem {
  label: string;
  /** Omit href for the current (last) page. */
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

/**
 * Visible breadcrumb navigation rendered at the top of calculator pages.
 *
 * Emits its own `BreadcrumbList` JSON-LD so the structured data always
 * matches the visible trail (single source of truth). Pages that use this
 * component must NOT also emit a separate BreadcrumbList script.
 *
 * Typical usage:
 *   <Breadcrumb items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Loan Calculators', href: '/' },
 *     { label: 'Mortgage Calculator' },
 *   ]} />
 */
export default function Breadcrumb({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      ...(it.href
        ? { item: it.href === '/' ? SITE_URL : `${SITE_URL}${it.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto max-w-5xl px-4 pt-3"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {items.map((it, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={it.label} className="flex items-center gap-1.5">
                {it.href && !isLast ? (
                  <Link
                    href={it.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {it.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-foreground font-medium' : ''}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {it.label}
                  </span>
                )}
                {!isLast && (
                  <span aria-hidden className="text-muted-foreground/50">
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
