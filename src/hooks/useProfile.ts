import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { updateProfile } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'
import { deleteFile } from '../firebase/deleteFile'
import { uploadFile } from '../firebase/uploadFile'
import updateUserRecords from '../firebase/updateUserRecords'
import { TImagesObj, TUserObj } from '../types/profileType'
// import uploadFile from '../firebase/uploadFile'

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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    let userObj: TUserObj = {
      displayName: name,
      isAdmin: false,
      photoURL: '',
    }
    let imagesObj: TImagesObj = { uName: name }

    try {
      if (fileState) {
        // add photo
        const imageName = uuidv4() + fileState?.name.split('.').pop()
        const url = await uploadFile(
          fileState,
          `profile/${currentUsers?.uid}/${imageName}`
        )
        // remove photo
        if (currentUsers?.photoURL) {
          const prevImage = decodeURIComponent(currentUsers.photoURL)
            .split(`${currentUsers.uid}/`)[1]
            .split('?')[0]
          if (prevImage) {
            try {
              await deleteFile(`profile/${currentUsers?.uid}/${prevImage}`)
            } catch (error) {
              console.log(error)
            }
          }
        }
        userObj = { ...userObj, photoURL: url, isAdmin: false }
        imagesObj = { ...imagesObj, uPhoto: url }
      }

      // aktualizacja imienia oraz photo
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
