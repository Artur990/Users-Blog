import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import {
  ChangeEmailSchema,
  ChangeEmailSchemaType,
} from '../../schemas/changeEmailSchema'

export const useChangeEmail = () => {
  const { upDateEmail } = useAuth()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangeEmailSchemaType>({
    resolver: zodResolver(ChangeEmailSchema),
  })

  const submit = async ({ email }: ChangeEmailSchemaType) => {
    try {
      upDateEmail(email)
      navigate('/')
    } catch (err) {
      toast.error('Something went wrong')
    }
  }
  return { handleSubmit, register, errors, submit }
}
