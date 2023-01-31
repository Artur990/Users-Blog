import { DialogActions, DialogContent } from "@mui/material";

import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { currentUsers, setisReAuth } = useAuth();

  const isPasswordProvider =
    currentUsers?.providerData[0].providerId === "password";

  const handlerClose = async () => {
    navigate("/");
    setisReAuth(false);
  };
  return (
    <>
      <Dialog open={true}>
        <DialogTitle>
          Ustawienia konta:
          <IconButton
            onClick={handlerClose}
            aria-label="Close"
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
        <DialogContent dividers></DialogContent>
        <DialogActions sx={{ flexDirection: "column", gap: 2, my: 2 }}>
          {isPasswordProvider && (
            <Link style={{ textDecoration: "none" }} to="/changePassword">
              Zmień hasło
            </Link>
          )}
          <Link style={{ textDecoration: "none" }} to="/changeEmail">
            Zmień adres email
          </Link>

          <Link style={{ textDecoration: "none" }} to="/delateAccount">
            Usuń konto
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountSettings;
