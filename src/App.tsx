import React from 'react'
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { zhCN } from '@mui/material/locale'
import { User } from 'firebase/auth'
import { useAuth } from './context/AuthContext'

import Register from './components/users/Register'
import Login from './components/users/Login'
import AccountSettings from './components/users/setings/AccountSettings'
import ChangePassword from './components/users/setings/ChangePassword'
import ReAuth from './components/users/setings/ReAuth'
import ChangeEmail from './components/users/setings/ChangeEmail'
import DeleteAccount from './components/users/setings/DeleteAccount'

import { PrivatedRouteReAuth } from './components/PrivateRoute'
// import { PrivatedRoute } from './components/PrivateRoute'

import CreatePost from './components/blog/CreatePost'
import MyPost from './components/blog/MyPost'
import Blogs from './components/blog/Blogs'
import Error from './components/Error'
import Post, { blogLoader } from './components/blog/Post'
import EditPost, { postLoader } from './components/blog/EditPost'
import EditUsers from './components/EditUserst'
import Profile from './components/Profile'
import Main from './components/Main'

export const loginn = (email: any, password: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(password)
      resolve(email)
    }, 500)
  })
}
const PrivatedRoute = () => {
  const { currentUsers } = useAuth()
  const [localUser, setLocalUser] = React.useState<User>()

  React.useEffect(() => {
    if (currentUsers) {
      setLocalUser(currentUsers)
    }
  }, [currentUsers])

  console.log(localUser?.uid)

  return true ? <Outlet /> : <Navigate to="/" />
}

const JSXRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />} errorElement={<Error />}>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login loginn={loginn} />} />
      <Route path="/" element={<Blogs />} />
      <Route element={<PrivatedRoute />}>
        <Route
          path="post/:id"
          element={<Post />}
          errorElement={<Error />}
          loader={blogLoader}
        />
        <Route
          path="editPost/:post"
          element={<EditPost />}
          errorElement={<Error />}
          loader={postLoader}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myPost" element={<MyPost />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/reAuth" element={<ReAuth />} />
        <Route path="/editUsers" element={<EditUsers />} />

        <Route element={<PrivatedRouteReAuth />}>
          <Route path="/accountSettings" element={<AccountSettings />} />
          <Route path="/changeEmail" element={<ChangeEmail />} />
          <Route path="/delateAccount" element={<DeleteAccount />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Route>
      </Route>
    </Route>
  )
)

const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
    },
    typography: {
      fontFamily: ['Montserrat'].join(','),
    },
  },
  zhCN
)
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={JSXRouter} />
    </ThemeProvider>
  )
}

export default App
