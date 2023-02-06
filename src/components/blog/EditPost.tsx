import {
  Button,
  Container,
  Paper,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
} from 'react-router-dom'
import { db } from '../../firebase/config'
import { PostType } from '../../types/postType'
import { useEditPost } from '../../hooks/blog/useEditPost'

export const postLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const docRef = doc(db, 'react-blog2', params.post as string)
  const docSnap = await getDoc(docRef)
  return { ...docSnap.data(), params, id: docSnap.id }
}
const EditPost = () => {
  const post = useLoaderData() as PostType
  const { posts, setPost, submitPost } = useEditPost(post)
  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" component="h3">
          Edit post
        </Typography>
        <Typography variant="subtitle1" component="h1">
          Post content
        </Typography>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Dodaj Post"
          style={{
            width: 300,
            height: 150,
            background: 'black',
            color: 'white',
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
          Create
        </Button>
      </Paper>
    </Container>
  )
}

export default EditPost
