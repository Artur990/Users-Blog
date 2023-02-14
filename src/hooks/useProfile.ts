import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { updateProfile } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'
import { deleteFile } from '../firebase/deleteFile'
import { uploadFile } from '../firebase/uploadFile'
import { updateUserRecords } from '../firebase/updateUserRecords'

export const useProfile = () => {
  const { currentUsers, setIsLoading } = useAuth()

  const [name, setName] = useState(currentUsers?.displayName)
  const [fileState, setFileState] = useState<any | null>(null)
  const [photoURL, setPhotoURL] = useState<any>(currentUsers?.photoURL)
  const navigate = useNavigate()
  const handleChange = (e: any) => {
    const photo = e.target.files[0]
    if (photo) {
      setFileState(photo)
      setPhotoURL(URL.createObjectURL(photo))
    }
  }
  const handleSubmit = async () => {
    setIsLoading(true)

    let userObj = { displayName: name, isAdmin: false }
    let imagesObj = { uName: name }
    try {
      if (fileState) {
        const imageName = uuidv4() + fileState?.name.split('.').pop()
        const url = await uploadFile(
          fileState,
          `profile/${currentUsers?.uid}/${imageName}`
        )
        console.log('1')
        if (currentUsers?.photoURL) {
          const prevImage = currentUsers?.photoURL
            ?.split(`${currentUsers?.uid}%2F`)[1]
            .split('?')[0]
          try {
            await deleteFile(`profile/${currentUsers?.uid}/${prevImage}`)
          } catch (error) {
            toast.error('something went wrong')
          }
        }
        userObj = { photoURL: url, isAdmin: true } as any
        imagesObj = { ...imagesObj, uPhoto: url } as any
      }
      if (currentUsers) {
        await updateProfile(currentUsers, userObj)
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
