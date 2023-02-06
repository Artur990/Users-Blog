import { Send } from '@mui/icons-material'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import useEditUsers from '../hooks/useEditUsers'
import { EditUserType } from '../types/editUsersType'

const EditUsersList = ({
  email,
  id,
  isAdmin,
  name,
  password,
  phoneNumber,
  photoURL,
  uid,
}: EditUserType) => {
  const { handleSubmit, onSubmit, register, setValue } = useEditUsers({
    email,
    id,
    isAdmin,
    name,
    password,
    phoneNumber,
    photoURL,
    uid,
  })

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={4}>
          <Box sx={{ margin: 3 }}>
            <Typography variant="subtitle1" component="h2">
              Name:
            </Typography>
            <TextField {...register('name')} placeholder={name} />
            <Typography variant="subtitle1" component="h2">
              E-mail:
            </Typography>
            <TextField {...register('email')} placeholder={email} />
            <Typography variant="subtitle1" component="h2">
              Password:
            </Typography>
            <TextField {...register('password')} placeholder={password} />
            <Typography variant="subtitle1" component="h2">
              Phone Number:
            </Typography>
            <TextField {...register('phoneNumber')} placeholder={phoneNumber} />
          </Box>
          <Box sx={{ padding: 1, margin: 3 }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Update data
            </Button>
            <Button
              sx={{ margin: 1, marginRight: 2 }}
              type="button"
              variant="outlined"
              onClick={() => {
                setValue('name', name, {
                  shouldTouch: true,
                })
                setValue('email', email, {
                  shouldTouch: true,
                })
                setValue('password', password, {
                  shouldTouch: true,
                })
                setValue('phoneNumber', phoneNumber, {
                  shouldTouch: true,
                })
              }}
            >
              Current data
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
  )
}
export default EditUsersList
