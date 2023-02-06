import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { updateProfile } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import { deleteFile } from '../firebase/deleteFile'
import { uploadFile } from '../firebase/uploadFile'
import { updateUserRecords } from '../firebase/updateUserRecords'

export const useProfile = () => {
  const { currentUsers, setIsLoading } = useAuth()

  const [name, setName] = useState(currentUsers?.displayName)
  const [file, setFile] = useState<File | null>(null)
  const [photoURL, setPhotoURL] = useState<any>(currentUsers?.photoURL)
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    if (file) {
      setFile(file)
      setPhotoURL(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    let userObj = { displayName: name, isAdmin: false }
    let imagesObj = { uName: name }
    try {
      if (file) {
        const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop()
        const url = await uploadFile(
          file,
          `profile/${currentUsers?.uid}/${imageName}`
        )

        if (currentUsers?.photoURL) {
          const prevImage = currentUsers?.photoURL
            ?.split(`${currentUsers?.uid}%2F`)[1]
            .split('?')[0]
          try {
            await deleteFile(`profile/${currentUsers?.uid}/${prevImage}`)
          } catch (error) {
            console.log(error)
          }
        }

        userObj = { photoURL: url, isAdmin: true } as any
        imagesObj = { ...imagesObj, uPhoto: url } as any
      }

      await updateProfile(currentUsers!, userObj)
      if (currentUsers) {
        await updateUserRecords('Users', currentUsers?.uid, imagesObj)
      }
      toast.success('Your profile has been updated')
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  return {
    navigate,
    setName,
    name,
    photoURL,
    handleSubmit,
    handleChange,
  }
}
