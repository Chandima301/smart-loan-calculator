import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_CURRENCY } from '@/lib/currencies';

interface SettingsState {
  currencyCode: string;
  setCurrencyCode: (code: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currencyCode: DEFAULT_CURRENCY,
      setCurrencyCode: (currencyCode) => set({ currencyCode }),
    }),
    { name: 'loan-settings' }
  )
);
