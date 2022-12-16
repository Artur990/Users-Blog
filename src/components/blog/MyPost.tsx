import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/system";
import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import { BorderColorSharp, DeleteForeverSharp } from "@mui/icons-material";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db, auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../../context/AuthContext";
import { useBlog } from "../../hooks/useBlog";
import { PostType } from "../../types/postType";

const MyPost = () => {
  const { setIsLoading } = useAuth();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState<PostType[]>();
  const postCollectionRef = collection(db, "react-blog2");
  console.log(posts);
  // const { blog } = useBlog(true);
  const getPosts = async () => {
    if (loading) {
      setIsLoading(true);
    }
    if (!user) {
      return;
    }

    const q = query(postCollectionRef, where("user", "==", user?.uid));
    const UnSubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    setIsLoading(false);
    return UnSubscribe;
  };
  const deletePost = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "react-blog2", id));
      toast.success("Twój post został usunięty");
    } catch (error) {
      toast.error("coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, [user, loading]);
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 2 }}>
        <Typography variant="h6" component="h3">
          Twoje posty
        </Typography>
        {posts?.map((e) => {
          return (
            <Paper key={e.id} elevation={3}>
              <Box
                sx={{ display: "flex", alignItems: "center" }}
                marginLeft={2}
                marginBottom={2}
                marginTop={5}
              >
                <IconButton size="small" sx={{ ml: 2 }}>
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={e?.author[0]?.avatar ? e.author[0].avatar : ""}
                  >
                    {e.author[0]?.avatar}
                  </Avatar>
                </IconButton>
                <Typography variant="h6" component="h3">
                  {e?.userName}
                  {/* || e?.author[0].email} */}
                </Typography>
              </Box>
              <Box marginLeft={5} marginBottom={3}>
                <Typography variant="subtitle1" component="h2">
                  {e.postText}
                </Typography>
              </Box>
              <Box
                marginLeft={5}
                marginBottom={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <DeleteForeverSharp />
                <Typography
                  onClick={() => deletePost(e.id)}
                  variant="subtitle1"
                  component="h1"
                >
                  Usuń
                </Typography>
                <BorderColorSharp sx={{ marginLeft: 2 }} />
                <Typography
                  href={`editPost/${e.id}`}
                  variant="subtitle1"
                  component="a"
                  sx={{
                    textDecoration: "none",

                    color: "black",
                  }}
                >
                  Edytuj
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Container>
    </>
  );
};

export default MyPost;
