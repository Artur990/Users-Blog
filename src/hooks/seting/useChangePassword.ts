import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
      console.log(err)
    } finally {
      setisReAuth(false)
    }
  }
  return { handleSubmit, register, errors, submit }
}
