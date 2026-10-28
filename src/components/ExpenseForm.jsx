import { useState } from 'react'
import { CATEGORIES, validateExpense } from '../lib/expenses.js'

/** Props: onAdd(expense). Local state owns the draft fields and validation message. */
export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Other')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    const message = validateExpense(title, amount)
    setError(message)
    if (message) return
    onAdd({ id: crypto.randomUUID(), title: title.trim(), amount: Number(amount), category })
    setTitle('')
    setAmount('')
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-heading"><div><span className="eyebrow">NEW ENTRY</span><h2>Add an expense</h2></div><span className="form-icon" aria-hidden="true">＋</span></div>
      <label className="field"><span>What was it for?</span><input data-cy="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sunday coffee" autoComplete="off" /></label>
      <div className="field-row">
        <label className="field"><span>Amount</span><div className="amount-input"><span aria-hidden="true">₹</span><input data-cy="amount" type="number" min="0.01" max="100000" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" /></div></label>
        <label className="field"><span>Category</span><select data-cy="category" value={category} onChange={e => setCategory(e.target.value)}>{CATEGORIES.map(item => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p className="form-error" role="alert" aria-live="polite">{error}</p>
      <button className="primary-button" data-cy="add-expense" type="submit">Add expense <span aria-hidden="true">↗</span></button>
      <p className="form-note">Your spending, thoughtfully organized.</p>
    </form>
  )
}
