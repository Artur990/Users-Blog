import { LoginSchema, LoginSchemaType } from '../schemas/loginSchema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const useLoginUser = ({ loginn }: any) => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { handleSubmit, setValue, ...form } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLoginUser = async ({ email, password }: LoginSchemaType) => {
    await loginn(email, password)
    setIsLoading(true)
    try {
      login(email, password)
      navigate('/')
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleSubmit,
    form: {
      handleLoginUser: handleSubmit(handleLoginUser),
      ...form,
    },
  }
}
