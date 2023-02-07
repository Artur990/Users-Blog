import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { db } from '../../firebase/config'
import { PostType } from '../../types/postType'

export const useEditPost = (post: PostType) => {
  const navigate = useNavigate()
  const [posts, setPost] = useState<string>(post.postText)
  const postCollectionRef = doc(db, 'react-blog2', post.id)
  const submitPost = async () => {
    try {
      await updateDoc(postCollectionRef, {
        postText: posts,
      })
      setPost('')
      toast.success('Your post has been added')
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  return { posts, setPost, submitPost }
}
