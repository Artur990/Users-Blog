import { useState, useEffect } from "react";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { PostType } from "../../types/postType";

export const useBlog = (post: boolean) => {
  const [blog, setBlog] = useState<PostType[]>([]);
  const { setIsLoading } = useAuth();
  const [user] = useAuthState(auth);
  useEffect(() => {
    setIsLoading(true);

    const q = query(
      collection(db, "react-blog2"),
      post ? where("user", "==", user?.uid) : orderBy("createdAT", "desc")
    );

    const unSubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
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
