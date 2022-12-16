import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";

import SubmitButton from "../input/SubmitButton";
import { useReAuthUser } from "../../../hooks/useReAuth";
import Input from "../input/Input";

const ReAuth = () => {
  const {
    form: {
      handleReAuthSchema,
      formState: { errors },
      register,
    },
  } = useReAuthUser({
    onSuccess: () => {},
    onError: () => {},
  });

  return (
    <Dialog open={true}>
      <DialogTitle>
        Potwierdź hasło
        <IconButton
          aria-label="Close"
          href="/"
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

      <form onSubmit={handleReAuthSchema}>
        <DialogContent dividers>
          <DialogContentText>
            Ze względów bezpieczeństwa musisz podać swoje hasło::
          </DialogContentText>
          <Input
            id="password"
            label="password"
            {...register("password", { required: true })}
            type="password"
            placeholder=""
            defaultValue=""
            error={!!errors.password?.message}
            // helperText={errors.password && errors.password.message}
          />
        </DialogContent>
        <DialogActions>
          <SubmitButton>Wyślij</SubmitButton>
          <Button />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ReAuth;
