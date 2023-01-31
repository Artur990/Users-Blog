import { Box, Container } from "@mui/system";
import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import { BorderColorSharp, DeleteForeverSharp } from "@mui/icons-material";
import { useMyPost } from "../../hooks/blog/useMyPost";

const MyPost = () => {
  const { posts, deletePost } = useMyPost();
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 2 }}>
        <Typography variant="h6" component="h3">
          Your posts
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
                  Remove
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
                  Edit
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
