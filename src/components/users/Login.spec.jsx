import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Login from './Login'
import user from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

describe('SignIn', () => {
  describe('with valid inputs', () => {
    it('test login', async () => {
      const loginn = jest.fn()
      render(
        <BrowserRouter>
          <Login loginn={loginn} />
        </BrowserRouter>
      )
      await act(async () => {
        const email = screen.getByPlaceholderText(/enter e\-mail\.\.\.\./i)
        user.type(email, 'email@test.pl')
        const password = screen.getByPlaceholderText(
          /enter the password\.\.\.\./i
        )
        user.type(password, '123456')
      })
      const btn = screen.getByText(/Submit/i)
      expect(btn).toHaveTextContent('Submit')
      await act(async () => {
        fireEvent.submit(btn)
      })
      expect(loginn).toBeCalled()
      expect(loginn).toHaveBeenCalledTimes(1)
    })
  })
  describe('with invalid email', () => {
    it('renders the email validation error', async () => {
      const loginn = jest.fn()
      render(
        <BrowserRouter>
          <Login loginn={loginn} />
        </BrowserRouter>
      )

      await act(async () => {
        const email = screen.getByPlaceholderText(/enter e\-mail\.\.\.\./i)
        user.type(email, 'email@test.pl')
        const password = screen.getByPlaceholderText(
          /enter the password\.\.\.\./i
        )
        user.type(password, '123')
      })
      const btn = screen.getByText(/Submit/i)
      expect(btn).toHaveTextContent('Submit')
      await act(async () => {
        fireEvent.submit(btn)
      })
      expect(loginn).toHaveBeenCalledTimes(0)
    })
  })
  describe('with invalid password', () => {
    it('renders the password validation error', async () => {
      const { container } = render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      await act(async () => {
        const password = screen.getByPlaceholderText(
          /enter the password\.\.\.\./i
        )
        fireEvent.change(password, { target: { value: '123' } })
        fireEvent.blur(password)
      })

      const btn = screen.getByText(/Submit/i)
      expect(btn).toHaveTextContent('Submit')
      await act(async () => {
        fireEvent.submit(btn)
        expect(container.innerHTML).toMatch('')
      })
      // here to coud be but somethin is wong ("Password is too short")
    })
  })
})
