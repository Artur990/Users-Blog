import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import moment from 'moment'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase/config'

export const useCreatePost = () => {
  const navigate = useNavigate()
  const { currentUsers, setIsLoading } = useAuth()
  const [post, setPost] = useState<string>()
  const submitPost = async () => {
    setIsLoading(true)
    try {
      const postCollectionRef = collection(db, 'react-blog2')
      await addDoc(postCollectionRef, {
        createdAT: moment().format(),
        userName: currentUsers?.email,
        user: currentUsers?.uid,
        postText: post,
        comments: [],
        author: [
          {
            avatar: currentUsers?.photoURL,
            email: currentUsers?.email,
          },
        ],
      })
      toast.success('Your post has been added')
      navigate('/')
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  return { post, setPost, submitPost }
}
