// ─── Currency formatting ──────────────────────────────────────
// Supported currencies with their config
export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', locale: 'en-IN',  rate: 1,     label: 'INR' },
  USD: { code: 'USD', symbol: '$', locale: 'en-US',  rate: 0.012,  label: 'USD' },
};

// The base data is in INR. USD is derived via mock rate.
export function formatCurrency(amountINR, compact = false, currencyCode = 'INR') {
  const { code, locale, rate } = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const amount = amountINR * rate;

  if (compact) {
    if (amount >= 10_000_000) { // 1 Cr+
      return `${CURRENCIES[currencyCode].symbol}${(amount / 10_000_000).toFixed(1)}Cr`;
    }
    if (amount >= 100_000) { // 1 L+
      return `${CURRENCIES[currencyCode].symbol}${(amount / 100_000).toFixed(1)}L`;
    }
    if (amount >= 1_000) {
      return `${CURRENCIES[currencyCode].symbol}${(amount / 1_000).toFixed(1)}K`;
    }
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
}

// Axis tick formatter (no symbol duplication in INR)
export function formatAxisTick(amountINR, currencyCode = 'INR') {
  const { symbol, rate } = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const amount = amountINR * rate;
  if (amount >= 100_000) return `${symbol}${(amount / 100_000).toFixed(0)}L`;
  if (amount >= 1_000)   return `${symbol}${(amount / 1_000).toFixed(0)}K`;
  return `${symbol}${amount.toFixed(0)}`;
}

// ─── Date formatting ──────────────────────────────────────────
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

// ─── Export utils ─────────────────────────────────────────────
export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (INR)'];
  const rows = transactions.map(t => [t.date, t.description, t.category, t.type, t.amount]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'transactions.csv'; a.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (transactions) => {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'transactions.json'; a.click();
  URL.revokeObjectURL(url);
};

// ─── Data derivation ─────────────────────────────────────────
export const getCategoryExpenses = (transactions) => {
  const map = {};
  transactions.forEach(t => {
    if (t.type === 'expense')
      map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyTotals = (transactions) => {
  const monthly = {};
  transactions.forEach(t => {
    const month = t.date.slice(0, 7);
    if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
    monthly[month][t.type] += t.amount;
  });
  return Object.entries(monthly)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      income:  Math.round(data.income),
      expense: Math.round(data.expense),
    }));
};

export const generateId = () => Math.random().toString(36).slice(2, 9);
