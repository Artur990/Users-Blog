import React from 'react'
import { Container } from '@mui/system'

import { useBlog } from '../../hooks/blog/useBlog'
import Message from './Message'

const Blogs = () => {
  const { blog } = useBlog(false)
  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <div>
        {blog?.map((e) => {
          return <Message key={e.id} {...e} />
        })}
      </div>
    </Container>
  )
}

export default Blogs
