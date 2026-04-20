'use client';

import Link from 'next/link';
import Logo from './Logo';
import { useSettingsStore } from '@/store/settingsStore';
import { CURRENCIES } from '@/lib/currencies';

export default function Header() {
  const { currencyCode, setCurrencyCode } = useSettingsStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Logo className="h-5 w-5 text-primary" />
          <span>Smart Loan Analyzer</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <select
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            className="text-sm bg-transparent border border-input rounded-md px-2 py-1 text-foreground hover:border-ring focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            aria-label="Select currency"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.symbol}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}
