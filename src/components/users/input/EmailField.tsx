import React from "react";
import { TextField } from "@mui/material";
import { Path, UseFormRegister } from "react-hook-form";
import { RegisterSchemaType } from "../../../hooks/RegisterSchema";

type InputProps = {
  label: Path<RegisterSchemaType>;
  register: UseFormRegister<RegisterSchemaType>;
  required: boolean;
  defaultValue: string;
  error?: boolean;
  helperText: string | undefined;
  placeholder: string;
};
const EmailField = ({
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

export default EmailField;
