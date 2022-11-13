import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import PasswordFiled2 from "../input/PasswordFiled2";
import SubmitButton from "../input/SubmitButton";
import { useReAuthUser } from "../../../hooks/useReAuth";

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
        Re-Auth
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
            Please Enter your current Password:
          </DialogContentText>
          <PasswordFiled2
            id="password"
            label="password"
            register={register}
            required={true}
            type="password"
            placeholder=""
            defaultValue=""
            error={!!errors.password?.message}
            helperText={errors.password && errors.password.message}
          />
        </DialogContent>
        <DialogActions>
          <SubmitButton>Submit</SubmitButton>
          <Button />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ReAuth;
