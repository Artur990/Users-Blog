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
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

import { useHandlerClose } from "../../../hooks/useHandlerClose";
import { useAuth } from "../../../context/AuthContext";

const DeleteAccount = () => {
  const { deleteAccount } = useAuth();
  const { handlerClose } = useHandlerClose();
  const handleSubmit = async () => {
    try {
      deleteAccount();
      toast.success("Twoje konot zostało usunięte");
    } catch (error) {
      toast.success("Coś poszło nie tak");
    }
  };
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
