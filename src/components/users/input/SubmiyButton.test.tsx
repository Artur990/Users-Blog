import { fireEvent, render, screen } from "@testing-library/react";
import SubmitButton from "./SubmitButton";

test("handles onClick", () => {
  // const onClick = jest.fn() onSubmit={onClick}
  render(<SubmitButton id="button">Button</SubmitButton>);
  const divElement = screen.getByText(/Button/i);
  //   fireEvent.click(divElement);
  //   expect(divElement).toHav;
});
