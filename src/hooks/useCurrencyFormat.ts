import { useCallback } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import { formatCurrency } from '@/lib/formatters';

export function useCurrencyFormat() {
  const currencyCode = useSettingsStore((s) => s.currencyCode);
  return useCallback(
    (value: number) => formatCurrency(value, currencyCode),
    [currencyCode]
  );
}
