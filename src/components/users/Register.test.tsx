import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import user from '@testing-library/user-event'
import Register from './Register'

describe('Register', () => {
  describe('register valid', () => {
    test('corresct input', async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      )
      const name = screen.getByPlaceholderText(/enter name/i)
      act(() => {
        user.type(name, 'artur')
      })
      expect(name).toHaveDisplayValue('artur')

      const email = screen.getByPlaceholderText(/enter email/i)
      act(() => {
        user.type(email, 'art@wp.pl')
      })
      expect(email).toHaveDisplayValue('art@wp.pl')

      const password = screen.getByPlaceholderText(/enter password/i)
      act(() => {
        user.type(password, '123456')
      })
      expect(password).toHaveDisplayValue('123456')

      const confirmPassword = screen.getByPlaceholderText(
        /enter confirmpassword/i
      )
      act(() => {
        user.type(confirmPassword, '123456')
      })
      expect(confirmPassword).toHaveDisplayValue('123456')
      act(() => {
        fireEvent.blur(confirmPassword)
      })

      const phoneNumber = screen.getByPlaceholderText(/enter photo number/i)
      act(() => {
        user.type(phoneNumber, '500100100')
      })
      expect(phoneNumber).toHaveDisplayValue('500100100')

      const btn = screen.getByRole('button', {
        name: /submit/i,
      })
      expect(btn).toHaveTextContent('Submit')
      await act(async () => {
        fireEvent.click(btn)
      })

      expect(btn).toHaveTextContent('Submit')
    })
  })
  describe('register invalid', () => {
    test('error  input', async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      )
      const name = screen.getByPlaceholderText(/enter name/i)
      act(() => {
        user.type(name, 'ar')
      })
      expect(name).toHaveDisplayValue('ar')
      act(() => {
        fireEvent.blur(name)
      })
      const textName = await waitFor(() =>
        screen.getByText(/First name must be at least 4 characters long/i)
      )
      expect(textName).toHaveTextContent(
        'First name must be at least 4 characters long'
      )

      const email = screen.getByPlaceholderText(/enter email/i)
      act(() => {
        user.type(email, 'art.pl')
      })
      expect(email).toHaveDisplayValue('art.pl')
      act(() => {
        fireEvent.blur(email)
      })
      const textEmail = await waitFor(() =>
        screen.getByText(/enter the correct addres/i)
      )
      expect(textEmail).toHaveTextContent('Enter the correct address')

      const password = screen.getByPlaceholderText(/enter password/i)
      act(() => {
        user.type(password, 'art')
      })
      expect(password).toHaveDisplayValue('art')
      act(() => {
        fireEvent.blur(password)
      })
      // const textPassword = await waitFor(() =>
      //   screen.getByText(/password is too short/i)
      // )
      // expect(textPassword).toHaveTextContent('Password is too short')

      const confirmPassword = screen.getByPlaceholderText(
        /enter confirmpassword/i
      )
      act(() => {
        user.type(confirmPassword, 'art')
      })
      expect(confirmPassword).toHaveDisplayValue('art')
      act(() => {
        fireEvent.blur(confirmPassword)
      })

      // const textCPassword = await waitFor(() =>
      //   screen.getByText(/password is too short/i)
      // )
      // expect(textCPassword).toHaveTextContent('Password is too short')

      const phoneNumber = screen.getByPlaceholderText(/enter photo number/i)
      act(() => {
        user.type(phoneNumber, 'art')
      })
      expect(phoneNumber).toHaveDisplayValue('art')
      act(() => {
        fireEvent.blur(phoneNumber)
      })
      const textPhoneNumber = await waitFor(() =>
        screen.getByText(/string must contain at least 6 character\(s\)/i)
      )
      expect(textPhoneNumber).toHaveTextContent(
        'String must contain at least 6 character(s)'
      )
    })
  })
})
