import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { GUIDE_BY_SLUG } from '@/content/guides';

interface Props {
  /** Slugs of standalone /guides articles to feature (see src/content/guides/index.ts). */
  slugs: string[];
}

/**
 * Small "Related reading" block linking calculator pages to standalone
 * /guides articles. Purely additive — sits between RelatedCalculators
 * and the FAQ without touching the embedded guide.
 */
export default function RelatedReading({ slugs }: Props) {
  const guides = slugs.map((s) => GUIDE_BY_SLUG[s]).filter(Boolean);
  if (guides.length === 0) return null;

  return (
    <section
      aria-labelledby="related-reading-heading"
      className="container mx-auto max-w-5xl px-4 pt-2 pb-6"
    >
      <h2 id="related-reading-heading" className="text-sm font-semibold mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        Related reading
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={g.href}
            className="rounded-lg border p-4 hover:border-primary hover:bg-muted/50 transition-colors"
          >
            <p className="font-semibold text-sm leading-snug mb-1">{g.title}</p>
            <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{g.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
