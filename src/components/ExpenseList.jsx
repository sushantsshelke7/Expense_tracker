import ExpenseItem from './ExpenseItem.jsx'

/** Props: visible expense records and onDelete(id). It has no local state. */
export default function ExpenseList({ expenses, onDelete }) {
  if (!expenses.length) return <div className="empty-state"><span className="empty-icon">◌</span><h3>A little breathing room.</h3><p>Your expenses will find a home here.</p></div>
  return <ul className="expense-list">{expenses.map(expense => <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />)}</ul>
}
