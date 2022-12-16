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
import { auth, db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { PostType } from "../types/postType";

// { user }: UseBlogProps | null
export const useBlog = (post: boolean) => {
  const [blog, setBlog] = useState<PostType[]>([]);
  const { setIsLoading } = useAuth();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    // const { props } = props;
    // if (post) {
    // setIsLoading(true);
    // }
    setIsLoading(true);
    // if (!user) {
    // return;
    // }
    const config = {};
    const q = query(
      collection(db, "react-blog2"),
      post ? where("user", "==", user?.uid) : orderBy("createdAT", "desc")
    );

    const unSubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        console.log(snapshot.docs);
        setBlog(
          snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
    setIsLoading(false);
    return unSubscribe;
  }, []);

  return { blog };
};
