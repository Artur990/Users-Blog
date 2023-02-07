import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const useHandlerClose = () => {
  const { setisReAuth } = useAuth()

  const navigate = useNavigate()

  const handlerClose = useCallback(() => {
    navigate('/')
    setisReAuth(false)
  }, [setisReAuth, navigate])

  return { handlerClose }
}
