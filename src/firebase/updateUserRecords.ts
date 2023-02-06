import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './config'

const getQueryDocs = async (
  collectionName: string,
  uid: string
): Promise<QuerySnapshot<DocumentData>> => {
  const q = query(collection(db, collectionName), where('uid', '==', uid))
  return await getDocs<DocumentData>(q)
}

export const updateUserRecords = (
  collectionName: string,
  uid: string,
  updatedObj: any
): Promise<void> => {
  return new Promise(async (resolve, reject): Promise<void> => {
    try {
      const snapshot = await getQueryDocs(collectionName, uid)
      const updatePromises = [] as any
      snapshot.forEach((document: any) => {
        updatePromises.push(
          updateDoc(doc(db, collectionName, document.id), updatedObj)
        )
      })
      await Promise.all(updatePromises)
      resolve(updatePromises)
    } catch (error) {
      reject(error)
    }
  })
}
