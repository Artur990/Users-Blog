import {
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Dialog,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import SubmitButton from '../input/SubmitButton'
import { useChangeEmail } from '../../../hooks/seting/useChangeEmail'
import { useHandlerClose } from '../../../hooks/useHandlerClose'

const ChangeEmail = () => {
  const { handlerClose } = useHandlerClose()
  const { errors, handleSubmit, register, submit } = useChangeEmail()
  return (
    <Dialog open={!!true}>
      <DialogTitle>
        Change Email:
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
          <DialogContentText>Enter a new email address:</DialogContentText>
          <TextField
            id="email"
            label="email"
            {...register('email')}
            required={!true}
            type="email"
            placeholder="Enter email"
            defaultValue=""
            error={!!errors.email?.message}
            helperText={errors.email && errors.email.message}
          />
        </DialogContent>
        <DialogActions>
          <SubmitButton id="button">Submit</SubmitButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ChangeEmail
