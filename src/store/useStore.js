import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../data/transactions';

const useStore = create(
  persist(
    (set, get) => ({
      // Data
      transactions: initialTransactions,

      // UI State
      role:            'admin',
      darkMode:        false,
      currency:        'INR',        // ← new: 'INR' | 'USD'
      searchQuery:     '',
      filterCategory:  'all',
      filterType:      'all',
      sortField:       'date',
      sortDirection:   'desc',

      // Actions
      setRole:            (role)    => set({ role }),
      toggleDarkMode:     ()        => set(s => ({ darkMode: !s.darkMode })),
      setCurrency:        (c)       => set({ currency: c }),
      setSearchQuery:     (q)       => set({ searchQuery: q }),
      setFilterCategory:  (c)       => set({ filterCategory: c }),
      setFilterType:      (t)       => set({ filterType: t }),
      setSortField:       (field)   => set(s => ({
        sortField:     field,
        sortDirection: s.sortField === field && s.sortDirection === 'asc' ? 'desc' : 'asc',
      })),

      addTransaction:    (tx)       => set(s => ({ transactions: [tx, ...s.transactions] })),
      editTransaction:   (id, upd)  => set(s => ({
        transactions: s.transactions.map(t => t.id === id ? { ...t, ...upd } : t),
      })),
      deleteTransaction: (id)       => set(s => ({
        transactions: s.transactions.filter(t => t.id !== id),
      })),

      // Derived
      getFilteredTransactions: () => {
        const { transactions, searchQuery, filterCategory, filterType, sortField, sortDirection } = get();
        let result = [...transactions];
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          result = result.filter(t =>
            t.description.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
          );
        }
        if (filterCategory !== 'all') result = result.filter(t => t.category === filterCategory);
        if (filterType     !== 'all') result = result.filter(t => t.type     === filterType);
        result.sort((a, b) => {
          const av = sortField === 'date' ? new Date(a.date) : a.amount;
          const bv = sortField === 'date' ? new Date(b.date) : b.amount;
          return sortDirection === 'asc' ? av - bv : bv - av;
        });
        return result;
      },

      getSummary: () => {
        const { transactions } = get();
        const income   = transactions.filter(t => t.type === 'income') .reduce((s, t) => s + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        return { income, expenses, balance: income - expenses };
      },
    }),
    {
      name: 'finance-dashboard-store-v2',   // bump key to avoid stale persisted data
      partialState: (state) => ({
        transactions: state.transactions,
        role:         state.role,
        darkMode:     state.darkMode,
        currency:     state.currency,
      }),
    }
  )
);

export default useStore;
