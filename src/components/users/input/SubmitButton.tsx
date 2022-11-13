import React from "react";
import Button from "@mui/material/Button";

type Props = {
  children: React.ReactNode;
};
const SubmitButton = ({ children, ...props }: Props) => {
  return (
    <Button type="submit" size="large" {...props}>
      {children}
    </Button>
  );
};

export default SubmitButton;
