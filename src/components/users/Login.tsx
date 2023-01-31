import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close, Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import SubmitButton from "./input/SubmitButton";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useAuth } from "../../context/AuthContext";
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
      toast.success("You have been logged in");
    },
    onError: () => {
      toast.error("Somethink wnet wrong");
    },
  });

  return (
    <>
      <Dialog open={true}>
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
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleLoginUser}>
          <DialogContent dividers>
            <DialogContentText>
              Pleace enter your email and password
            </DialogContentText>
            <Input
              id="email"
              type="email"
              label="email"
              {...register("email", { required: true })}
              placeholder="Wpisz adres e-mail"
              error={!!errors.email?.message}
              helperText={errors.email && errors.email.message}
            />
            <Input
              id="password"
              label="password"
              {...register("password", { required: true })}
              type="password"
              placeholder=""
              defaultValue=""
              error={!!errors.password?.message}
              helperText={errors.password && errors.password.message}
            />
          </DialogContent>

          <DialogActions sx={{ justifyContent: "space-between", px: "19px" }}>
            <Button size="small">Forgot Password?</Button>
            <SubmitButton id="button">Submit</SubmitButton>
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
