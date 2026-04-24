export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar',          symbol: '$'   },
  { code: 'EUR', name: 'Euro',               symbol: '€'   },
  { code: 'GBP', name: 'British Pound',      symbol: '£'   },
  { code: 'CAD', name: 'Canadian Dollar',    symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar',  symbol: 'A$'  },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'CHF', name: 'Swiss Franc',        symbol: 'Fr.' },
  { code: 'JPY', name: 'Japanese Yen',       symbol: '¥'   },
  { code: 'SGD', name: 'Singapore Dollar',   symbol: 'S$'  },
  { code: 'AED', name: 'UAE Dirham',         symbol: 'AED' },
  { code: 'INR', name: 'Indian Rupee',       symbol: '₹'   },
  { code: 'MYR', name: 'Malaysian Ringgit',  symbol: 'RM'  },
  { code: 'PKR', name: 'Pakistani Rupee',    symbol: '₨'   },
  { code: 'BDT', name: 'Bangladeshi Taka',   symbol: '৳'   },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R'   },
  { code: 'LKR', name: 'Sri Lankan Rupee',   symbol: 'Rs.' },
];

export const DEFAULT_CURRENCY = 'USD';
