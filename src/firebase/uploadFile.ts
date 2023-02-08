import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './config'

export const uploadFile = (file: any, filePath: any) => {
  // mozna zwykla funkcje  async await zrobic zamiast new Promise?
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, filePath)
    try {
      uploadBytes(storageRef, file)
      const url = getDownloadURL(storageRef)
      resolve(url)
    } catch (error) {
      reject(error)
    }
  })
}
