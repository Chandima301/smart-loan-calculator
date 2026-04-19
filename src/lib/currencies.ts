export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs.' },
  { code: 'USD', name: 'US Dollar',         symbol: '$'   },
  { code: 'EUR', name: 'Euro',              symbol: '€'   },
  { code: 'GBP', name: 'British Pound',     symbol: '£'   },
  { code: 'INR', name: 'Indian Rupee',      symbol: '₹'   },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$'  },
  { code: 'CAD', name: 'Canadian Dollar',   symbol: 'CA$' },
  { code: 'SGD', name: 'Singapore Dollar',  symbol: 'S$'  },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM'  },
  { code: 'AED', name: 'UAE Dirham',        symbol: 'AED' },
  { code: 'JPY', name: 'Japanese Yen',      symbol: '¥'   },
  { code: 'CHF', name: 'Swiss Franc',       symbol: 'Fr.' },
  { code: 'NZD', name: 'New Zealand Dollar',symbol: 'NZ$' },
  { code: 'ZAR', name: 'South African Rand',symbol: 'R'   },
  { code: 'PKR', name: 'Pakistani Rupee',   symbol: '₨'   },
  { code: 'BDT', name: 'Bangladeshi Taka',  symbol: '৳'   },
];

export const DEFAULT_CURRENCY = 'LKR';
