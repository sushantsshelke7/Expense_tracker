import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

describe('Expense tracker', () => {
  it('filters expenses and updates visible count and total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText(/what was it for/i), 'Lunch')
    await user.type(screen.getByLabelText(/amount/i), '250')
    await user.selectOptions(document.querySelector('[data-cy="category"]'), 'Food')
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    await user.type(screen.getByLabelText(/what was it for/i), 'Cab')
    await user.type(screen.getByLabelText(/amount/i), '400')
    await user.selectOptions(document.querySelector('[data-cy="category"]'), 'Travel')
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    await user.selectOptions(screen.getByLabelText(/filter by category/i), 'Food')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.queryByText('Cab')).not.toBeInTheDocument()
    expect(document.querySelector('[data-cy="count"]')).toHaveTextContent('1 expense')
    expect(document.querySelector('[data-cy="total"]')).toHaveTextContent('250.00')
  })

  it('deletes an expense and returns the total to zero', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText(/what was it for/i), 'Tea')
    await user.type(screen.getByLabelText(/amount/i), '5')
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    await user.click(screen.getByRole('button', { name: 'Delete Tea' }))
    expect(screen.queryByText('Tea')).not.toBeInTheDocument()
    expect(document.querySelector('[data-cy="total"]')).toHaveTextContent('0.00')
    expect(document.querySelector('[data-cy="count"]')).toHaveTextContent('0 expenses')
  })

  it('does not display an invalid negative amount', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText(/what was it for/i), 'Invalid')
    await user.type(screen.getByLabelText(/amount/i), '-8')
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    expect(screen.queryByText('Invalid')).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(/greater than zero/i)
  })
})
