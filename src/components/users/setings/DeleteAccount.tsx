import { async } from "@firebase/util";
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
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

const DeleteAccount = () => {
  const { deleteAccount, setisReAuth } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      deleteAccount();
      toast.success("Your account has been deleted");
    } catch (error) {
      console.log(error);
    }
  };
  const handlerClose = async () => {
    navigate("/");
    setisReAuth(false);
  };
  return (
    <Dialog
      open={true}
      // onClose={handleClose}
    >
      <DialogTitle>
        Delate Account
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
          {/* close  */}
        </IconButton>
      </DialogTitle>
      {/* {location === "modal" && <Notify />} */}
      {/* Błąd podczas logowania */}

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete your account? This action will delte
            all of your files and records
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" endIcon={<Send />} type="submit">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeleteAccount;
