export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities', 'Salary', 'Freelance', 'Investment'
];

export const EXPENSE_CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities'
];

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment'];

// All amounts in INR
export const initialTransactions = [
  { id: '1',  date: '2025-01-05', description: 'Monthly Salary',       amount: 85000,  category: 'Salary',        type: 'income'  },
  { id: '2',  date: '2025-01-06', description: 'Apartment Rent',        amount: 22000,  category: 'Housing',       type: 'expense' },
  { id: '3',  date: '2025-01-08', description: 'Grocery Store',         amount: 3200,   category: 'Food & Dining', type: 'expense' },
  { id: '4',  date: '2025-01-10', description: 'Freelance Project',     amount: 18000,  category: 'Freelance',     type: 'income'  },
  { id: '5',  date: '2025-01-12', description: 'Metro Pass',            amount: 1200,   category: 'Transport',     type: 'expense' },
  { id: '6',  date: '2025-01-14', description: 'OTT Subscriptions',     amount: 800,    category: 'Entertainment', type: 'expense' },
  { id: '7',  date: '2025-01-15', description: 'Electricity Bill',      amount: 2400,   category: 'Utilities',     type: 'expense' },
  { id: '8',  date: '2025-01-18', description: 'Doctor Visit',          amount: 1500,   category: 'Healthcare',    type: 'expense' },
  { id: '9',  date: '2025-01-19', description: 'Online Shopping',       amount: 4200,   category: 'Shopping',      type: 'expense' },
  { id: '10', date: '2025-01-22', description: 'Dividend Income',       amount: 6500,   category: 'Investment',    type: 'income'  },
  { id: '11', date: '2025-01-24', description: 'Restaurant Dinner',     amount: 1800,   category: 'Food & Dining', type: 'expense' },
  { id: '12', date: '2025-01-28', description: 'Gym Membership',        amount: 1500,   category: 'Healthcare',    type: 'expense' },
  { id: '13', date: '2025-02-05', description: 'Monthly Salary',        amount: 85000,  category: 'Salary',        type: 'income'  },
  { id: '14', date: '2025-02-06', description: 'Apartment Rent',        amount: 22000,  category: 'Housing',       type: 'expense' },
  { id: '15', date: '2025-02-09', description: 'Grocery Store',         amount: 3800,   category: 'Food & Dining', type: 'expense' },
  { id: '16', date: '2025-02-11', description: 'Freelance Project',     amount: 12000,  category: 'Freelance',     type: 'income'  },
  { id: '17', date: '2025-02-13', description: 'Cab Rides',             amount: 1400,   category: 'Transport',     type: 'expense' },
  { id: '18', date: '2025-02-15', description: 'Movie Tickets',         amount: 1200,   category: 'Entertainment', type: 'expense' },
  { id: '19', date: '2025-02-18', description: 'Water & Internet Bill', amount: 2100,   category: 'Utilities',     type: 'expense' },
  { id: '20', date: '2025-02-21', description: 'Clothing Store',        amount: 6500,   category: 'Shopping',      type: 'expense' },
  { id: '21', date: '2025-02-24', description: 'Stock Dividend',        amount: 3200,   category: 'Investment',    type: 'income'  },
  { id: '22', date: '2025-02-26', description: 'Café & Coffee',         amount: 950,    category: 'Food & Dining', type: 'expense' },
  { id: '23', date: '2025-03-05', description: 'Monthly Salary',        amount: 85000,  category: 'Salary',        type: 'income'  },
  { id: '24', date: '2025-03-06', description: 'Apartment Rent',        amount: 22000,  category: 'Housing',       type: 'expense' },
  { id: '25', date: '2025-03-10', description: 'Grocery Store',         amount: 3500,   category: 'Food & Dining', type: 'expense' },
  { id: '26', date: '2025-03-12', description: 'Freelance Design',      amount: 25000,  category: 'Freelance',     type: 'income'  },
  { id: '27', date: '2025-03-14', description: 'Petrol',                amount: 2800,   category: 'Transport',     type: 'expense' },
  { id: '28', date: '2025-03-16', description: 'Concert Tickets',       amount: 3500,   category: 'Entertainment', type: 'expense' },
  { id: '29', date: '2025-03-18', description: 'Phone & Internet',      amount: 1800,   category: 'Utilities',     type: 'expense' },
  { id: '30', date: '2025-03-20', description: 'Pharmacy',              amount: 1200,   category: 'Healthcare',    type: 'expense' },
  { id: '31', date: '2025-03-22', description: 'Amazon Order',          amount: 4800,   category: 'Shopping',      type: 'expense' },
  { id: '32', date: '2025-03-25', description: 'Mutual Fund Return',    amount: 8500,   category: 'Investment',    type: 'income'  },
  { id: '33', date: '2025-03-28', description: 'Weekend Brunch',        amount: 2200,   category: 'Food & Dining', type: 'expense' },
];

// Balance trend in INR
export const balanceTrend = [
  { month: 'Oct', balance: 142000 },
  { month: 'Nov', balance: 158000 },
  { month: 'Dec', balance: 134000 },
  { month: 'Jan', balance: 168000 },
  { month: 'Feb', balance: 152000 },
  { month: 'Mar', balance: 189000 },
];
