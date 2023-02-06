import { Input } from '@mui/material'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

test('input comonent', async () => {
  render(<Input placeholder="input" />)

  await act(async () => {
    const input = screen.getByPlaceholderText(/input/i)
    userEvent.type(input, '13:58')
    fireEvent.change(input, { target: { value: 'hello' } })
    // expect(input).toHa
    // expect(input).to oHaveDisplayValue('13:58')
  })
})
