import { Close } from "@mui/icons-material";
import {
  Avatar,
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
import { collection, query, where } from "firebase/firestore";
const Profile = () => {
  const { userCurrent, setIsLoading } = useAuth();

  const [name, setName] = useState(userCurrent?.displayName);
  const [file, setFile] = useState<any | null>(null);
  const [photoURL, setPhotoURL] = useState<any>(userCurrent?.photoURL);
  // const postCollectionRef = doc(db, "Users", props.id);
  // const q = query(collection(db, "react-blog2"),where("user", "==", userCurrent.uid)

  // );
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };
  console.log(file);
  const handleSubmit = async () => {
    // e.preventDefault();
    setIsLoading(true);

    let userObj = { displayName: name };
    let imagesObj = { uName: name };
    console.log("jest ok 1");
    try {
      console.log("jest ok 2");
      if (file) {
        console.log("jest ok 3");
        const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
        const url = await uploadFile(
          file,
          `profile/${userCurrent?.uid}/${imageName}`
        );

        if (userCurrent?.photoURL) {
          console.log("jest ok 3.5");
          const prevImage = userCurrent?.photoURL
            ?.split(`${userCurrent?.uid}%2F`)[1]
            .split("?")[0];
          // if (prevImage) {
          try {
            await deleteFile(`profile/${userCurrent?.uid}/${prevImage}`);
          } catch (error) {
            console.log(error);
          }
          // }
        }

        userObj = { photoURL: url } as any;
        // imagesObj = { ...imagesObj, uPhoto: url };
      }

      await updateProfile(userCurrent!, userObj);
      // await updateDoc(postCollectionRef, {});
      // await updateUserRecords('gallery', currentUser?.uid, imagesObj);
      console.log("wykonnao");
      console.log("jest ok 4");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  console.log(userCurrent?.photoURL);
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
      <button onClick={handleSubmit}>Dodaj</button>
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
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
      {/* </form> */}
    </Dialog>
  );
};

export default Profile;
// const handleSubmit = async () => {
//     setIsLoading(true);

//     let userObj = { displayName: name };
//     let imagesObj = { uName: name };

//     try {
//       if (file) {
//         const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();

//         const storageRef = ref(storage, `profile/`);
//         const bytes = new Uint8Array([
//           0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c,
//           0x64, 0x21,
//         ]);

//         await uploadBytes(storageRef, file).then((snapshot) => {
//           console.log("Uploaded a blob or file!");
//         });

// const url = await getDownloadURL(storageRef);
// resolve(url);
// reject(error);
// console.log(url);
// if (userCurrent?.photoURL) {
//   const prevImage = userCurrent?.photoURL
//     ?.split(`${userCurrent?.uid}%2F`)[1]
//     .split("?")[0];
//   if (prevImage) {
//     try {
//       await deleteObject(storageRef);
//       //    deleteFile(`profile/${userCurrent?.uid}/${prevImage}`);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
// if(photoURL){
// userObj = { ...userObj, photoURL: url };
// }
// imagesObj = { ...imagesObj, uPhoto: url };
//   }
// if (userCurrent) {
//   await updateProfile(userCurrent, userObj);
// }
//   await updateUserRecords("gallery", currentUser?.uid, imagesObj);
// } catch (error) {
//   console.log(error);
// } finally {
//   setIsLoading(false);
// }
//   };
