import { createElement } from 'react';
import { Lightbulb, TrendingDown, TrendingUp, BarChart2, Award, PiggyBank } from 'lucide-react';
import useStore from '../store/useStore';
import { getCategoryExpenses, getMonthlyTotals, formatCurrency, formatAxisTick } from '../utils/helpers';
import { CHART_COLORS, gridStroke } from '../constants/theme';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ChartTooltip = ({ active, payload, label, currency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg px-3 py-2.5 shadow-md bg-[var(--bg-surface)] border border-[var(--border)]">
      <p className="text-sm mb-1.5 font-semibold text-[var(--text-secondary)]">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="text-sm font-medium">
          {p.name}: {formatCurrency(p.value, true, currency)}
        </p>
      ))}
    </div>
  );
};

function Highlight({ children, color = 'var(--accent-forest)' }) {
  return <strong className="font-semibold" style={{ color }}>{children}</strong>;
}

function InsightCard({ Icon, iconColor, iconBg, title, children }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-[var(--bg-surface-alt)]">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: iconBg }}
      >
        {createElement(Icon, { size: 15, style: { color: iconColor } })}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-wider mb-1 text-[var(--text-secondary)]">
          {title}
        </p>
        <p className="text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
          {children}
        </p>
      </div>
    </div>
  );
}

export default function InsightsPanel() {
  const transactions = useStore(s => s.transactions);
  const darkMode     = useStore(s => s.darkMode);
  const currency     = useStore(s => s.currency);

  const catExpenses = getCategoryExpenses(transactions);
  const topCategory = catExpenses[0];
  const monthly     = getMonthlyTotals(transactions);
  const latestMonth = monthly[monthly.length - 1];
  const prevMonth   = monthly[monthly.length - 2];

  const latestIncome  = latestMonth?.income ?? 0;
  const latestExpense = latestMonth?.expense ?? 0;
  const latestSavings = latestIncome - latestExpense;

  const savingsRate = latestIncome > 0
    ? (latestSavings / latestIncome) * 100
    : 0;

  const savingsRateLabel = savingsRate.toFixed(1);
  const savingsGood = savingsRate >= 20;

  const expenseChange = latestMonth && prevMonth && prevMonth.expense > 0
    ? ((latestExpense - prevMonth.expense) / prevMonth.expense) * 100
    : null;

  const expenseChangeLabel = expenseChange != null ? Math.abs(expenseChange).toFixed(1) : null;
  const expensesUp = expenseChange != null && expenseChange > 0;

  const smartRecommendation = (() => {
    if (latestExpense > latestIncome) {
      return {
        iconColor: 'var(--danger)',
        iconBg: 'rgba(179,90,59,0.12)',
        message: 'Expenses are higher than income this month. Prioritize essentials and trim non-critical spends next month.',
      };
    }

    if (savingsRate < 20) {
      return {
        iconColor: '#8B7355',
        iconBg: 'rgba(139,115,85,0.12)',
        message: 'Your savings rate is below 20%. Try moving at least a small fixed amount to savings right after income comes in.',
      };
    }

    if (savingsRate > 40) {
      return {
        iconColor: 'var(--success)',
        iconBg: 'rgba(87,127,98,0.12)',
        message: 'Excellent discipline. You saved over 40% this month. Keep this momentum and consider investing a part of the surplus.',
      };
    }

    return {
      iconColor: 'var(--text-secondary)',
      iconBg: 'rgba(128,128,128,0.12)',
      message: 'You are on a balanced track this month. Keep expenses steady and continue consistent saving habits.',
    };
  })();

  return (
    <div className="space-y-4">

      {/* Chart */}
      <div className="rounded-2xl p-5 bg-[var(--bg-surface)] border border-[var(--border)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart2 size={15} className="text-[var(--text-secondary)]" />
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Monthly Comparison</h3>
          </div>

          {expenseChange != null && (
            <span className={[
              'text-sm font-semibold px-2 py-0.5 rounded-full flex items-center gap-1',
              expensesUp
                ? 'bg-[rgba(179,90,59,0.12)] text-[var(--danger)]'
                : 'bg-[rgba(87,127,98,0.12)] text-[var(--success)]',
            ].join(' ')}>
              {expensesUp ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}
              {expenseChangeLabel}%
            </span>
          )}
        </div>

        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke(darkMode)} vertical={false} />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 13, fill: 'var(--text-secondary)' }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 13, fill: 'var(--text-secondary)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => formatAxisTick(v, currency)}
            />

            <Tooltip content={<ChartTooltip currency={currency} />} cursor={{ fill: 'transparent' }} />

            <Bar dataKey="income" fill={CHART_COLORS.moss} radius={[3,3,0,0]} />
            <Bar dataKey="expense" fill={CHART_COLORS.terra} radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly savings highlight */}
      {latestMonth && (
        <div className="rounded-2xl p-4 bg-[rgba(87,127,98,0.08)] border border-[rgba(87,127,98,0.2)]">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            💰 You saved{' '}
            <Highlight color="var(--success)">
              {formatCurrency(latestSavings, true, currency)}
            </Highlight>{' '}
            this month
          </p>
        </div>
      )}

      {/* Insights */}
      <div className="rounded-2xl p-5 bg-[var(--bg-surface)] border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={14} className="text-[var(--text-secondary)]" />
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Smart Insights</h3>
        </div>

        <div className="space-y-3">

          {topCategory && (
            <InsightCard
              Icon={Award}
              iconColor={CHART_COLORS.terra}
              iconBg="rgba(192,105,74,0.12)"
              title="Top Category"
            >
              <Highlight color={CHART_COLORS.terra}>{topCategory.name}</Highlight> leads at{' '}
              <Highlight color={CHART_COLORS.terra}>
                {formatCurrency(topCategory.value, true, currency)}
              </Highlight>
            </InsightCard>
          )}

          {expenseChange != null && (
            <InsightCard
              Icon={expensesUp ? TrendingUp : TrendingDown}
              iconColor={expensesUp ? 'var(--danger)' : 'var(--success)'}
              iconBg={expensesUp ? 'rgba(179,90,59,0.12)' : 'rgba(87,127,98,0.12)'}
              title="Monthly Trend"
            >
              Expenses {expensesUp ? 'rose' : 'dropped'} by{' '}
              <Highlight color={expensesUp ? 'var(--danger)' : 'var(--success)'}>
                {expenseChangeLabel}%
              </Highlight>
            </InsightCard>
          )}

          {latestMonth && (
            <InsightCard
              Icon={PiggyBank}
              iconColor={savingsGood ? 'var(--success)' : '#8B7355'}
              iconBg={savingsGood ? 'rgba(87,127,98,0.12)' : 'rgba(139,115,85,0.12)'}
              title="Savings Rate"
            >
              Saved{' '}
              <Highlight color={savingsGood ? 'var(--success)' : 'var(--accent-terra)'}>
                {savingsRateLabel}%
              </Highlight>
            </InsightCard>
          )}

          {latestMonth && (
            <InsightCard
              Icon={Lightbulb}
              iconColor={smartRecommendation.iconColor}
              iconBg={smartRecommendation.iconBg}
              title="Smart Recommendation"
            >
              {smartRecommendation.message}
            </InsightCard>
          )}

        </div>
      </div>
    </div>
  );
}