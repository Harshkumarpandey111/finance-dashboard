import { Moon, Sun, Shield, Eye } from 'lucide-react';
import useStore from '../store/useStore';

function RoleButton({ active, onClick, icon, label, activeColor }) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-2 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200',
        active
          ? `bg-[var(--bg-surface)] ${activeColor} shadow-[0_1px_4px_rgba(0,0,0,0.08)]`
          : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
      ].join(' ')}
    >
      {icon}{label}
    </button>
  );
}

function CurrencySwitcher({ currency, setCurrency }) {
  return (
    <div className="flex items-center rounded-lg p-1 gap-0.5 bg-[var(--bg-surface-alt)]">
      {['INR', 'USD'].map(c => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={[
            'px-2.5 py-3 rounded-md text-sm font-semibold tracking-wide transition-all duration-200',
            currency === c
              ? 'bg-[var(--bg-surface)] text-[var(--accent-forest)] shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
              : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
          ].join(' ')}
        >
          {c === 'INR' ? '₹' : '$'} {c}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { role, setRole, darkMode, toggleDarkMode, currency, setCurrency } = useStore();

  return (
    <header className="sticky top-0 z-50 border-b transition-theme bg-[var(--bg-surface)] border-[var(--border)] backdrop-blur-md">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--accent-forest)]">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="font-serif text-[1.8rem] tracking-tight text-[var(--text-primary)]">
            Finlens
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <CurrencySwitcher currency={currency} setCurrency={setCurrency} />

          <div className="w-px h-5 bg-[var(--border)]" />

          <div className="flex items-center rounded-lg p-1 gap-0.5 bg-[var(--bg-surface-alt)]">
            <RoleButton
              active={role === 'admin'}
              onClick={() => setRole('admin')}
              icon={<Shield size={12} />}
              label="Admin"
              activeColor="text-[var(--accent-forest)]"
            />
            <RoleButton
              active={role === 'viewer'}
              onClick={() => setRole('viewer')}
              icon={<Eye size={12} />}
              label="Viewer"
              activeColor="text-[var(--accent-terra)]"
            />
          </div>

          <button
            onClick={toggleDarkMode}
            className="btn-press w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-surface-alt)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            {darkMode ? <Sun size={30} /> : <Moon size={30} />}
          </button>
        </div>
      </div>
    </header>
  );
}