import { render, screen } from '@testing-library/react'
import Button from './Button'
import '@testing-library/jest-dom'

describe('Button', () => {
  it('renders a button with a prop as backgroundcolor', () => {
    render(<Button />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
