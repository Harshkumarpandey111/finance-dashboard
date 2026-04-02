import useStore from '../store/useStore';
import { formatCurrency, formatDate } from '../utils/helpers';
import { CATEGORY_COLORS } from '../constants/theme';
import { ArrowDownLeft, ArrowUpRight, Activity } from 'lucide-react';

const categoryInitial = (cat) => cat.charAt(0).toUpperCase();

function EmptyState() {
  return (
    <div className="py-10 flex flex-col items-center gap-3 text-center">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--bg-surface-alt)]">
        <Activity size={18} className="text-[var(--text-secondary)]" />
      </div>
      <div>
        <p className="text-base font-semibold text-[var(--text-primary)]">No activity yet</p>
        <p className="text-sm mt-0.5 text-[var(--text-secondary)]">Transactions will appear here</p>
      </div>
    </div>
  );
}

function TimelineItem({ tx, isLast, currency }) {
  const isIncome = tx.type === 'income';
  const dotColor = CATEGORY_COLORS[tx.category] || '#9B958E';

  return (
    <div className="timeline-row flex gap-3 group">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: dotColor }}
        >
          {categoryInitial(tx.category)}
        </div>
        {!isLast && <div className="w-px flex-1 mt-1 bg-[var(--border)]" />}
      </div>

      <div className="flex items-start justify-between w-full pb-4">
        <div className="min-w-0 pr-2">
          <p className="text-sm font-medium text-[var(--text-primary)] truncate">
            {tx.description}
          </p>

          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            {/* ✅ Increased date */}
            <span className="text-sm text-[var(--text-secondary)]">
              {formatDate(tx.date)}
            </span>

            {/* ✅ Category tag improved */}
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-surface-alt)] text-[var(--text-secondary)]">
              {tx.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* ✅ Slightly bigger amount */}
          <span className={[
            'font-serif text-[1rem] font-semibold tabular-nums',
            isIncome ? 'text-[var(--success)]' : 'text-[var(--text-primary)]',
          ].join(' ')}>
            {isIncome ? '+' : '−'}{formatCurrency(tx.amount, true, currency)}
          </span>

          <div className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: isIncome ? 'rgba(87,127,98,0.14)' : 'rgba(192,105,74,0.12)' }}>
            {isIncome
              ? <ArrowUpRight size={11} className="text-[var(--success)]" />
              : <ArrowDownLeft size={11} className="text-[var(--accent-terra)]" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecentActivity() {
  const transactions = useStore(s => s.transactions);
  const currency = useStore(s => s.currency);

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="rounded-2xl px-5 pt-5 pb-2 bg-[var(--bg-surface)] border border-[var(--border)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Recent Activity</h3>
          <p className="text-sm mt-0.5 text-[var(--text-secondary)]">Last 5 transactions</p>
        </div>
        <span className="text-sm px-2 py-1 rounded-full bg-[var(--bg-surface-alt)] text-[var(--text-secondary)]">
          {transactions.length} total
        </span>
      </div>

      {recent.length === 0
        ? <EmptyState />
        : recent.map((tx, i) => (
          <TimelineItem key={tx.id} tx={tx} isLast={i === recent.length - 1} currency={currency} />
        ))}
    </div>
  );
}