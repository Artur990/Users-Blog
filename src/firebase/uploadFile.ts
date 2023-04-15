import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './config'

export const uploadFile = (file: any, filePath: string) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, filePath)
    try {
      uploadBytes(storageRef, file)
        .then(() => getDownloadURL(storageRef))
        .then((url) => resolve(url))
    } catch (error) {
      reject(error)
    }
  })
}
