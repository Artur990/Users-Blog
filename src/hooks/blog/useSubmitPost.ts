import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import moment from 'moment'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase/config'
import { PostType } from '../../types/postType'

export const useSubmitPost = (id: PostType) => {
  const [messaeg, setMessage] = useState<string>()
  const { currentUsers, setIsLoading } = useAuth()
  const submitPost = async () => {
    setIsLoading(true)
    try {
      if (messaeg?.length === 0) {
        toast.error('Messages cannot be blank')
        throw new Error('Messages cannot be blank')
      }
      const postRef = doc(db, 'react-blog2', id.id)
      await updateDoc(postRef, {
        comments: [
          ...id.comments,
          {
            id: Math.random(),
            userName: currentUsers?.email,
            comment: messaeg,
            createdAT: moment().format(),
          },
        ],
      })

      toast.success('Your post has been added')
    } catch (error) {
      toast.error('Somethink went wrong')
    } finally {
      setIsLoading(false)
      setMessage('')
    }
  }
  return { setMessage, submitPost }
}
