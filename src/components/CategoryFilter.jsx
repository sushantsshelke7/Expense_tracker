import { CATEGORIES } from '../lib/expenses.js'

/** Props: selected category and onChange callback. No local state. */
export default function CategoryFilter({ value, onChange }) {
  return <label className="filter-control"><span className="sr-only">Filter by category</span><select data-cy="filter" value={value} onChange={event => onChange(event.target.value)}><option>All</option>{CATEGORIES.map(category => <option key={category}>{category}</option>)}</select><span className="chevron" aria-hidden="true">⌄</span></label>
}
