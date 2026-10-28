import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpenseForm from './ExpenseForm.jsx'

describe('ExpenseForm', () => {
  it('adds a valid expense and clears the draft', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ExpenseForm onAdd={onAdd} />)
    await user.type(screen.getByLabelText(/what was it for/i), 'Coffee')
    await user.type(screen.getByLabelText(/amount/i), '4.5')
    await user.selectOptions(screen.getByLabelText(/category/i), 'Food')
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ title: 'Coffee', amount: 4.5, category: 'Food' }))
    expect(screen.getByLabelText(/what was it for/i)).toHaveValue('')
  })

  it('rejects an empty title', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ExpenseForm onAdd={onAdd} />)
    await user.type(screen.getByLabelText(/amount/i), '10')
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    expect(onAdd).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/title/i)
  })
})
