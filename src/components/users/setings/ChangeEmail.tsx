import {
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../input/SubmitButton";
import { toast } from "react-hot-toast";

export const ChangeEmailSchema = z.object({
  email: z.string().email("wpisz poprawny adres").min(5).max(15),
});

type ChangeEmailSchemaType = z.infer<typeof ChangeEmailSchema>;

const ChangeEmail = () => {
  const { upDateEmail, setisReAuth } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangeEmailSchemaType>({
    resolver: zodResolver(ChangeEmailSchema),
  });

  const submit = async ({ email }: ChangeEmailSchemaType) => {
    try {
      upDateEmail(email);
      navigate("/");
      toast.success("Twoj email zostało zmienione");
    } catch (error) {
      toast.error("coś poszło nie tak");
    }
  };
  const handlerClose = async () => {
    navigate("/");
    setisReAuth(false);
  };
  return (
    <Dialog open={true}>
      <DialogTitle>
        Zmień email
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
          <DialogContentText>Wpisz swój nowy email:</DialogContentText>
          <TextField
            id="email"
            label="email"
            {...register("email")}
            required={true}
            type="email"
            placeholder="Enter email"
            defaultValue=""
            error={!!errors.email?.message}
            helperText={errors.email && errors.email.message}
          />
        </DialogContent>
        <DialogActions>
          <SubmitButton>Wyślij</SubmitButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangeEmail;
