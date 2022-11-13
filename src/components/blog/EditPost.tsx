import {
  Button,
  Container,
  Paper,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { idText } from "typescript";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase/config";
import { db } from "../../firebase/config";
export const postLoader = async ({ params }: any) => {
  const docRef = doc(db, "react-blog2", params.post);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), id: docSnap.id };
};
const EditPost = () => {
  const post = useLoaderData() as any;
  console.log(post.postText);
  const postRef = doc(db, "react-blog2", post.id);
  const navigate = useNavigate();
  const { userCurrent } = useAuth();
  const [posts, setPost] = useState<any>(post.postText);
  console.log(post.id);
  const postCollectionRef = doc(db, "react-blog2", post.id);
  const submitPost = async () => {
    // e.preventDefault();
    try {
      await updateDoc(postCollectionRef, {
        postText: posts,
      });
      console.log(auth.currentUser?.uid);
      setPost("");
      toast.success("Twój post został dodany");
      navigate("/");
    } catch (error) {
      toast.error("Coś poszło nie tak");
    }
  };
  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <Paper
        elevation={3}
        // variant="outlined"
        // margin={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="h3">
          Edytuj swój post
        </Typography>
        <Typography variant="subtitle1" component="h1">
          Opis
        </Typography>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Dodaj Post"
          style={{
            width: 300,
            height: 150,
            background: "black",
            color: "white",
          }}
          value={posts}
          maxLength={200}
          minLength={1}
          onChange={(e) => setPost(e.target.value)}
        />
        <Typography variant="subtitle1" component="h1">
          {!posts?.length ? 0 : posts?.length}/200
        </Typography>
        <Button onClick={submitPost} variant="contained">
          create
        </Button>
      </Paper>
    </Container>
  );
};

export default EditPost;
