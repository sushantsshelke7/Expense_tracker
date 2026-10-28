export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Other']

export function validateExpense(title, amount) {
  if (!title.trim()) return 'Add a title to continue.'
  if (amount === '' || !Number.isFinite(Number(amount))) return 'Enter a valid amount.'
  if (Number(amount) <= 0) return 'Amount must be greater than zero.'
  if (Number(amount) > 100000) return 'Amount must be ₹1,00,000 or less.'
  return ''
}

export function calculateTotal(expenses) {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
}
