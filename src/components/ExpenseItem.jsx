import { formatCurrency } from '../lib/expenses.js'

/** Props: expense record and onDelete(id); the parent owns all expense state. */
export default function ExpenseItem({ expense, onDelete }) {
  const badge = { Food: 'food', Travel: 'travel', Bills: 'bills', Other: 'other' }[expense.category]
  return <li className="expense-row" data-cy="expense-item"><div className={`category-mark ${badge}`} aria-hidden="true">{expense.category === 'Food' ? '✳' : expense.category === 'Travel' ? '↗' : expense.category === 'Bills' ? '▤' : '◌'}</div><div className="expense-copy"><span className="expense-title">{expense.title}</span><span className="expense-meta">{expense.category}</span></div><strong className="expense-amount">{formatCurrency(expense.amount)}</strong><button className="delete-button" onClick={() => onDelete(expense.id)} aria-label={`Delete ${expense.title}`} data-cy="delete-expense">×</button></li>
}
