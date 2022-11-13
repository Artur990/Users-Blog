import React, { useContext, useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  deleteUser,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { AppContextInterface } from "../types/AppContextInterface";
import { auth, db } from "../firebase/config";

export const AuthContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);
export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children: JSX.Element;
}
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [userCurrent, setUserCurrent] = useState<User | null>(null);
  const [blog, setBlog] = useState<any>();
  // const [isOpen, setIsOpen] = useState(false);
  // const [isRegister, setIsRegister] = useState(false);
  const [isReAuth, setisReAuth] = useState(false);
  //userCurrent.isAdmin && <button>edit</button>
  const [isLoading, setIsLoading] = useState(false);
  const collectionRef = collection(db, "users");
  const signUp = async (
    email: string,
    password: string,
    photoNumber: string,
    name: string
  ) => {
    setIsLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserCurrent(userCredentials.user);
      addDoc(collectionRef, {
        name: name,
        email: email,
        password: password,
        photoNumber: photoNumber,
        uid: userCredentials.user.uid,
        photoURL: "",
        isAdmin: false,
        // collectionRef,
      });
      navigate("/");
      toast.success("Zostałeś zarejstrowany");
      return userCredentials;
    } catch (err) {
      console.error(err);
      toast.error("ten email jest nie ważny");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserCurrent(userCredentials.user);
      toast.success("Zostałeś zalogowany");
    } catch (err) {
      console.error(err, "dsa");
      toast.error("Nie prawidłowy login lub hasło");
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUserCurrent(null);
      toast.success("Zostałeś wylogowany");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    const provaider = new GoogleAuthProvider();
    navigate("/");

    addDoc(collectionRef, {
      name: auth.name,
      email: auth?.currentUser?.email,
      password: "",
      photoNumber: auth?.currentUser?.phoneNumber,
      uid: auth?.currentUser?.uid,
      photoURL: "",
      isAdmin: false,
    });
    return signInWithPopup(auth, provaider);
  };
  const reAuth = async (password: string) => {
    setIsLoading(true);
    const credential = EmailAuthProvider.credential(
      userCurrent?.email as string,
      password
    );
    try {
      setisReAuth(true);
      console.log(userCurrent);
      if (userCurrent) {
        await reauthenticateWithCredential(userCurrent, credential);
      }
      navigate("/accountSettings");
    } catch (error) {
      setisReAuth(false);
      toast.error("coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };
  const upDatePassword = async (password: string) => {
    setIsLoading(true);
    try {
      if (userCurrent) {
        updatePassword(userCurrent, password);
      }
      toast.success("Twoj hasło zostało zmienione");
      navigate("/");
    } catch (error) {
      toast.error("coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };

  const upDateEmail = async (email: string) => {
    setIsLoading(true);
    try {
      if (userCurrent) {
        await updateEmail(userCurrent, email);
      }
      toast.success("Twoj email zostało zmienione");
    } catch (error) {
      toast.error("coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };
  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      if (userCurrent) {
        await deleteUser(userCurrent);
        await deleteDoc(doc(db, "Users", userCurrent.uid));
        // await deleteDoc(doc(db, "Users", ));
      }
      toast.success("Twoj konto zostało usunięte");
    } catch (error) {
      toast.error("coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };
  const deletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, "react-blog2", id));
      console.log("post został usunięty ");
    } catch (error) {
      console.log("z usuwaniem poszło coś nie tak");
    }
    //post.id
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserCurrent(firebaseUser);
      }
      console.log("user status changed");
      console.log(auth.currentUser);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    const config = {};
    const q = query(
      collection(db, "react-blog2"),
      // orderBy("createdAT", "desc")
      where("user", "==", `'${auth.currentUser?.uid}'`)
      // add userCurent
    );
    // const unSubscribe = onSnapshot(q, (snapshot) => {
    // setBlog(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
    // return unSubscribe;
  }, []);

  const value = {
    userCurrent,
    signUp,
    login,
    logout,
    handleGoogleLogin,
    upDateEmail,
    upDatePassword,
    deleteAccount,
    deletePost,
    isLoading,
    setIsLoading,
    reAuth,
    isReAuth,
    setisReAuth,
    blog,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
