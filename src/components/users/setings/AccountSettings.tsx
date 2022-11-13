import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { GoogleAuthProvider, reauthenticateWithPopup } from "firebase/auth";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import ChangeEmail from "./ChangeEmail";
import DeleteAccount from "./DeleteAccount";
import ReAuth from "./ReAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { userCurrent, setisReAuth } = useAuth();

  const isPasswordProvider =
    userCurrent?.providerData[0].providerId === "password";

  // const handleAction = async (action) => {
  //   if (isPasswordProvider) {
  //     // setModal({
  //     //   ...modal,
  //     //   title: "Re-Login",
  //     //   content: <ReAuth {...{ action }} />,
  //     // });
  //   } else {
  //     try {
  //       await reauthenticateWithPopup(userCurrent!, new GoogleAuthProvider());
  //       switch (action) {
  //         case "changeEmail":
  //           navigate("/changeEmail");
  //           // setModal({
  //           //   ...modal,
  //           //   title: "Update Email",
  //           //   content: <ChangeEmail />,
  //           // });
  //           break;
  //         case "deleteAccount":
  //           navigate("/changeEmail");
  //           // setModal({
  //           //   ...modal,
  //           //   title: "Delete Account",
  //           //   content: <DeleteAccount />,
  //           // });
  //           break;
  //         default:
  //           throw new Error("No matching action");
  //       }
  //     } catch (error) {
  //       // setAlert({
  //       //   isAlert: true,
  //       //   severity: "error",
  //       //   message: error.message,
  //       //   timeout: 5000,
  //       //   location: "modal",
  //       // });
  //       console.log(error);
  //     }
  //   }
  // };
  const handlerClose = async () => {
    navigate("/");
    setisReAuth(false);
  };
  return (
    <>
      <Dialog
        open={true}
        // onClose={handleClose}
      >
        <DialogTitle>
          Account Settings
          <Link to="/">
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
          </Link>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            For security reason, you need to provide your credentials to do any
            of these actions:
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", gap: 2, my: 2 }}>
          {isPasswordProvider && (
            <Link to="/changePassword">
              <Button>Change Password</Button>
            </Link>
          )}
          <Link to="/changeEmail">
            <Button>Change Email</Button>
          </Link>

          <Link to="/delateAccount">
            <Button>Delete Account</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountSettings;
