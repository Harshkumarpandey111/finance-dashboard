import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useStore from '../store/useStore';
import { getCategoryExpenses, formatCurrency } from '../utils/helpers';
import { DONUT_PALETTE } from '../constants/theme';

const CustomTooltip = ({ active, payload, currency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2.5 shadow-lg bg-[var(--bg-surface)] border border-[var(--border)]">
      <p className="text-xs font-semibold mb-0.5 text-[var(--text-primary)]">{payload[0].name}</p>
      <p className="text-base font-serif" style={{ color: payload[0].payload.fill }}>
        {formatCurrency(payload[0].value, false, currency)}
      </p>
    </div>
  );
};

export default function ExpenseDonut() {
  const transactions = useStore(s => s.transactions);
  const currency     = useStore(s => s.currency);
  const data  = getCategoryExpenses(transactions);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-2xl p-5 animate-fade-in-delay-4 bg-[var(--bg-surface)] border border-[var(--border)]">
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-0.5">Expense Breakdown</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-5">By category</p>

      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%"
              innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={DONUT_PALETTE[i % DONUT_PALETTE.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip currency={currency} />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-[var(--text-secondary)]">Total</p>
          <p className="font-serif text-lg font-medium text-[var(--text-primary)]">
            {formatCurrency(total, true, currency)}
          </p>
        </div>
      </div>

      {/* Legend */}
<div className="mt-4 space-y-3">
  {data.slice(0, 5).map((item, i) => {
    const color = DONUT_PALETTE[i % DONUT_PALETTE.length];
    const pct   = ((item.value / total) * 100).toFixed(1);

    return (
      <div key={item.name} className="flex items-center justify-between">

        {/* LEFT: dot + label */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-[var(--text-secondary)] truncate">
            {item.name}
          </span>
        </div>

        {/* RIGHT: amount + % */}
        <div className="flex items-center gap-3 ml-3">
          <span className="text-sm text-[var(--text-secondary)] tabular-nums">
            {formatCurrency(item.value, true, currency)}
          </span>
          <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)] w-10 text-right">
            {pct}%
          </span>
        </div>

      </div>
    );
  })}
</div>    </div>
  );
}
