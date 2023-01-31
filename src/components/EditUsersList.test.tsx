import { render, screen } from "@testing-library/react";
import EditUsersList from "./EditUsersList";

test("render edit users list", () => {
  const editUser = {
    email: "art@wp.pl",
    isAdmin: false,
    name: "Art",
    password: "123456",
    phoneNumber: "121212",
    photoURL: "",
    uid: "12121121212",
    id: "12",
  };

  render(<EditUsersList {...editUser} />);
  const inputName = screen.getByPlaceholderText(editUser.name);
  const inputEmail = screen.getByPlaceholderText(editUser.email);
  const inputPassword = screen.getByPlaceholderText(editUser.password);
  const inputNumber = screen.getByPlaceholderText(editUser.phoneNumber);
  expect(inputName).toBeInTheDocument();
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
});
