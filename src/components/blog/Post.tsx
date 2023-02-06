import {
  Avatar,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Box, Container } from '@mui/system'
import { doc, getDoc } from 'firebase/firestore'
import { useLoaderData } from 'react-router-dom'
import { db } from '../../firebase/config'
import { PostType } from '../../types/postType'
import moment from 'moment'
import { useGetComments } from '../../hooks/blog/useGetComments'
import { useSubmitPost } from '../../hooks/blog/useSubmitPost'

export const blogLoader = async ({ params }: any) => {
  const docRef = doc(db, 'react-blog2', params.id)
  const docSnap = await getDoc(docRef)
  return { ...docSnap.data(), id: docSnap.id }
}
const Post = () => {
  const id = useLoaderData() as PostType
  const { setMessage, submitPost } = useSubmitPost(id)
  const { allmessaege } = useGetComments(id)

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 2 }}>
        <Typography variant="h6" component="h3">
          Create a comment
        </Typography>
        <Paper elevation={5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              margin: 2,
              padding: 2,
            }}
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
          <Box sx={{ marginLeft: 4, marginBottom: 3 }}>
            <Typography variant="subtitle1" component="h2">
              {id.postText}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: 3 }}>
            <TextField
              type="text"
              id="Comment"
              label="Comment"
              variant="outlined"
              fullWidth
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              variant="outlined"
              onClick={() => submitPost()}
              sx={{ margin: 2 }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Container>
      {allmessaege?.map((e) => {
        return (
          <Container maxWidth="sm" sx={{ marginTop: 2 }} key={e.id}>
            <Paper elevation={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: 2,
                  marginTop: 5,
                }}
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: 3,
                }}
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
        )
      })}
    </>
  )
}

export default Post
