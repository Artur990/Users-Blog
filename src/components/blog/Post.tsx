import {
  Avatar,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { PostType } from "../../types/postType";
import moment from "moment";

export const blogLoader = async ({ params }: any) => {
  const docRef = doc(db, "react-blog2", params.id);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), id: docSnap.id };
};
type Comment = {
  id: number;
  userName: string;
  comment: string;
  createdAT: string;
};
const Post = () => {
  const { currentUsers, setIsLoading } = useAuth();
  const [messaeg, setMessage] = useState<string>();
  const [allmessaege, setAllMessage] = useState<Comment[]>();
  const id = useLoaderData() as PostType;

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const postRef = doc(db, "react-blog2", id.id);
  const submitPost = async () => {
    setIsLoading(true);
    try {
      if (messaeg?.length === 0) {
        toast.error("Wiadomości nie możę być pusta");
        throw new Error("Mesage nie możę być pusty");
      }
      await updateDoc(postRef, {
        comments: [
          ...id.comments,
          {
            id: Math.random(),
            userName: currentUsers?.email,
            comment: messaeg,
            createdAT: moment().format(),
          },
        ],
      });
      setMessage("");
      toast.success("Twój post został dodany");
    } catch (error) {
      toast.error("Coś poszło nie tak");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getComments = async () => {
    const docRef = doc(db, "react-blog2", id.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessage(snapshot.data()?.comments as Comment[]);
    });
    return unsubscribe;
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 2 }}>
        <Typography variant="h6" component="h3">
          Dodaj komentarz
        </Typography>

        <Paper elevation={5}>
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            marginLeft={1}
            marginBottom={2}
            marginTop={2}
            paddingTop={2}
          >
            <IconButton size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {id?.userName?.charAt(0)?.toUpperCase() ||
                  id?.author[0].email?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>
            <Typography variant="h6" component="h3">
              {id?.userName?.toUpperCase() || id?.author[0].email}
            </Typography>
          </Box>
          <Box marginLeft={4} marginBottom={3}>
            <Typography variant="subtitle1" component="h2">
              {id.postText}
            </Typography>
          </Box>
          <Box
            marginLeft={4}
            marginBottom={2}
            paddingBottom={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              type="text"
              id="Comment"
              label="Comment"
              variant="outlined"
              fullWidth
              onChange={handlerInput}
              error={messaeg?.length === 0}
              helperText={
                messaeg?.length === 0 && "widomość nie może być pusta"
              }
            />
            <Button
              type="submit"
              variant="outlined"
              onClick={submitPost}
              sx={{ margin: 2 }}
            >
              wyślij
            </Button>
          </Box>
        </Paper>
      </Container>
      {allmessaege?.map((e) => {
        return (
          <Container maxWidth="sm" sx={{ marginTop: 2 }} key={e.id}>
            <Paper elevation={3}>
              <Box
                sx={{ display: "flex", alignItems: "center" }}
                marginLeft={2}
                marginRight={2}
                marginBottom={2}
                marginTop={5}
              >
                <IconButton size="small" sx={{ ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {e?.userName.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
                <Typography variant="h6" component="h3">
                  {e.userName}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                marginLeft={4}
                marginBottom={2}
                marginTop={5}
              >
                <Typography variant="subtitle1" component="h1">
                  {e.comment}
                </Typography>
                <Typography variant="subtitle1" component="h1">
                  {moment(e?.createdAT).fromNow()}
                </Typography>
              </Box>
            </Paper>
          </Container>
        );
      })}
    </>
  );
};

export default Post;
