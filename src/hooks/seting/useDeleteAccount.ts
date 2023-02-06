import { useAuth } from '../../context/AuthContext'

export const useDeleteAccount = () => {
  const { deleteAccount } = useAuth()

  const handleSubmit = async () => {
    try {
      deleteAccount()
    } catch (err) {
      console.log(err)
    }
  }
  return { handleSubmit }
}
