import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
      console.log(err)
    }
  }
  return { handleSubmit, register, errors, submit }
}
