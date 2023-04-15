import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './config'

const updateUserRecords = async (
  collectionName: string,
  uid: string,
  updatedObj: any
) => {
  const q = query(collection(db, collectionName), where('uid', '==', uid))
  try {
    const snapshot = await getDocs(q)
    const updatePromises: any = []
    snapshot.forEach((document) => {
      updatePromises.push(
        updateDoc(doc(db, collectionName, document.id), updatedObj)
      )
    })
    await Promise.all(updatePromises)
  } catch (error) {
    console.log(error)
    throw error
  }
}
export default updateUserRecords
