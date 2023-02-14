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

const getQueryDocs = (
  collectionName: string,
  uid: string
): Promise<QuerySnapshot<DocumentData>> => {
  const q = query(collection(db, collectionName), where('uid', '==', uid))
  return getDocs<DocumentData>(q)
}

export const updateUserRecords = (
  collectionName: string,
  uid: string,
  updatedObj: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const snapshot = getQueryDocs(collectionName, uid) as any
      const updatePromises = [] as any
      snapshot.forEach((document: any) => {
        updatePromises.push(
          updateDoc(doc(db, collectionName, document.id), updatedObj)
        )
      })
      Promise.all(updatePromises)
      resolve(updatePromises)
    } catch (error) {
      reject(error)
    }
  })
}
