import React from "react";
import Button from "@mui/material/Button";
import { Send } from "@mui/icons-material";

type Props = {
  children: React.ReactNode;
};
const SubmitButton = ({ children, ...props }: Props) => {
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      endIcon={<Send />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
