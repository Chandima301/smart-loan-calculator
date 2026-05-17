'use client';

import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LoanSummaryPdfInput } from '@/lib/pdf/loanSummaryPdf';

interface Props {
  /**
   * Lazily builds the PDF input — invoked ONLY on click, so the
   * (potentially 360-row) amortization array is never constructed on
   * every render, and the jspdf chunk stays out of the initial bundle.
   */
  getInput: () => LoanSummaryPdfInput;
}

export default function DownloadPdfButton({ getInput }: Props) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const { downloadLoanSummaryPdf } = await import('@/lib/pdf/loanSummaryPdf');
      await downloadLoanSummaryPdf(getInput());
    } catch {
      // PDF generation failed (rare) — fail silently; user can retry.
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={busy}
      className="gap-1.5 text-xs h-7"
      aria-label="Download PDF summary"
    >
      {busy ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Generating…</span>
        </>
      ) : (
        <>
          <FileDown className="h-3.5 w-3.5" />
          <span>Download PDF</span>
        </>
      )}
    </Button>
  );
}
