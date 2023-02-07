import { useState, useEffect } from 'react'
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../firebase/config'
import { useAuth } from '../../context/AuthContext'
import { PostType } from '../../types/postType'

export const useBlog = (...post: any) => {
  const [blog, setBlog] = useState<PostType[] | null>(null)
  const { setIsLoading, currentUsers } = useAuth()

  useEffect(() => {
    setIsLoading(true)

    const q = query(
      collection(db, 'react-blog2') as CollectionReference<PostType>,
      post.post
        ? where('user', '==', currentUsers?.uid)
        : orderBy('createdAT', 'desc')
    )
    const unSubscribe = onSnapshot(q, (snapshot: QuerySnapshot<PostType>) => {
      setBlog(snapshot.docs.map((e) => ({ ...e.data(), id: e.id })))
    })
    setIsLoading(false)
    return unSubscribe
  }, [currentUsers?.uid, post.post, setIsLoading])

  const deletePost = async (id: string) => {
    setIsLoading(true)
    try {
      await deleteDoc(doc(db, 'react-blog2', id))
      toast.success('Your post has been deleted')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return { blog, deletePost }
}
