import { Box, Container } from '@mui/system'
import { Avatar, IconButton, Paper, Typography } from '@mui/material'
import { BorderColorSharp, DeleteForeverSharp } from '@mui/icons-material'

import { Link } from 'react-router-dom'
import { useBlog } from '../../hooks/blog/useBlog'

const MyPost = () => {
  const { blog, deletePost } = useBlog(true)
  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 2,
        minWidth: '320px',
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Typography variant="h6" component="h3">
        Your posts
      </Typography>
      {blog?.map((e) => {
        return (
          <Paper key={e.id} elevation={3}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: 2,
                marginTop: 5,
              }}
            >
              <IconButton size="small" sx={{ ml: 2 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    '&:hover': {
                      cursor: 'none',
                    },
                  }}
                  src={e?.author[0]?.avatar ? e.author[0].avatar : ''}
                >
                  {e.author[0]?.avatar}
                </Avatar>
              </IconButton>
              <Typography variant="h6" component="h3">
                {e?.userName}
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: 5,
                marginBottom: 3,
              }}
            >
              <Typography variant="subtitle1" component="h2">
                {e.postText}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 5,
                marginBottom: 3,
              }}
            >
              <DeleteForeverSharp
                sx={{ color: 'rgba(242, 128, 128, 0.916)' }}
              />
              <Typography
                onClick={() => deletePost(e.id)}
                variant="subtitle1"
                component="h1"
              >
                Remove
              </Typography>
              <BorderColorSharp
                sx={{ marginLeft: 2, color: 'rgba(0, 247, 21, 0.548)' }}
              />
              <Link to={`editPost/${e.id}`} replace>
                Edit
              </Link>
            </Box>
          </Paper>
        )
      })}
    </Container>
  )
}

export default MyPost
