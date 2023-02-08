// nieuzywany plik

// import { useAuthState } from 'react-firebase-hooks/auth'

// import { useEffect, useState } from 'react'

// import {
//   CollectionReference,
//   collection,

//   onSnapshot,
//   query,
//   where,
// } from 'firebase/firestore'
// import { PostType } from '../../types/postType'
// import { useAuth } from '../../context/AuthContext'
// import { auth, db } from '../../firebase/config'

// export const useMyPost = () => {
//   const { setIsLoading, currentUsers } = useAuth()
//   const [user, loading] = useAuthState(auth)
//   const [posts, setPosts] = useState<PostType[] | null>(null)

//   // const getPosts = () => {}
//   useEffect(() => {
//     console.log(user?.uid)
//     setIsLoading(true)
//     const postCollectionRef = collection(
//       db,
//       'react-blog2'
//     ) as CollectionReference<PostType>
//     const q = query(postCollectionRef, where('user', '==', currentUsers?.uid))
//     const UnSubscribe = onSnapshot(q, (snapshot) => {
//       setPosts(snapshot.docs.map((e) => ({ ...e.data(), id: e.id })))
//     })
//     setIsLoading(false)

//     return UnSubscribe
//   }, [user])

//   return {}
// }

const useMyPost = () => {
  return {}
}

export default useMyPost
