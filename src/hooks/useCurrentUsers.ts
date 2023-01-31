import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../firebase/config";

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

export const useCurrentUsers = (post?: boolean) => {
  const [user, setUser] = useState<any[]>();

  useEffect(() => {
    const q = query(collection(db, "Users"));

    const unSubscribe = onSnapshot(q, (snapshot) => {
      setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unSubscribe;
  }, []);

  return { user };
};
