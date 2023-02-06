import { useState, useEffect } from 'react'
import {
  CollectionReference,
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { EditUserType } from '../types/editUsersType'

export const useCurrentUsers = () => {
  const [user, setUser] = useState<EditUserType[] | null>(null)

  useEffect(() => {
    const q = query(
      collection(db, 'Users') as CollectionReference<EditUserType>
    )
    const unSubscribe = onSnapshot(q, (snapshot) => {
      setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    return unSubscribe
  }, [])

  return { user }
}
