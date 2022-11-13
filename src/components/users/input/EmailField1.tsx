import React from "react";
import { TextField } from "@mui/material";
import { Path, UseFormRegister } from "react-hook-form";
import { LoginSchemaType } from "../../../hooks/LoginSchema";

type InputProps = {
  label: Path<LoginSchemaType>;
  register: UseFormRegister<LoginSchemaType>;
  required: boolean;
  defaultValue: string;
  error?: boolean;
  helperText: string | undefined;
  placeholder: string;
};

const EmailField1 = ({
  placeholder,
  defaultValue,
  register,
  label,
  ...props
}: InputProps) => {
  return (
    <TextField
      autoFocus
      margin="normal"
      variant="standard"
      id="email"
      type="email"
      fullWidth
      placeholder={placeholder}
      {...props}
      {...register(label, { required: true })}
      defaultValue={defaultValue}
    />
  );
};

export default EmailField1;
