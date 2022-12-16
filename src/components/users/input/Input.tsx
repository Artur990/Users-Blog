import React, { HtmlHTMLAttributes, ReactElement } from "react";
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
import { LoginSchemaType } from "../../../hooks/LoginSchema";

type InputProps = {
  error: any;
  helperText: any;
  // margin: TextFieldProps["margin"];
  // variant: TextFieldProps["variant"];
} & TextFieldProps;

// const Input = ({ register, label, type, ...props }: InputProps)

const Input = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      setShowPassword(!showPassword);
    };
    console.log("hej");
    return (
      <TextField
        type={showPassword ? "text" : type}
        margin="normal"
        variant="standard"
        autoFocus
        fullWidth
        ref={ref}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {label === "password" && (
                <IconButton
                  aria-label="Toggle Password visibility"
                  onClick={handleClick}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        {...props}
      />
    );
  }
);

export default Input;
