import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from '../../schemas/changePasswordSchema'

export const useChangePassword = () => {
  const { upDatePassword, setisReAuth } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const submit = async ({ password }: ChangePasswordSchemaType) => {
    try {
      upDatePassword(password)
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setisReAuth(false)
    }
  }
  return { handleSubmit, register, errors, submit }
}
