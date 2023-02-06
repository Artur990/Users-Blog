import Loading from './Loading'
import Navbar from './Navbar'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { AuthContextProvider, useAuth } from '../context/AuthContext'

const Main = () => {
  const { currentUsers } = useAuth()
  console.log(currentUsers)
  return (
    <AuthContextProvider>
      <>
        <Loading />
        <Navbar />
        <Toaster />
        <Outlet />
      </>
    </AuthContextProvider>
  )
}

export default Main
