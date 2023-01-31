import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { PostType } from "../../types/postType";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { toast } from "react-hot-toast";

export const useMyPost = () => {
  const { setIsLoading } = useAuth();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState<PostType[]>();
  const postCollectionRef = collection(db, "react-blog2");
  const getPosts = async () => {
    if (loading) {
      setIsLoading(true);
    }
    if (!user) {
      return;
    }

    const q = query(postCollectionRef, where("user", "==", user?.uid));
    const UnSubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    setIsLoading(false);
    return UnSubscribe;
  };
  const deletePost = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "react-blog2", id));
      toast.success("Twój post został usunięty");
    } catch (error) {
      toast.error("coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, [user, loading]);
  return { posts, deletePost };
};
