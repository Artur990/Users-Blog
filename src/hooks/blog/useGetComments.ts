import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { Comment } from "../../types/CommentType";

export const useGetComments = ({ id }: { id: any }) => {
  const [allmessaege, setAllMessage] = useState<Comment[]>();

  const getComments = async () => {
    const docRef = doc(db, "react-blog2", id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessage(snapshot.data()?.comments as Comment[]);
    });
    return unsubscribe;
  };
  useEffect(() => {
    getComments();
  }, []);
  return { allmessaege, setAllMessage };
};
