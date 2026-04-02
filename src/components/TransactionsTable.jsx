import { useState } from 'react';
import {
  Search, ChevronUp, ChevronDown,
  Download, ChevronsUpDown
} from 'lucide-react';
import useStore from '../store/useStore';
import { CATEGORIES } from '../data/transactions';
import { CATEGORY_COLORS } from '../constants/theme';
import { formatCurrency, formatDate, exportToCSV, exportToJSON } from '../utils/helpers';

/* Category Badge */
function CategoryBadge({ category }) {
  const color = CATEGORY_COLORS[category] || '#9B958E';

  return (
    <span
      className="text-sm font-medium px-2.5 py-1 rounded-full inline-block"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      {category}
    </span>
  );
}

/* Sort Icon */
function SortIcon({ field, current, direction }) {
  if (current !== field) return <ChevronsUpDown size={12} className="text-[var(--border)]" />;
  return direction === 'asc'
    ? <ChevronUp size={12} className="text-[var(--accent-forest)]" />
    : <ChevronDown size={12} className="text-[var(--accent-forest)]" />;
}

const selectClass = `
  px-3 py-2.5 rounded-xl text-sm outline-none appearance-none
  bg-[var(--bg-surface-alt)] text-[var(--text-primary)] cursor-pointer
`;

export default function TransactionsTable() {
  const [showExport, setShowExport] = useState(false);

  const {
    currency,
    searchQuery, filterCategory, filterType,
    sortField, sortDirection,
    setSearchQuery, setFilterCategory, setFilterType, setSortField,
    getFilteredTransactions,
  } = useStore();

  const filtered = getFilteredTransactions();

  const COLUMNS = [
    { label: 'Date', field: 'date' },
    { label: 'Description', field: null },
    { label: 'Category', field: null },
    { label: 'Type', field: null },
    { label: 'Amount', field: 'amount' },
  ];

  return (
    <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)]">

      {/* Toolbar */}
      <div className="p-4 sm:p-5 border-b border-[var(--border)]">
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search transactions…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-transparent focus:border-[var(--accent-forest)]"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className={selectClass}>
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className={selectClass}>
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Export */}
            <div className="relative">
              <button
                onClick={() => setShowExport(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-surface-alt)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <Download size={13} /> Export
              </button>

              {showExport && (
                <div className="absolute right-0 top-full mt-1.5 rounded-xl shadow-lg z-10 overflow-hidden min-w-[130px] bg-[var(--bg-surface)] border border-[var(--border)]">
                  <button
                    onClick={() => { exportToCSV(filtered); setShowExport(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--bg-surface-alt)]"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => { exportToJSON(filtered); setShowExport(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--bg-surface-alt)]"
                  >
                    Export JSON
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {COLUMNS.map(col => (
                <th
                  key={col.label}
                  className="px-5 py-3 text-left"
                  onClick={() => col.field && setSortField(col.field)}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
                      {col.label}
                    </span>
                    {col.field && <SortIcon field={col.field} current={sortField} direction={sortDirection} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-[var(--bg-surface-alt)]">

                <td className="px-5 py-4 text-[0.95rem] text-[var(--text-secondary)]">
                  {formatDate(tx.date)}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">
                  {tx.description}
                </td>

                <td className="px-5 py-4">
                  <CategoryBadge category={tx.category} />
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm font-semibold capitalize px-2.5 py-1 rounded-full bg-[var(--bg-surface-alt)]">
                    {tx.type}
                  </span>
                </td>

                <td className="px-5 py-4 font-serif text-[1.05rem] font-semibold tabular-nums">
                  {tx.type === 'income' ? '+' : '−'}
                  {formatCurrency(tx.amount, false, currency)}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}