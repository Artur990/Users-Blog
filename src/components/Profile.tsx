import { Close, Send } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const { navigate, setName, name, photoURL, handleSubmit, handleChange } =
    useProfile();
  return (
    <Dialog open={true}>
      <DialogTitle>
        Profile
        <IconButton
          aria-label="Close"
          onClick={() => navigate(-1)}
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
      <DialogContent dividers>
        <DialogContentText>
          You can update your profile by changing your name and photo.
        </DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          type="text"
          inputProps={{ minLength: 2 }}
          fullWidth
          variant="standard"
          value={name || ""}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="profilePhoto">
          <input
            accept="image/*"
            id="profilePhoto"
            type="file"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <Avatar
            src={photoURL ? photoURL : ""}
            sx={{ width: 75, height: 75, cursor: "pointer" }}
          />
        </label>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Profile;
