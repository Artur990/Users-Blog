import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import moment from "moment";
import { Button, Paper, TextareaAutosize, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const CreatePost = () => {
  const navigate = useNavigate();
  const { currentUsers, setIsLoading } = useAuth();
  const [post, setPost] = useState<string>();
  console.log(post);

  const submitPost = async () => {
    setIsLoading(true);
    try {
      const postCollectionRef = collection(db, "react-blog2");
      await addDoc(postCollectionRef, {
        createdAT: moment().format(),
        userName: currentUsers?.email,
        user: currentUsers?.uid,
        postText: post,
        comments: [],
        author: [
          {
            avatar: currentUsers?.photoURL,
            email: currentUsers?.email,
          },
        ],
      });
      toast.success("Twój post został dodany");
      navigate("/");
    } catch (error) {
      toast.error("Coś poszło nie tak");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      {/* <form onSubmit={submitPost}> */}
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
          Dodaj swój post
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
          value={post}
          maxLength={200}
          minLength={1}
          onChange={(e) => setPost(e.target.value)}
        />
        <Typography variant="subtitle1" component="h1">
          {!post?.length ? 0 : post?.length}/200
        </Typography>
        <Button type="submit" onClick={submitPost} variant="contained">
          create
        </Button>
      </Paper>
      {/* </form> */}
    </Container>
  );
};

export default CreatePost;
