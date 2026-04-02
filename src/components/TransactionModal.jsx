import { useState } from 'react';
import { X } from 'lucide-react';
import useStore from '../store/useStore';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/transactions';
import { generateId, CURRENCIES } from '../utils/helpers';

const defaultForm = {
  description: '', amount: '', category: 'Food & Dining',
  type: 'expense', date: new Date().toISOString().split('T')[0],
};

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block text-[var(--text-secondary)]">{label}</label>
      {children}
      {error && <p className="text-xs mt-1 text-[var(--danger)]">{error}</p>}
    </div>
  );
}

const inputBase = `
  w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all
  bg-[var(--bg-surface-alt)] text-[var(--text-primary)]
  border border-transparent focus:border-[var(--accent-forest)]
`;

const getInitialForm = (transaction) => (
  transaction
    ? { ...transaction, amount: String(transaction.amount) }
    : defaultForm
);

export default function TransactionModal({ transaction, onClose }) {
  const [form, setForm]     = useState(() => getInitialForm(transaction));
  const [errors, setErrors] = useState({});
  const { addTransaction, editTransaction, currency } = useStore();
  const isEdit = !!transaction;
  const { symbol } = CURRENCIES[currency] || CURRENCIES.INR;

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const setField = (key, val) => {
    setForm(prev => {
      const next = { ...prev, [key]: val };
      if (key === 'type') next.category = val === 'income' ? 'Salary' : 'Food & Dining';
      return next;
    });
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // Amounts stored in INR base; if user is in USD, convert back
    const rate = CURRENCIES[currency]?.rate || 1;
    const amountINR = parseFloat(form.amount) / rate;
    const tx = { ...form, amount: Math.round(amountINR) };
    isEdit ? editTransaction(transaction.id, tx) : addTransaction({ ...tx, id: generateId() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl animate-fade-in bg-[var(--bg-surface)] border border-[var(--border)]">

        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h2 className="font-serif text-xl text-[var(--text-primary)]">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-surface-alt)] hover:text-[var(--text-primary)] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Type */}
          <div>
            <label className="text-sm font-medium mb-2 block text-[var(--text-secondary)]">Type</label>
            <div className="flex gap-2">
              {['expense', 'income'].map(t => {
                const active = form.type === t;
                const style  = t === 'income'
                  ? 'bg-[rgba(90,138,106,0.15)] text-[var(--success)] border-[var(--success)]'
                  : 'bg-[rgba(192,105,74,0.15)] text-[var(--accent-terra)] border-[var(--accent-terra)]';
                return (
                  <button key={t} onClick={() => setField('type', t)}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200 border-[1.5px] ${
                      active ? style : 'bg-[var(--bg-surface-alt)] text-[var(--text-secondary)] border-transparent'
                    }`}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Description" error={errors.description}>
            <input value={form.description} onChange={e => setField('description', e.target.value)}
              placeholder="e.g. Monthly Salary"
              className={`${inputBase} ${errors.description ? 'border-[var(--danger)]' : ''}`} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label={`Amount (${symbol})`} error={errors.amount}>
              <input type="number" min="0" step="1"
                value={form.amount} onChange={e => setField('amount', e.target.value)}
                placeholder={currency === 'INR' ? '0' : '0.00'}
                className={`${inputBase} ${errors.amount ? 'border-[var(--danger)]' : ''}`} />
            </Field>
            <Field label="Date" error={errors.date}>
              <input type="date" value={form.date} onChange={e => setField('date', e.target.value)}
                className={`${inputBase} [color-scheme:light_dark] ${errors.date ? 'border-[var(--danger)]' : ''}`} />
            </Field>
          </div>

          <Field label="Category">
            <select value={form.category} onChange={e => setField('category', e.target.value)}
              className={`${inputBase} appearance-none`}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <div className="flex gap-3 pt-1">
            <button onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-surface-alt)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Cancel
            </button>
            <button onClick={handleSubmit}
              className="btn-press flex-1 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent-forest)] text-white hover:opacity-90 transition-opacity">
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
