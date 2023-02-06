import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton } from '@mui/material'

import SubmitButton from '../input/SubmitButton'
import { useReAuthUser } from '../../../hooks/useReAuth'
import Input from '../input/Input'

const ReAuth = () => {
  const {
    form: {
      handleReAuthSchema,
      formState: { errors },
      register,
    },
  } = useReAuthUser()

  return (
    <Dialog open={true}>
      <DialogTitle>
        Confirm password
        <IconButton
          aria-label="Close"
          href="/"
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
      <form onSubmit={handleReAuthSchema}>
        <DialogContent dividers>
          <DialogContentText>
            Due to the security policy, a password is required:
          </DialogContentText>
          <Input
            id="password"
            label="password"
            {...register('password', { required: true })}
            type="password"
            placeholder="Enter password"
            defaultValue=""
            error={!!errors.password?.message}
          />
        </DialogContent>
        <DialogActions>
          <SubmitButton id="button">Submit</SubmitButton>
          <Button />
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ReAuth
