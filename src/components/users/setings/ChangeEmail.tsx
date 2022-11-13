import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { updateEmail } from "firebase/auth";
import { useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
// import EmailField from "../inputs/EmailField";
// import SubmitButton from "../inputs/SubmitButton";
import { useNavigate } from "react-router-dom";
const ChangeEmail = () => {
  const { upDateEmail, setisReAuth } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      // upDateEmail()
      // await updateEmail(currentUser, emailRef.current.value);
    } catch (error) {
      console.log(error);
    }
  };
  const handlerClose = async () => {
    navigate("/");
    setisReAuth(false);
  };
  return (
    <Dialog open={true}>
      <DialogTitle>
        Chenge Email
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
          {/* close */}
        </IconButton>
      </DialogTitle>
      {/* {location === "modal" && <Notify />} */}
      {/* Błąd podczas logowania */}
      <form
      // onSubmit={handleSubmit}
      >
        <DialogContent dividers>
          <DialogContentText>Please Enter your new email:</DialogContentText>
          {/* <EmailField {...{ emailRef, defaultValue: currentUser?.email }} /> */}
        </DialogContent>
        <DialogActions>{/* <SubmitButton /> */}</DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangeEmail;
