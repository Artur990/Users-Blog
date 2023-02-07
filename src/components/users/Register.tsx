import React from 'react'
import { useNavigate } from 'react-router-dom'
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

import { useAuth } from '../../context/AuthContext'

import SubmitButton from './input/SubmitButton'

import { useRegisterUser } from '../../hooks/useRegisterUser'

import Input from './input/Input'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { handleGoogleLogin } = useAuth()
  const {
    form: {
      handleRegisterUser,
      formState: { errors },
      register,
    },
  } = useRegisterUser()

  return (
    <Dialog open={!!true}>
      <DialogTitle>
        Register
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
      <form onSubmit={handleRegisterUser}>
        <DialogContent dividers>
          <DialogContentText>
            Please enter your email and password
          </DialogContentText>
          <Input
            id="name"
            label="name"
            {...register('name', { required: true })}
            placeholder="Enter name"
            error={!!errors.name?.message}
            helperText={errors.name && errors.name.message}
          />
          <Input
            label="email"
            id="email"
            {...register('email', { required: true })}
            placeholder="Enter email"
            error={!!errors.email?.message}
            helperText={errors.email && errors.email.message}
          />
          <Input
            id="password"
            label="password"
            {...register('password', { required: true })}
            type="password"
            placeholder="Enter password"
            defaultValue=""
            error={!!errors.password?.message}
            helperText={errors.password && errors.password.message}
          />
          <Input
            id="confirmPassword"
            label="confirmPassword"
            {...register('confirmPassword', { required: true })}
            type="password"
            placeholder="Enter confirmPassword"
            defaultValue=""
            error={!!errors.confirmPassword?.message}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
          <Input
            id="phoneNumber"
            label="phoneNumber"
            {...register('phoneNumber', { required: true })}
            type="text"
            placeholder="Enter Photo Number"
            defaultValue=""
            error={!!errors.phoneNumber?.message}
            helperText={errors.phoneNumber && errors.phoneNumber.message}
          />
        </DialogContent>

        <DialogActions sx={{ justifiContent: 'space-between', p: 2 }}>
          <SubmitButton id="button">Submit</SubmitButton>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
        Do you have an account? Sign in now
        <Link href="/login" underline="none" textAlign="center">
          <Button variant="outlined">Login</Button>
        </Link>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default Register
