import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  IconButton,
  Link,
} from '@mui/material'
import { Close, Google } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import SubmitButton from './input/SubmitButton'
import { useLoginUser } from '../../hooks/useLoginUser'
import { useAuth } from '../../context/AuthContext'
import Input from './input/Input'

const Login = ({ loginn }: any) => {
  const { handleGoogleLogin } = useAuth()
  const navigate = useNavigate()
  const {
    form: {
      handleLoginUser,
      formState: { errors },
      register,
    },
  } = useLoginUser({ loginn })

  return (
    <>
      <Dialog open={true}>
        <DialogTitle>
          Login
          <IconButton
            aria-label="Close"
            onClick={() => navigate(-1)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleLoginUser}>
          <DialogContent dividers>
            <DialogContentText>
              Pleace enter your email and password
            </DialogContentText>
            <Input
              id="email"
              type="email"
              label="email"
              {...register('email', { required: true })}
              placeholder="Enter e-mail...."
              error={!!errors.email?.message}
              helperText={errors.email && errors.email.message}
              autoFocus
            />
            <Input
              id="password"
              title="password"
              aria-label="password"
              label="password"
              {...register('password', { required: true })}
              type="password"
              placeholder="Enter the password...."
              defaultValue=""
              error={!!errors.password?.message}
              helperText={errors.password && errors.password.message}
            />
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
            <Button size="small">Forgot Password?</Button>
            <SubmitButton id="button">Submit</SubmitButton>
          </DialogActions>
        </form>
        <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
          Don't you have an account? Create one now
          <Link href="/register" underline="none" textAlign="center">
            <Button variant="outlined">Register</Button>
          </Link>
        </DialogActions>
        <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
          <Button
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Login
