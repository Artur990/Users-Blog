import { Avatar, Button, IconButton, Paper, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import moment from 'moment'

import { Link } from 'react-router-dom'
import { PostType } from '../../types/postType'

const Message = (props: PostType) => (
  <Container
    maxWidth="sm"
    sx={{
      marginTop: 3,
      minWidth: '320px',
      '&:hover': {
        opacity: [0.9, 0.8, 0.7],
      },
    }}
  >
    <Paper elevation={4}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: 1,
          padding: 1,
        }}
      >
        <IconButton size="small">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              '&:hover': {
                cursor: 'none',
              },
            }}
            src={props?.author[0]?.avatar ? props?.author[0].avatar : ''}
          >
            {props?.userName?.charAt(0)?.toUpperCase() ||
              props?.author[0].email?.charAt(0)?.toUpperCase()}
          </Avatar>
        </IconButton>
        <Typography variant="h6" component="h3">
          {props?.userName || props?.author[0].email}
        </Typography>
      </Box>
      <Box
        sx={{
          margin: 1,
          marginLeft: 3,
        }}
      >
        <Typography variant="subtitle1" component="h2">
          {props?.postText}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 1,
          marginLeft: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="subtitle1"
            component="h1"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {!props?.comments?.length ? 0 : props?.comments?.length} Comments
          </Typography>
          <Link to={`post/${props?.id}`}>
            <Button sx={{ margin: 1, textTransform: 'none' }}>add</Button>
          </Link>
        </Box>
        <Typography variant="subtitle1" component="a" marginRight={2}>
          {moment(props?.createdAT).fromNow()}
        </Typography>
      </Box>
    </Paper>
  </Container>
)

export default Message
