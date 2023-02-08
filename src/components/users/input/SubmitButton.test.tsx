import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import SubmitButton from './SubmitButton'

test('submitButton', async () => {
  await act(async () => {
    //  const onClick = jest.fn()
    render(<SubmitButton id="button">Button</SubmitButton>)

    // mozna po ID szukac, jak juz przekazujesz wyzej ID
    const divElement = screen.getByText(/Button/i)

    fireEvent.click(divElement)
    expect(divElement).toHaveTextContent('Button')
    // tutaj onCLick jakby byl przekazany to na nim mozna sledzic odpalenie jesli jest zamockowany jako jest.fn()
    // expect(divElement).toHaveBeenCalledTimes(0)
  })
})
