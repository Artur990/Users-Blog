import { Container } from "@mui/system";
import { Button, Paper, TextareaAutosize, Typography } from "@mui/material";
import { useCreatePost } from "../../hooks/blog/useCreatePost";

const CreatePost = () => {
  const { post, setPost, submitPost } = useCreatePost();
  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="h3">
          Create a post
        </Typography>
        <Typography variant="subtitle1" component="h1">
          Post content
        </Typography>
        <TextareaAutosize
          id="textarea"
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
        <Button
          type="submit"
          id="button"
          onClick={submitPost}
          variant="contained"
        >
          create
        </Button>
      </Paper>
    </Container>
  );
};

export default CreatePost;
