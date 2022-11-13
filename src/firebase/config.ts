import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMDknvDhlHMs0rzmZLapzYIrZflF6NLI0",
  authDomain: "react-http-c10cb.firebaseapp.com",
  databaseURL: "https://react-http-c10cb-default-rtdb.firebaseio.com",
  projectId: "react-http-c10cb",
  storageBucket: "react-http-c10cb.appspot.com",
  messagingSenderId: "823423360820",
  appId: "1:823423360820:web:3f3b12ff150dd766114f61",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
