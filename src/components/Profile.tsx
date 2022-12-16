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
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SubmitButton from "./users/input/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import uploadFile from "../firebase/uploadFile";
import deleteFile from "../firebase/deleteFile";
import User from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import updateUserRecords from "../firebase/updateUserRecords";
import { toast } from "react-hot-toast";
const Profile = () => {
  const { currentUsers, setIsLoading } = useAuth();

  const [name, setName] = useState(currentUsers?.displayName);
  const [file, setFile] = useState<any | null>(null);
  const [photoURL, setPhotoURL] = useState<any>(currentUsers?.photoURL);

  // const postCollectionRef = doc(db, "Users", props.id);
  // const q = query(collection(db, "react-blog2"),where("user", "==", currentUsers.uid)

  // );
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    let userObj = { displayName: name, isAdmin: false };
    let imagesObj = { uName: name };
    try {
      if (file) {
        const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
        const url = await uploadFile(
          file,
          `profile/${currentUsers?.uid}/${imageName}`
        );

        if (currentUsers?.photoURL) {
          const prevImage = currentUsers?.photoURL
            ?.split(`${currentUsers?.uid}%2F`)[1]
            .split("?")[0];
          try {
            await deleteFile(`profile/${currentUsers?.uid}/${prevImage}`);
          } catch (error) {
            console.log(error);
          }
        }

        userObj = { photoURL: url, isAdmin: true } as any;
        imagesObj = { ...imagesObj, uPhoto: url } as any;
      }

      await updateProfile(currentUsers!, userObj);
      // await updateDoc(postCollectionRef, {});
      if (currentUsers) {
        await updateUserRecords("Users", currentUsers?.uid, imagesObj);
      }
      toast.success("Twój profil został zaktualizowany");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true}>
      <DialogTitle>
        Profil
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
      {/* <button onClick={handleSubmit}>Dodaj</button> */}
      {/* <form onSubmit={handleSubmit}> */}
      <DialogContent dividers>
        <DialogContentText>
          Możesz aktualizować swój profil przez zmianę imienia i zdjęcia.
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
        {/* <SubmitButton>Submit</SubmitButton> */}
        <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
          Dodaj
        </Button>
      </DialogActions>
      {/* </form> */}
    </Dialog>
  );
};

export default Profile;
