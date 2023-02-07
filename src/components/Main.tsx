import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import Loading from './Loading'
import Navbar from './Navbar'
import { AuthContextProvider } from '../context/AuthContext'

const Main = () => (
  <AuthContextProvider>
    <>
      <Loading />
      <Navbar />
      <Toaster />
      <Outlet />
    </>
  </AuthContextProvider>
)

export default Main
