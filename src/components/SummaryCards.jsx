import { createElement } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import useStore from '../store/useStore';
import { formatCurrency } from '../utils/helpers';
import { CHART_COLORS } from '../constants/theme';
import { balanceTrend } from '../data/transactions';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const CARDS = [
  { label: 'Total Balance',  key: 'balance',  Icon: Wallet,       color: CHART_COLORS.forest, trend: 8.2,  delay: 1, extraClass: 'sm:pt-6', showSparkline: true  },
  { label: 'Total Income',   key: 'income',   Icon: TrendingUp,   color: CHART_COLORS.moss,   trend: 5.4,  delay: 2, extraClass: '',         showSparkline: false },
  { label: 'Total Expenses', key: 'expenses', Icon: TrendingDown, color: CHART_COLORS.terra,  trend: -2.1, delay: 3, extraClass: 'sm:pb-6', showSparkline: false },
];

function TrendBadge({ trend }) {
  const up = trend >= 0;
  return (
    <span className={[
      'flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full tabular-nums select-none',
      up ? 'bg-[rgba(87,127,98,0.12)] text-[var(--success)]'
         : 'bg-[rgba(179,90,59,0.12)] text-[var(--danger)]',
    ].join(' ')}>
      {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {Math.abs(trend)}%
    </span>
  );
}

function MiniSparkline({ color }) {
  return (
    <div className="mt-4 -mx-1 h-10 opacity-50">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={balanceTrend} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor={color} stopOpacity={0.2} />
              <stop offset="90%" stopColor={color} stopOpacity={0}   />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="balance" stroke={color} strokeWidth={1.5}
            fill="url(#cardGrad)" dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SummaryCard({ label, amount, Icon, color, trend, delay, extraClass, showSparkline, currency }) {
  return (
    <div className={[
      'rounded-2xl p-5 card-hover animate-fade-in-delay-' + delay,
      'bg-[var(--bg-surface)] border border-[var(--border)]',
      extraClass,
    ].join(' ')}>
      <div className="flex items-start justify-between mb-3">
        <div className="icon-glow w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ backgroundColor: `${color}1a` }}>
          {createElement(Icon, { size: 25, style: { color } })}
        </div>
        <TrendBadge trend={trend} />
      </div>
      {/* Label — readable size */}
      <p className="text-sm font-medium mb-1 text-[var(--text-secondary)]">{label}</p>
      {/* Amount — larger, prominent */}
      <p className="font-serif text-[1.6rem] leading-tight tracking-tight text-[var(--text-primary)]">
        {formatCurrency(amount, true, currency)}
      </p>
      {showSparkline && <MiniSparkline color={color} />}
    </div>
  );
}

export default function SummaryCards() {
  const getSummary = useStore(s => s.getSummary);
  const currency   = useStore(s => s.currency);
  const summary    = getSummary();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {CARDS.map(({ key, ...props }) => (
        <SummaryCard key={key} amount={summary[key]} currency={currency} {...props} />
      ))}
    </div>
  );
}
