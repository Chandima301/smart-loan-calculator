/**
 * "Featured on" / "Launched on" directory badges row in the footer.
 *
 * To add a new directory badge:
 *
 * 1. Get the embed code from the directory (Tiny Startups, BetaList, etc.).
 *    Most provide a self-contained HTML snippet with inline styles.
 * 2. Add a new entry to the `BADGES` array below with the directory's name
 *    and the raw HTML embed string.
 * 3. Push. The footer will render the new badge automatically alongside
 *    the existing ones.
 *
 * For badges that come as a simple `<a><img></a>` rather than a full HTML
 * snippet, you can use either form — `dangerouslySetInnerHTML` accepts any
 * valid HTML.
 *
 * Empty BADGES array = the section is hidden entirely (zero visual cost).
 */

interface BadgeConfig {
  /** Used as the React key + a fallback aria-label. Pick something unique. */
  name: string;
  /** Raw HTML embed code provided by the directory. Rendered via
   *  `dangerouslySetInnerHTML`, so trust only first-party directory snippets. */
  html: string;
}

const BADGES: BadgeConfig[] = [
  {
    name: 'Fazier',
    html: `<a href="https://fazier.com/launches/smartloanalyzer.com" target="_blank" rel="noopener"><img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=neutral" width="120" alt="Fazier badge" /></a>`,
  },
  {
    name: 'Tiny Startups',
    html: `<a href="https://www.tinystartups.com/startup/smart-loan-analyzer" target="_blank" rel="noopener"
   style="display:inline-flex;flex-direction:column;align-items:center;gap:8px;padding:22px 28px 20px;border-radius:18px;text-decoration:none;font-family:'Inter',system-ui,sans-serif;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#3525E6,#D81FE0,#22B8F0) border-box;border:2.5px solid transparent;width:220px;text-align:center;color:#0E0B1F">
  <span style="font-family:monospace;font-size:9px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#6A6585">Launched on</span>
  <svg width="76" height="76" viewBox="0 0 100 100">
    <defs><linearGradient id="tsg2" x1=".1" y1="0" x2=".9" y2="1">
      <stop offset="0%" stop-color="#3525E6"/><stop offset="55%" stop-color="#D81FE0"/><stop offset="100%" stop-color="#22B8F0"/>
    </linearGradient></defs>
    <path d="M50 6C52 32 68 48 94 50C68 52 52 68 50 94C48 68 32 52 6 50C32 48 48 32 50 6Z" fill="url(#tsg2)"/>
  </svg>
  <span style="font-size:22px;font-weight:800;letter-spacing:-0.025em;color:#0E0B1F;line-height:1.1">Smart Loan Analyzer</span>
  <span style="font-family:monospace;font-size:10px;color:#6A6585">May 9, 2026</span>
  <span style="font-size:11px;font-weight:600;color:#0E0B1F;margin-top:10px;padding-top:12px;border-top:1px solid #ECEAF3;width:100%;display:flex;align-items:center;justify-content:center;gap:6px">
    <svg width="14" height="14" viewBox="0 0 100 100"><defs><linearGradient id="tsgm" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0%" stop-color="#3525E6"/><stop offset="55%" stop-color="#D81FE0"/><stop offset="100%" stop-color="#22B8F0"/></linearGradient></defs><path d="M50 6C52 32 68 48 94 50C68 52 52 68 50 94C48 68 32 52 6 50C32 48 48 32 50 6Z" fill="url(#tsgm)"/></svg> tinystartups
  </span>
</a>`,
  },
];

export default function FeaturedOn() {
  if (BADGES.length === 0) return null;

  return (
    <div className="border-t mt-6 pt-6">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        Featured on
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {BADGES.map(({ name, html }) => (
          // Each directory's embed code defines its own dimensions and styling.
          // We render it as-is so verification crawlers see exactly what the
          // directory expects. The flex parent above just lays them out on a row.
          <div key={name} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </div>
    </div>
  );
}
