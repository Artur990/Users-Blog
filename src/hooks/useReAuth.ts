import { useForm } from 'react-hook-form'
import { ReAuthSchema, ReAuthSchemaSchemaType } from '../schemas/reAuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
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
      console.log(err)
    } finally {
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
