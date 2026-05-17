/**
 * Pure, currency-agnostic PDF generator for loan-calculator summaries.
 *
 * All values arrive PRE-FORMATTED as strings (the caller uses `pdfMoney`
 * with the user's selected currency code). This module owns layout only -
 * it never touches currency, so it stays glyph-safe and reusable.
 *
 * jspdf + jspdf-autotable are imported DYNAMICALLY inside the generator so
 * they never enter any route's initial JS bundle - matching the project's
 * existing `dynamic()` performance discipline.
 */

export interface PdfSection {
  heading: string;
  rows: { label: string; value: string }[];
}

export interface PdfTable {
  title: string;
  head: string[];
  body: string[][];
}

export interface LoanSummaryPdfInput {
  /** e.g. "Mortgage Calculator - Summary" */
  documentTitle: string;
  /** Pre-formatted date string, e.g. "18 May 2026". */
  generatedOn: string;
  /** Inputs + results blocks; caller pre-formats every value. */
  sections: PdfSection[];
  /** Optional amortization table (standard calculators only). */
  table?: PdfTable;
  /** Filename stem -> `${fileSlug}-loan-summary.pdf`. */
  fileSlug: string;
  /** Optional override for the footer disclaimer line. */
  disclaimer?: string;
}

const BRAND = 'Smart Loan Analyzer';
const SITE = 'smartloanalyzer.com';
const DOT = ' - '; // ASCII separator (avoids U+00B7 middle dot)
const DEFAULT_DISCLAIMER =
  'Estimates for planning only - not financial advice. Verify figures with your lender.';

// A4 portrait in mm.
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 14;
const CONTENT_W = PAGE_W - MARGIN * 2;

const COLOR_TEXT: [number, number, number] = [17, 24, 39]; // slate-900
const COLOR_MUTED: [number, number, number] = [107, 114, 128]; // slate-500
const COLOR_RULE: [number, number, number] = [209, 213, 219]; // slate-300
const COLOR_PRIMARY: [number, number, number] = [37, 99, 235]; // blue-600

/**
 * jsPDF's built-in Helvetica uses WinAnsi encoding (no embedded fonts).
 * Common typographic Unicode - the minus sign U+2212, multiplication
 * sign, smart quotes, bullets, en/em dashes - is NOT in WinAnsi, so
 * jsPDF mangles any line containing it (the glyph turns into `"` and the
 * rest of the line gets letter-spaced). Map every such character to a
 * WinAnsi-safe ASCII equivalent, then drop anything else outside the
 * Latin-1 range. Keyed by code point and written with \u escapes so the
 * table cannot be corrupted by source re-encoding. Applied centrally so
 * no caller can reintroduce the bug.
 */
const CHAR_MAP: Record<number, string> = {
  0x2212: '-', // minus sign  (the main offender in the reported bug)
  0x2013: '-', // en dash
  0x2014: '-', // em dash
  0x2010: '-', // hyphen
  0x2011: '-', // non-breaking hyphen
  0x00d7: 'x', // multiplication sign
  0x00f7: '/', // division sign
  0x2022: '-', // bullet
  0x00b7: '-', // middle dot
  0x2018: "'", // left single quote
  0x2019: "'", // right single quote
  0x201c: '"', // left double quote
  0x201d: '"', // right double quote
  0x2026: '...', // ellipsis
  0x2248: '~', // almost equal to
  0x2260: '!=', // not equal to
  0x2264: '<=', // less-than or equal
  0x2265: '>=', // greater-than or equal
  0x00a0: ' ', // non-breaking space
  0x2009: ' ', // thin space
  0x202f: ' ', // narrow no-break space
  0x200b: '', // zero-width space
};

/** Make a string safe for jsPDF's WinAnsi built-in font. */
function sanitize(text: string): string {
  let out = '';
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    if (cp in CHAR_MAP) {
      out += CHAR_MAP[cp];
    } else if (cp <= 0xff) {
      // Latin-1 / WinAnsi range - safe for the built-in Helvetica.
      out += ch;
    }
    // Any other code point would corrupt the line - drop it.
  }
  return out;
}

