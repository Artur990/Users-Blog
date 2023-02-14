import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const PrivatedRoute = () => {
  const { currentUsers } = useAuth()

  return currentUsers ? <Outlet /> : <Navigate to="/" />
}

export const PrivatedRouteReAuth = () => {
  const { isReAuth } = useAuth()
  return isReAuth ? <Outlet /> : <Navigate to="/" />
}
