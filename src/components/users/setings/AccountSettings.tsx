import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";

import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
// import { Link } from "react-router-dom";
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
            {/* close */}
          </IconButton>
        </DialogTitle>
        <DialogContent dividers></DialogContent>
        <DialogActions sx={{ flexDirection: "column", gap: 2, my: 2 }}>
          {isPasswordProvider && (
            <Link style={{ textDecoration: "none" }} to="/changePassword">
              <Typography
                sx={{
                  mr: 2,

                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Zmień hasło
              </Typography>
            </Link>
          )}
          <Link style={{ textDecoration: "none" }} to="/changeEmail">
            {/* <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Zmień adres email
            </Typography> */}
            Zmień adres email
          </Link>

          <Link style={{ textDecoration: "none" }} to="/delateAccount">
            <Typography
              // variant="h6"
              noWrap
              // component="a"
              // href="/delateAccount"
              sx={{
                mr: 2,

                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Usuń konto
            </Typography>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountSettings;
