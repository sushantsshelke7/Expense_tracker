import { describe, expect, it } from 'vitest'
import { calculateTotal, formatCurrency, validateExpense } from './expenses.js'

describe('validateExpense', () => {
  it('accepts a regular expense', () => expect(validateExpense('Coffee', '4.5')).toBe(''))
  it('rejects an empty title', () => expect(validateExpense('   ', '4')).toMatch(/title/i))
  it('rejects an empty amount', () => expect(validateExpense('Coffee', '')).toMatch(/amount/i))
  it('rejects non numeric amounts', () => expect(validateExpense('Coffee', 'abc')).toMatch(/amount/i))
  it('rejects zero', () => expect(validateExpense('Coffee', '0')).toMatch(/greater than zero/i))
  it('rejects negative values', () => expect(validateExpense('Coffee', '-2')).toMatch(/greater than zero/i))
  it('accepts the upper limit', () => expect(validateExpense('Laptop', '100000')).toBe(''))
  it('rejects amounts over ₹1,00,000', () => expect(validateExpense('Laptop', '100000.01')).not.toBe(''))
})

describe('expense totals and formatting', () => {
  it('sums an empty list to zero', () => expect(calculateTotal([])).toBe(0))
  it('adds numeric amounts', () => expect(calculateTotal([{ amount: 250 }, { amount: '400.5' }])).toBe(650.5))
  it('formats INR with two decimal places', () => expect(formatCurrency(650)).toContain('650.00'))
})
