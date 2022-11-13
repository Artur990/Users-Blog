import { deleteObject, ref } from "firebase/storage";
import { storage } from "./config";

const deleteFile = (filePath: any) => {
  const imageRef = ref(storage, filePath);
  return deleteObject(imageRef);
};

export default deleteFile;
