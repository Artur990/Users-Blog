import React, { ReactElement } from "react";
import { any, z } from "zod";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { RegisterSchemaType } from "../../../hooks/RegisterSchema";
interface InputProps {}
interface Label {
  email: string;
  password: string;
}
interface Label2 {
  email: string;
  password: string;
  name?: string | undefined;
  confirmPassword?: string | null;
  photoNumber?: string | null;
}
// interface Labels extends Label2, Label {}

interface InputProps {
  // extends React.PropsWithRef<JSX.IntrinsicElements["input"]>
  // extends React.PropsWithRef<HTMLInputElement>
  // label: string | ReactElement;
  error?: boolean;
  helperText?: any;
  step?: 300;
  label: any;
  register: any;
  required?: boolean;
  defaultValue?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  margin: TextFieldProps["margin"];
  variant: TextFieldProps["variant"];
  name?: string;
}

// const Input = ({ register, label, type, ...props }: InputProps)

const Input = ({ type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowPassword(!showPassword);
  };
  // if (typeof register === UseFormRegister) {
  //
  // if('confirmPassword' in register)

  return (
    <input
      type={showPassword ? "text" : type}
      // placeholder={placeholder}
      autoFocus
      // fullWidth
      {...props}
      // {...register(label, { required: true })}
    />
  );
};

export default Input;
