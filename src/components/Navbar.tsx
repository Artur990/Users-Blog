import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { currentUsers, logout } = useAuth()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <AppBar position="static" sx={{ background: 'white', minWidth: '320px' }}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            background: 'white',
            display: 'flec',
            justifyContent: 'space-between',
          }}
        >
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Typography
            variant="h6"
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex', fontSize: '2.0rem' },
              fontFamily: 'Montserrat',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: 'black ',
            }}
          >
            Creative Minds
          </Typography>
          <Typography
            variant="h6"
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Montserrat',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: 'black ',
            }}
          >
            Creative Minds
          </Typography>
          {currentUsers?.email ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/createPost')}
                sx={{ margin: 2 }}
              >
                Post
              </Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={currentUsers.photoURL ? currentUsers.photoURL : ''}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link
                  to="/profile"
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link
                  to="/editUsers"
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  <MenuItem>Usersy</MenuItem>
                </Link>
                <Link
                  to="/myPost"
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  <MenuItem>My posts</MenuItem>
                </Link>

                <Link
                  to="/reAuth"
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    Edit the data
                  </MenuItem>
                </Link>
                <Button onClick={logout}>
                  <MenuItem>log out</MenuItem>
                </Button>
              </Menu>{' '}
            </Box>
          ) : (
            <Box>
              <Button onClick={() => navigate('/login')} variant="contained">
                Join now!
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
