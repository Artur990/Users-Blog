import { Typography } from '@mui/material'
import { Container } from '@mui/system'

const Error = () => {
  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" textAlign="center">
        404 This page could not be found.
      </Typography>
    </Container>
  )
}

export default Error
