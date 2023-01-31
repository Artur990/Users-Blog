import React from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const Input = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      setShowPassword(!showPassword);
    };
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
