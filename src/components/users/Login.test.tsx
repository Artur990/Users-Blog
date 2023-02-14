import { render, fireEvent, screen, act, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

describe('Login', () => {
  describe('with valid inputs', () => {
    test('test login', async () => {
      const email = screen.getByPlaceholderText(/enter e-mail\.\.\.\./i)
      act(() => {
        user.type(email, 'emailtest.pl')
      })
      expect(email).toHaveDisplayValue('emailtest.pl')

      const password = screen.getByPlaceholderText(
        /enter the password\.\.\.\./i
      )
      act(() => {
        fireEvent.change(password, { target: { value: '123' } })
      })
      expect(password).toHaveDisplayValue('123')

      const btn = screen.getByText(/Submit/i)
      expect(btn).toHaveTextContent('Submit')
      await act(async () => {
        fireEvent.submit(btn)
      })
    })
  })
  describe('with invalid data', () => {
    test('renders an email validation error', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      const email = screen.getByPlaceholderText(/enter e-mail\.\.\.\./i)
      act(() => {
        user.type(email, 'emailtest.pl')
      })
      expect(email).toHaveDisplayValue('emailtest.pl')
      act(() => {
        fireEvent.blur(email)
      })
      const text = await waitFor(() =>
        screen.getByText(/enter the correct addres/i)
      )
      expect(text).toHaveTextContent('Enter the correct addres')

      const password = screen.getByPlaceholderText(
        /enter the password\.\.\.\./i
      )
      act(() => {
        fireEvent.change(password, { target: { value: '123' } })
      })
      expect(password).toHaveDisplayValue('123')
      act(() => {
        fireEvent.blur(password)
      })

      const text2 = await waitFor(() =>
        screen.getByText(/Password is too short/i)
      )
      expect(text2).toHaveTextContent('Password is too shor')
    })
  })
})
