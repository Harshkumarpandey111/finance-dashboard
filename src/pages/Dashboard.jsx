import SummaryCards   from '../components/SummaryCards';
import BalanceChart   from '../components/BalanceChart';
import ExpenseDonut   from '../components/ExpenseDonut';
import TransactionsTable from '../components/TransactionsTable';
import InsightsPanel  from '../components/InsightsPanel';
import RecentActivity from '../components/RecentActivity';
import useStore       from '../store/useStore';

export default function Dashboard() {
  const role = useStore(s => s.role);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7 space-y-6">

      {/* Viewer banner */}
      {role === 'viewer' && (
        <div className="rounded-xl px-4 py-3 flex items-center gap-2 animate-fade-in bg-[rgba(192,105,74,0.08)] border border-[rgba(192,105,74,0.18)]">
          <span className="text-sm font-semibold text-[var(--accent-terra)]">Viewer mode</span>
          <span className="text-sm text-[var(--text-secondary)]">— Switch to Admin to add or edit transactions.</span>
        </div>
      )}

      <div className="flex justify-end">
        <span className="text-xs text-[var(--text-secondary)]/80">Last updated: just now</span>
      </div>

      {/* Row 1 — Summary cards */}
      <SummaryCards />

      {/* Row 2 — Charts (balanced layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        <div className="md:col-span-2 xl:col-span-6"><BalanceChart /></div>
        <div className="xl:col-span-3"><ExpenseDonut /></div>
        <div className="xl:col-span-3"><RecentActivity /></div>
      </div>

      {/* Row 3 — Transactions + Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
        <div className="xl:col-span-2 space-y-2.5">
          {/* Section heading — xl, prominent */}
          <h2 className="text-xl font-semibold text-[var(--text-primary)] px-0.5">Transactions</h2>
          <TransactionsTable />
        </div>
        <div className="space-y-2.5">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] px-0.5">Insights</h2>
          <InsightsPanel />
        </div>
      </div>

    </main>
  );
}
