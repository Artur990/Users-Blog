import { Close } from '@mui/icons-material'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  IconButton,
} from '@mui/material'

import { useHandlerClose } from '../../../hooks/useHandlerClose'
import { useDeleteAccount } from '../../../hooks/seting/useDeleteAccount'
import SubmitButton from '../input/SubmitButton'

const DeleteAccount = () => {
  const { handlerClose } = useHandlerClose()
  const { handleSubmit } = useDeleteAccount()
  return (
    <Dialog open>
      <DialogTitle>
        Remove account
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

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SubmitButton id="button">Accept</SubmitButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DeleteAccount
