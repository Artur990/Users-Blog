import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  IconButton,
  // Input,
} from "@mui/material";
import { Close, Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PasswordFiled1 from "./input/PasswordFiled1";
import SubmitButton from "./input/SubmitButton";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useAuth } from "../../context/AuthContext";
import EmailField1 from "./input/EmailField1";
import Input from "./input/Input";
const Login: React.FC = () => {
  const { handleGoogleLogin } = useAuth();
  const navigate = useNavigate();
  const {
    form: {
      handleLoginUser,
      formState: { errors },
      register,
    },
  } = useLoginUser({
    onSuccess: () => {
      // toast.success("zarejestrowano");
    },
    onError: () => {
      toast.error("coś poszło nie tak");
    },
  });
  return (
    <>
      <Dialog
        open={true}
        // onClose={handleClose}
      >
        <DialogTitle>
          Login
          <IconButton
            aria-label="Close"
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
            {/* close */}
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleLoginUser}>
          <DialogContent dividers>
            <DialogContentText>
              Pleace enter your email and password
            </DialogContentText>
            <Input
              margin="normal"
              variant="standard"
              id="email"
              type="email"
              label="email"
              name="email"
              register={register}
              required={true}
              placeholder="Wpisz adres e-mail"
              error={!!errors.email?.message}
              helperText={errors.email && errors.email.message}
            />
            <Input
              margin="normal"
              variant="standard"
              id="password"
              label="password"
              name="password"
              register={register}
              required={true}
              type="password"
              placeholder="Wpisz hasło"
              error={!!errors.password?.message}
              helperText={errors.password && errors.password.message}
            />
          </DialogContent>

          <DialogActions sx={{ justifyContent: "space-between", px: "19px" }}>
            <Button size="small">Forgot Password?</Button>
            <SubmitButton>Submit</SubmitButton>
            {/* <SubmitButton onClick={handleSubmit} />  */}
          </DialogActions>
        </form>
        <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
          Don't you have an account? Create one now
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </DialogActions>
        <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
          <Button
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Login;
