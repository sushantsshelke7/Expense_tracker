import { useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import { calculateTotal, formatCurrency } from './lib/expenses.js'

const dateLabel = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [filter, setFilter] = useState('All')
  const visibleExpenses = useMemo(() => filter === 'All' ? expenses : expenses.filter(item => item.category === filter), [expenses, filter])
  const total = calculateTotal(visibleExpenses)

  return <main className="app-shell">
    <header className="topbar"><a className="brand" href="#top" aria-label="Spend home"><span className="brand-mark">s</span><span>spend<span className="brand-period">.</span></span></a><div className="topbar-right"><span className="quiet-status"><span className="status-dot" /> ALL IN ORDER</span><div className="avatar" aria-label="Your account">S</div></div></header>
    <section className="intro" id="top"><div><span className="eyebrow">PERSONAL FINANCE <span className="intro-dot">·</span> {dateLabel.toUpperCase()}</span><h1>Make room for<br /><em>what matters.</em></h1><p>A clearer picture of where your money goes.</p></div><div className="intro-orbit" aria-hidden="true"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="orbit-center">₹</span><span className="orbit-spark">✳</span></div></section>
    <section className="dashboard" aria-label="Expense tracker">
      <div className="ledger-column"><div className="summary-card"><div className="summary-top"><span className="eyebrow">{filter === 'All' ? 'TOTAL SPENDING' : `${filter.toUpperCase()} SPENDING`}</span><span className="summary-period">THIS PERIOD <span>⌄</span></span></div><div className="total-line" data-cy="total">{formatCurrency(total)}</div><div className="summary-bottom"><span><span className="summary-indicator">↗</span> Keep your plans in view</span><span className="count-pill" data-cy="count">{visibleExpenses.length} {visibleExpenses.length === 1 ? 'expense' : 'expenses'}</span></div><div className="summary-decoration" aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></div>
        <div className="list-panel"><div className="list-heading"><div><span className="eyebrow">YOUR ACTIVITY</span><h2>Recent expenses</h2></div><CategoryFilter value={filter} onChange={setFilter} /></div><ExpenseList expenses={visibleExpenses} onDelete={id => setExpenses(current => current.filter(item => item.id !== id))} /></div>
        <footer className="footer"><span>Made for a little more clarity.</span><span>Spend <span className="brand-period">●</span></span></footer>
      </div>
      <aside className="form-column"><ExpenseForm onAdd={expense => setExpenses(current => [expense, ...current])} /><div className="tip-card"><span className="tip-icon">✦</span><div><strong>Small steps add up.</strong><p>Tracking is the first step toward spending with intention.</p></div></div></aside>
    </section>
  </main>
}
