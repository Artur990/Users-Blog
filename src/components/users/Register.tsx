import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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

import { useAuth } from "../../context/AuthContext";

import SubmitButton from "./input/SubmitButton";

import { useRegisterUser } from "../../hooks/useRegisterUser";

import Input from "./input/Input";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { handleGoogleLogin } = useAuth();
  const {
    form: {
      handleRegisterUser,
      formState: { errors },
      register,
    },
  } = useRegisterUser({
    onSuccess: () => {
      toast.success("You have been registered");
    },
    onError: () => {
      toast.error("Somethink went wrong");
    },
  });
  return (
    <>
      <Dialog open={true}>
        <DialogTitle>
          Register
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
        <form onSubmit={handleRegisterUser}>
          <DialogContent dividers>
            <DialogContentText>
              Pleace enter your email and password
            </DialogContentText>
            <Input
              id="name"
              label="name"
              {...register("name", { required: true })}
              placeholder="Enter name"
              error={!!errors.name?.message}
              helperText={errors.name && errors.name.message}
            />
            <Input
              label="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="Enter email"
              error={!!errors.email?.message}
              helperText={errors.email && errors.email.message}
            />
            <Input
              id="password"
              label="password"
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter password"
              defaultValue=""
              error={!!errors.password?.message}
              helperText={errors.password && errors.password.message}
            />
            <Input
              id="confirmPassword"
              label="confirmPassword"
              {...register("confirmPassword", { required: true })}
              type="password"
              placeholder="Enter confirmPassword"
              defaultValue=""
              error={!!errors.confirmPassword?.message}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
            <Input
              id="phoneNumber"
              label="phoneNumber"
              {...register("phoneNumber", { required: true })}
              type="text"
              placeholder="Enter Photo Number"
              defaultValue=""
              error={!!errors.phoneNumber?.message}
              helperText={errors.phoneNumber && errors.phoneNumber.message}
            />
          </DialogContent>

          <DialogActions sx={{ justifiContent: "space-between", px: "19px" }}>
            <SubmitButton id="button">Submit</SubmitButton>
          </DialogActions>
        </form>
        <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
          Do you have an account? Sign in now
          <Link to="/login">
            <Button>Login</Button>
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
export default Register;
