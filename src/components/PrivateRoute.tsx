import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { User } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'

export const PrivatedRoute = () => {
  const { currentUsers } = useAuth()
  const [localUser, setLocalUser] = useState<User>()

  useEffect(() => {
    if (currentUsers) {
      setLocalUser(currentUsers)
    }
  }, [currentUsers])

  return localUser ? <Outlet /> : <Navigate to="/" />
}

export const PrivatedRouteReAuth = () => {
  const { isReAuth } = useAuth()
  return isReAuth ? <Outlet /> : <Navigate to="/" />
}
