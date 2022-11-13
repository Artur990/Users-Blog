import React, { useState, useEffect } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

// type authot = {
//   id: string;
//   userName: string;
// };
// type comment = {
//   userName: string;
//   createdAT: string;
//   postText: string;
// };
export interface UseBlogProps {
  user: User | null;
  createdAT: string;
  userName: string;
  postText: string;
  author: {
    id: string;
    userName: string;
  };
  comments: {
    avatat: string;
    userName: string;
    createdAT: string;
    postText: string;
  };
}

// { user }: UseBlogProps | null
export const useUserCurrent = (post?: boolean) => {
  const [cuser, setCuser] = useState<any[]>();
  const { userCurrent } = useAuth();

  useEffect(() => {
    const config = {};
    console.log(userCurrent?.uid);
    const q = query(
      collection(db, "Users")
      // where("user", "==", userCurrent?.uid)
      // orderBy("createdAT", "desc")
      // where("user", "==", userCurrent?.uid)
      //  : undefined
    );

    const unSubscribe = onSnapshot(q, (snapshot) => {
      setCuser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unSubscribe;
  }, []);

  return { cuser };
};
