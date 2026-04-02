import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { balanceTrend } from '../data/transactions';
import { formatCurrency, formatAxisTick } from '../utils/helpers';
import { CHART_COLORS, gridStroke } from '../constants/theme';
import useStore from '../store/useStore';

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 shadow-lg bg-[var(--bg-surface)] border border-[var(--border)]">
      <p className="text-xs mb-1 text-[var(--text-secondary)] font-medium">{label}</p>
      <p className="font-serif text-xl text-[var(--accent-forest)]">
        {formatCurrency(payload[0].value, false, currency)}
      </p>
    </div>
  );
};

export default function BalanceChart() {
  const darkMode = useStore(s => s.darkMode);
  const currency = useStore(s => s.currency);

  return (
    <div className="rounded-2xl p-5 animate-fade-in-delay-3 bg-[var(--bg-surface)] border border-[var(--border)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          {/* Improved heading size */}
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Balance Trend</h3>
          <p className="text-sm mt-0.5 text-[var(--text-secondary)]">Last 6 months</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[rgba(90,138,106,0.12)] text-[var(--success)]">
          ↑ 28.2%
        </span>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={balanceTrend} margin={{ top: 5, right: 5, bottom: 0, left: 4 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={CHART_COLORS.forest} stopOpacity={0.14} />
              <stop offset="95%" stopColor={CHART_COLORS.forest} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke(darkMode)} vertical={false} />
          {/* Larger axis ticks for readability */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: 'var(--text-secondary)', fontFamily: 'DM Sans', fontWeight: 500 }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--text-secondary)', fontFamily: 'DM Sans' }}
            axisLine={false} tickLine={false}
            tickFormatter={v => formatAxisTick(v, currency)}
            width={48}
          />
          <Tooltip
            content={<CustomTooltip currency={currency} />}
            cursor={{ stroke: CHART_COLORS.forest, strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone" dataKey="balance"
            stroke={CHART_COLORS.forest} strokeWidth={2.5}
            fill="url(#balanceGrad)"
            dot={{ fill: CHART_COLORS.forest, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: CHART_COLORS.forest, strokeWidth: 2, stroke: 'var(--bg-surface)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
