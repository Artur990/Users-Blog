import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
// import { auth } from '../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from 'firebase/auth'
import { UseFieldArrayAppend } from 'react-hook-form'
import { auth } from '../firebase/config'

export const RootLoader = async () => {
  // const docRef = doc(db, 'react-blog2', params.id)
  // const docSnap = await getDoc(docRef)
  const [user] = useAuthState(auth)
  const { currentUsers } = useAuth()
  const aa: number = 1
  console.log(currentUsers?.email)
  return currentUsers?.email
}

// export const PrivatedRoute = (props: any) => {
//   const currentUsers1 = useLoaderData()
//   // const [user] = useAuthState(auth)
//   const { currentUsers } = useAuth()

//   // const [localUser, setLocalUser] = useState<User>()

//   // useEffect(() => {
//   // if (!!user) {
//   // setLocalUser(user)
//   // }
//   // }, [currentUsers])
//   console.log(currentUsers1)
//   console.log(currentUsers?.email)
//   return true ? <Outlet /> : <Navigate to="/" />
// }

export const PrivatedRouteReAuth = () => {
  const { isReAuth } = useAuth()
  const auth = isReAuth
  return auth ? <Outlet /> : <Navigate to="/" />
}
