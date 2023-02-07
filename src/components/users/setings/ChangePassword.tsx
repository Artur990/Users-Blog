import { Close } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import SubmitButton from '../input/SubmitButton'
import { useHandlerClose } from '../../../hooks/useHandlerClose'
import Input from '../input/Input'

import { useChangePassword } from '../../../hooks/seting/useChangePassword'

const ChangePassword = () => {
  const { handlerClose } = useHandlerClose()
  const { errors, handleSubmit, register, submit } = useChangePassword()
  return (
    <Dialog open={!!true}>
      <DialogTitle>
        Changing the password
        <IconButton
          aria-label="Close"
          onClick={handlerClose}
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
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent dividers>
          <DialogContentText>Enter a new password:</DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <SubmitButton id="button">Sumbit</SubmitButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ChangePassword
