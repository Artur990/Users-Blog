import {
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";

import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SubmitButton from "../input/SubmitButton";
import { useHandlerClose } from "../../../hooks/useHandlerClose";
export const ChangePasswordSchema = z
  .object({
    password: z.string().min(5, { message: "hasło jest zbyt którkie" }).trim(),
    confirmPassword: z
      .string()
      .min(5, { message: "hasło jest zbyt którkie" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Email powinnien być taki sam",
    path: ["confirmPassword"],
  });

type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

const ChangePassword = () => {
  const { handlerClose } = useHandlerClose();
  const { upDatePassword, setisReAuth } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const submit = async ({
    password,
    confirmPassword,
  }: ChangePasswordSchemaType) => {
    try {
      upDatePassword(password);
    } catch (error) {
      console.log(error);
    } finally {
      setisReAuth(false);
    }
  };
  return (
    <>
      <Dialog open={true}>
        <DialogTitle>
          Zmiana hasła
          <IconButton
            aria-label="Close"
            onClick={handlerClose}
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
        <form onSubmit={handleSubmit(submit)}>
          <DialogContent dividers>
            <DialogContentText>Wpisz swoje nowe hasło:</DialogContentText>
            <TextField
              id="password"
              label="password"
              {...register("password", { required: true })}
              // required={true}
              type="password"
              placeholder="Enter password"
              defaultValue=""
              error={!!errors.password?.message}
              helperText={errors.password && errors.password.message}
            />
            <TextField
              id="confirmPassword"
              label="confirmPassword"
              {...register("confirmPassword", { required: true })}
              // required={true}
              type="password"
              placeholder="Enter confirmPassword"
              defaultValue=""
              error={!!errors.confirmPassword?.message}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          </DialogContent>
          <DialogActions>
            <SubmitButton>Wyslij</SubmitButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChangePassword;
