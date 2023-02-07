import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export const useDeleteAccount = () => {
  const { deleteAccount } = useAuth()

  const handleSubmit = async () => {
    try {
      deleteAccount()
    } catch (err) {
      toast.error('Something went wrong')
    }
  }
  return { handleSubmit }
}
