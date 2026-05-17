/**
 * Pure, currency-agnostic PDF generator for loan-calculator summaries.
 *
 * All values arrive PRE-FORMATTED as strings (the caller uses `pdfMoney`
 * with the user's selected currency code). This module owns layout only —
 * it never touches currency, so it stays glyph-safe and reusable.
 *
 * jspdf + jspdf-autotable are imported DYNAMICALLY inside the generator so
 * they never enter any route's initial JS bundle — matching the project's
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
  /** e.g. "Mortgage Calculator — Summary" */
  documentTitle: string;
  /** Pre-formatted date string, e.g. "18 May 2026". */
  generatedOn: string;
  /** Inputs + results blocks; caller pre-formats every value. */
  sections: PdfSection[];
  /** Optional amortization table (standard calculators only). */
  table?: PdfTable;
  /** Filename stem → `${fileSlug}-loan-summary.pdf`. */
  fileSlug: string;
  /** Optional override for the footer disclaimer line. */
  disclaimer?: string;
}

const BRAND = 'Smart Loan Analyzer';
const SITE = 'smartloanalyzer.com';
const DEFAULT_DISCLAIMER =
  'Estimates for planning only — not financial advice. Verify figures with your lender.';

// A4 portrait in mm.
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 14;
const CONTENT_W = PAGE_W - MARGIN * 2;

const COLOR_TEXT: [number, number, number] = [17, 24, 39]; // slate-900
const COLOR_MUTED: [number, number, number] = [107, 114, 128]; // slate-500
const COLOR_RULE: [number, number, number] = [209, 213, 219]; // slate-300
const COLOR_PRIMARY: [number, number, number] = [37, 99, 235]; // blue-600

export async function downloadLoanSummaryPdf(
  input: LoanSummaryPdfInput,
): Promise<void> {
  const [{ jsPDF: JsPDF }, autoTableMod] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);
  const autoTable = autoTableMod.default;

  const doc = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  let y = MARGIN;

  // ---- Brand header --------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...COLOR_PRIMARY);
  doc.text(BRAND, MARGIN, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_MUTED);
  doc.text(SITE, PAGE_W - MARGIN, y + 2, { align: 'right' });

  y += 7;
  doc.setDrawColor(...COLOR_RULE);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 9;

  // ---- Document title + generated-on --------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...COLOR_TEXT);
  doc.text(input.documentTitle, MARGIN, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_MUTED);
  doc.text(`Generated on ${input.generatedOn} · ${SITE}`, MARGIN, y);
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
    doc.text(section.heading, MARGIN, y);
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
      doc.text(row.label, MARGIN, y);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLOR_TEXT);
      doc.text(row.value, PAGE_W - MARGIN, y, { align: 'right' });
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
    doc.text(input.table.title, MARGIN, y);
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
    doc.text(disclaimer, MARGIN, PAGE_H - 11);
    doc.text(
      `Page ${p} of ${totalPages}`,
      PAGE_W - MARGIN,
      PAGE_H - 11,
      { align: 'right' },
    );
    doc.text(`${BRAND} · ${SITE}`, MARGIN, PAGE_H - 7);
  }

  doc.save(`${input.fileSlug}-loan-summary.pdf`);
}
