import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import SubmitButton from './SubmitButton'

test('submitButton', async () => {
  await act(async () => {
    //  const onClick = jest.fn()
    render(<SubmitButton id="button">Button</SubmitButton>)

    const divElement = screen.getByText(/Button/i)

    fireEvent.click(divElement)
    expect(divElement).toHaveTextContent('Button')
    // expect(divElement).toHaveBeenCalledTimes(0)
  })
})
