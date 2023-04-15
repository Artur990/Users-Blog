import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { RegisterSchema, RegisterSchemaType } from '../schemas/registerSchema'
import { useAuth } from '../context/AuthContext'

export const useRegisterUser = () => {
  const { signUp } = useAuth()
  const { handleSubmit, ...form } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleRegisterUser = ({
    name,
    email,
    password,
    phoneNumber,
  }: RegisterSchemaType) => {
    setIsLoading(true)
    try {
      signUp(email, name, password, phoneNumber)
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
      handleRegisterUser: handleSubmit(handleRegisterUser),
      ...form,
    },
  }
}
