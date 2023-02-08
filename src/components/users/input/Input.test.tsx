import { Input } from '@mui/material'
import { fireEvent, render, screen } from '@testing-library/react'

import { act } from 'react-dom/test-utils'

test('input comonent', async () => {
  render(<Input placeholder="input" />)

  await act(async () => {
    // mozna dac id inputowi i szukac elementu po id
    const input = screen.getByPlaceholderText(/input/i)

    fireEvent.change(input, { target: { value: 'hello' } })
    expect(input).toHaveDisplayValue('hello')
  })

  // mozna potestowac pokazywanie/ukrywanie hasla
})
