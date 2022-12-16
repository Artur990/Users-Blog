import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

const getQueryDocs = async (collectionName: string, uid: any): Promise<any> => {
  const q = query(collection(db, collectionName), where("uid", "==", uid));
  return await getDocs(q);
};

const updateUserRecords = (
  collectionName: string,
  uid: any,
  updatedObj: any
): Promise<any> => {
  return new Promise(async (resolve, reject): Promise<any> => {
    try {
      // const snapshot = await getDocs(q);
      const snapshot = await getQueryDocs(collectionName, uid);
      const updatePromises = [] as any;
      snapshot.forEach((document: any) => {
        updatePromises.push(
          updateDoc(doc(db, collectionName, document.id), updatedObj)
        );
      });
      await Promise.all(updatePromises);
      resolve(updatePromises);
    } catch (error) {
      reject(error);
    }
  });
};

export default updateUserRecords;
