import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { ReAuthSchema, ReAuthSchemaSchemaType } from '../schemas/reAuthSchema'
import { useAuth } from '../context/AuthContext'

export const useReAuthUser = () => {
  const { reAuth } = useAuth()
  const { handleSubmit, ...form } = useForm<ReAuthSchemaSchemaType>({
    resolver: zodResolver(ReAuthSchema),
  })

  const handleReAuthSchema = ({ password }: ReAuthSchemaSchemaType) => {
    try {
      reAuth(password)
    } catch (err) {
      toast.error('something went wrong')
    }
  }

  return {
    handleSubmit,
    form: {
      handleReAuthSchema: handleSubmit(handleReAuthSchema),
      ...form,
    },
  }
}
