import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { LoginSchema, LoginSchemaType } from '../schemas/loginSchema'
import { useAuth } from '../context/AuthContext'

export const useLoginUser = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { handleSubmit, setValue, ...form } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLoginUser = async ({ email, password }: LoginSchemaType) => {
    setIsLoading(true)
    try {
      login(email, password)
      navigate('/')
    } catch (err) {
      toast.error('something went wrong')
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
