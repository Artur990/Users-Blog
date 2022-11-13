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
  id: string;
  placeholder: string;
  type: string;
};
const inputProps = {
  step: 300,
};

const PhotoNumberField = ({
  label,
  register,
  placeholder,
  type,
  ...props
}: InputProps) => {
  return (
    <TextField
      autoFocus
      margin="normal"
      variant="standard"
      type="string"
      fullWidth
      placeholder={placeholder}
      inputProps={inputProps}
      {...register(label, { required: true })}
      {...props}
    />
  );
};

export default PhotoNumberField;
