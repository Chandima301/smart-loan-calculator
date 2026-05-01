import { SITE_URL } from '@/lib/constants';

export interface ArticleSchemaInput {
  /** The article headline (short, plain text — usually matches the H2 of the guide). */
  headline: string;
  /** 1–2 sentence summary of the article. */
  description: string;
  /** Canonical URL of the page hosting the article. */
  url: string;
  /** ISO date string (YYYY-MM-DD) the guide was first published. */
  datePublished: string;
  /** ISO date string (YYYY-MM-DD) the guide was last updated. Defaults to `datePublished`. */
  dateModified?: string;
}

/**
 * Builds a `schema.org/Article` JSON-LD object suitable for embedding in a
 * `<script type="application/ld+json">` tag. The publisher is hard-coded to
 * Smart Loan Analyzer; the author is rendered as the same Organization since
 * the guides are first-party editorial content.
 */
export function buildArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
}: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: 'Smart Loan Analyzer',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Smart Loan Analyzer',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/opengraph-image`,
      },
    },
  };
}
