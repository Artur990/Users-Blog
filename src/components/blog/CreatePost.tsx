import { Container } from '@mui/system'
import { Button, Paper, TextareaAutosize, Typography } from '@mui/material'
import { useCreatePost } from '../../hooks/blog/useCreatePost'

const CreatePost = () => {
  const { post, setPost, submitPost } = useCreatePost()
  return (
    <Container maxWidth="sm" sx={{ marginTop: 2, minWidth: '320px' }}>
      <Paper
        elevation={3}
        sx={{
          minWidth: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          '&:hover': {
            opacity: [0.9, 0.9, 0.9],
          },
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
          placeholder="Create  post"
          style={{
            width: '300px',
            minWidth: '280px',
            height: 150,
            background: 'black',
            color: 'white',
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
          sx={{
            m: 1,
          }}
        >
          create
        </Button>
      </Paper>
    </Container>
  )
}

export default CreatePost
