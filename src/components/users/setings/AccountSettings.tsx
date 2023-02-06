import { DialogActions, DialogContent } from '@mui/material'

import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton } from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const AccountSettings = () => {
  const navigate = useNavigate()
  const { currentUsers, setisReAuth } = useAuth()

  const isPasswordProvider =
    currentUsers?.providerData[0].providerId === 'password'

  const handlerClose = async () => {
    navigate('/')
    setisReAuth(false)
  }
  return (
    <>
      <Dialog open={true}>
        <DialogTitle>
          Account settings
          <IconButton
            onClick={handlerClose}
            aria-label="Close"
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
        <DialogActions sx={{ flexDirection: 'column', gap: 2, my: 2 }}>
          {isPasswordProvider && (
            <Link style={{ textDecoration: 'none' }} to="/changePassword">
              Change your password
            </Link>
          )}
          <Link style={{ textDecoration: 'none' }} to="/changeEmail">
            Change your email address
          </Link>

          <Link style={{ textDecoration: 'none' }} to="/delateAccount">
            Delete account
          </Link>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AccountSettings
