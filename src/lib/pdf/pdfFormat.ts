/**
 * PDF-safe money formatting.
 *
 * The on-screen UI uses `formatCurrency` (currency *symbol*, e.g. `$`, `₹`),
 * which is fine for HTML where the browser font always has the glyph. A PDF
 * embeds no fonts by default, so jsPDF's built-in Helvetica cannot render
 * `₹`, `€` in some positions, etc. — they come out as `☐` boxes.
 *
 * The fix is `currencyDisplay: 'code'`, which renders the ISO code instead
 * of the symbol: `USD 3,160.34`, `INR 1,23,456.00`, `EUR 1.234,56`. Every
 * character is plain ASCII / Latin-1, so it is glyph-safe across all 17
 * supported currencies with no embedded fonts.
 */

/** Format a number as `"<CODE> <grouped amount>"` — glyph-safe for PDF. */
export function pdfMoney(value: number, currencyCode = 'USD'): string {
  const safe = Number.isFinite(value) ? value : 0;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'code',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safe);
  } catch {
    // Unknown currency code — fall back to a plain grouped number + code.
    return `${currencyCode} ${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safe)}`;
  }
}

/** Rounded variant (no decimals) — used for large summary totals. */
export function pdfMoneyRounded(value: number, currencyCode = 'USD'): string {
  const safe = Number.isFinite(value) ? value : 0;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(safe));
  } catch {
    return `${currencyCode} ${new Intl.NumberFormat('en-US').format(
      Math.round(safe),
    )}`;
  }
}

/** `120` → `"10 yr"`, `126` → `"10 yr 6 mo"`, `7` → `"7 mo"`. */
export function pdfMonths(months: number): string {
  const m = Math.max(0, Math.round(months));
  const years = Math.floor(m / 12);
  const rem = m % 12;
  if (years === 0) return `${rem} mo`;
  if (rem === 0) return `${years} yr`;
  return `${years} yr ${rem} mo`;
}
