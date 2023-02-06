import { fireEvent, render, screen } from '@testing-library/react'
import SubmitButton from './SubmitButton'
import { act } from 'react-dom/test-utils'

test('submitButton', async () => {
  await act(async () => {
    //  const onClick = jest.fn()
    render(<SubmitButton id="button">Button</SubmitButton>)

    const divElement = screen.getByText(/Button/i)

    fireEvent.click(divElement)
  })

  // expect(onClick).toHaveBeenCalledTimes(0)

  // expect(divElement).toHaveTextContent('Button')
})
