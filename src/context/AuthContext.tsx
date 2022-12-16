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
  updateProfile,
  AuthError,
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { AppContextInterface } from "../types/AppContextInterface";
import { auth, db } from "../firebase/config";
import moment from "moment";

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
  const [currentUsers, setcurrentUsers] = useState<User | null>(null);
  const [isReAuth, setisReAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const collectionRef = collection(db, "Users");
  const signUp = async (
    email: string,
    name: string,
    password: string,
    phoneNumber: string
  ) => {
    setIsLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(name);
      setcurrentUsers(userCredentials.user);
      addDoc(collectionRef, {
        id: moment().format(),
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        uid: userCredentials.user.uid,
        photoURL: "",
        isAdmin: false,
        // collectionRef,
      });
      navigate("/");
      toast.success("Zostałeś zarejstrowany");
      return userCredentials;
    } catch (err) {
      console.error(err as AuthError);

      toast.error("coś poszło nie tak");
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
      setcurrentUsers(userCredentials.user);
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
      setcurrentUsers(null);
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
      phoneNumber: auth?.currentUser?.phoneNumber,
      uid: auth?.currentUser?.uid,
      photoURL: "",
      isAdmin: false,
    });
    return signInWithPopup(auth, provaider);
  };
  const reAuth = async (password: string) => {
    setIsLoading(true);
    const credential = EmailAuthProvider.credential(
      currentUsers?.email as string,
      password
    );
    try {
      setisReAuth(true);
      console.log(currentUsers);
      if (currentUsers) {
        await reauthenticateWithCredential(currentUsers, credential);
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
      if (currentUsers) {
        updatePassword(currentUsers, password);
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
      if (currentUsers) {
        await updateEmail(currentUsers, email);
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
      if (currentUsers) {
        await deleteUser(currentUsers);
        await deleteDoc(doc(db, "Users", currentUsers.uid));
        // await deleteDoc(doc(db, "Users", ));
      }
      toast.success("Twoj konto zostało usunięte");
    } catch (error) {
      toast.error("coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };
  const upDateProfil = async (props: any) => {
    // try {
    //   if (currentUsers) {
    //     await updateProfile(currentUsers, props);
    //   }
    // } catch (error) {}
    // updateUser();
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setcurrentUsers(firebaseUser);
      }
      console.log(auth);
      console.log("user status changed");
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUsers,
    signUp,
    login,
    logout,
    handleGoogleLogin,
    upDateEmail,
    upDatePassword,
    deleteAccount,
    upDateProfil,
    isLoading,
    setIsLoading,
    reAuth,
    isReAuth,
    setisReAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