function sanitizeInput(input: LoanSummaryPdfInput): LoanSummaryPdfInput {
  return {
    documentTitle: sanitize(input.documentTitle),
    generatedOn: sanitize(input.generatedOn),
    sections: input.sections.map((s) => ({
      heading: sanitize(s.heading),
      rows: s.rows.map((r) => ({
        label: sanitize(r.label),
        value: sanitize(r.value),
      })),
    })),
    table: input.table
      ? {
          title: sanitize(input.table.title),
          head: input.table.head.map(sanitize),
          body: input.table.body.map((row) => row.map(sanitize)),
        }
      : undefined,
    fileSlug: input.fileSlug,
    disclaimer:
      input.disclaimer !== undefined ? sanitize(input.disclaimer) : undefined,
  };
}

export async function downloadLoanSummaryPdf(
  rawInput: LoanSummaryPdfInput,
): Promise<void> {
  const input = sanitizeInput(rawInput);
  const [{ jsPDF: JsPDF }, autoTableMod] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);
  const autoTable = autoTableMod.default;

  const doc = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Final safety net: every string actually drawn passes through sanitize,
  // including composed strings (footer, "Generated on ...") that never
  // went through sanitizeInput.
  const text = (
    s: string,
    x: number,
    yPos: number,
    opts?: Parameters<typeof doc.text>[3],
  ) => doc.text(sanitize(s), x, yPos, opts);

  let y = MARGIN;

  // ---- Brand header --------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...COLOR_PRIMARY);
  text(BRAND, MARGIN, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_MUTED);
  text(SITE, PAGE_W - MARGIN, y + 2, { align: 'right' });

  y += 7;
  doc.setDrawColor(...COLOR_RULE);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 9;

  // ---- Document title + generated-on --------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...COLOR_TEXT);
  text(input.documentTitle, MARGIN, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_MUTED);
  text(`Generated on ${input.generatedOn}${DOT}${SITE}`, MARGIN, y);
  y += 10;

  // ---- Sections ------------------------------------------------------
  const LINE_H = 6.2;
  const SECTION_GAP = 6;
  const BOTTOM_LIMIT = PAGE_H - 22; // leave room for footer

  const ensureSpace = (needed: number) => {
    if (y + needed > BOTTOM_LIMIT) {
      doc.addPage();
      y = MARGIN;
    }
  };

  for (const section of input.sections) {
    ensureSpace(LINE_H * 2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...COLOR_PRIMARY);
    text(section.heading, MARGIN, y);
    y += 2;
    doc.setDrawColor(...COLOR_RULE);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 5;

    doc.setFontSize(10);
    for (const row of section.rows) {
      ensureSpace(LINE_H);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLOR_MUTED);
      text(row.label, MARGIN, y);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLOR_TEXT);
      text(row.value, PAGE_W - MARGIN, y, { align: 'right' });
      y += LINE_H;
    }
    y += SECTION_GAP;
  }

  // ---- Optional amortization table ----------------------------------
  if (input.table && input.table.body.length > 0) {
    ensureSpace(LINE_H * 3);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...COLOR_PRIMARY);
    text(input.table.title, MARGIN, y);
    y += 3;

    autoTable(doc, {
      head: [input.table.head],
      body: input.table.body,
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      tableWidth: CONTENT_W,
      styles: {
        font: 'helvetica',
        fontSize: 7.5,
        cellPadding: 1.4,
        textColor: COLOR_TEXT,
        lineColor: COLOR_RULE,
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: COLOR_PRIMARY,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'right',
      },
      columnStyles: { 0: { halign: 'left' } },
      bodyStyles: { halign: 'right' },
      alternateRowStyles: { fillColor: [243, 244, 246] },
      theme: 'grid',
    });
  }

  // ---- Footer on every page -----------------------------------------
  const disclaimer = input.disclaimer ?? DEFAULT_DISCLAIMER;
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(...COLOR_RULE);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, PAGE_H - 16, PAGE_W - MARGIN, PAGE_H - 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLOR_MUTED);
    text(disclaimer, MARGIN, PAGE_H - 11);
    text(`Page ${p} of ${totalPages}`, PAGE_W - MARGIN, PAGE_H - 11, {
      align: 'right',
    });
    text(`${BRAND}${DOT}${SITE}`, MARGIN, PAGE_H - 7);
  }

  doc.save(`${input.fileSlug}-loan-summary.pdf`);
}
