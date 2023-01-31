import { Send, Close } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";

import { useHandlerClose } from "../../../hooks/useHandlerClose";
import { useDeleteAccount } from "../../../hooks/seting/useDeleteAccount";

const DeleteAccount = () => {
  const { handlerClose } = useHandlerClose();
  const { handleSubmit } = useDeleteAccount();
  return (
    <Dialog open={true}>
      <DialogTitle>
        Usuń konto
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

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Czy jesteś pewny, że chcesz usunąc swoje konto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" endIcon={<Send />} type="submit">
            Potwierdzam
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeleteAccount;
