import { fireEvent, render, screen } from '@testing-library/react'

import SubmitButton from './SubmitButton'

test('submitButton', () => {
  render(<SubmitButton id="button">Submit</SubmitButton>)
  const divElement = screen.getByRole('button', { name: /submit/i })

  fireEvent.submit(divElement)
  expect(divElement).toHaveTextContent('Submit')
})
