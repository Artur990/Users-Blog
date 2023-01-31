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
  AuthError,
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { AppContextInterface } from "../types/AppContextInterface";
import { auth, db } from "../firebase/config";
import moment from "moment";
// import { PrivatedRoute } from "../utils/PrivateRoute";

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
  const [currentUsersRoot, setcurrentUsersRoot] = useState<boolean>(false);
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
    setcurrentUsersRoot(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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
      });
      // currentUsersRoot
      setcurrentUsersRoot(true);
      navigate("/");
      toast.success("You have been registered");
      return userCredentials;
    } catch (err) {
      console.error(err as AuthError);
      toast.error("Something went wrong");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setcurrentUsersRoot(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setcurrentUsers(userCredentials.user);
      setcurrentUsersRoot(true);
      toast.success("You have been logged in");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setcurrentUsers(null);
      toast.success("You have been logged out");
      setcurrentUsersRoot(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    try {
      const provaider = new GoogleAuthProvider();
      signInWithPopup(auth, provaider).then(() => {
        addDoc(collectionRef, {
          name: auth.name,
          email: auth?.currentUser?.email,
          password: "",
          phoneNumber: auth?.currentUser?.phoneNumber,
          uid: auth?.currentUser?.uid,
          photoURL: "",
          isAdmin: false,
        });
        setcurrentUsersRoot(true);
        return navigate("/");
      });
    } catch (error) {}
  };
  const reAuth = async (password: string) => {
    setIsLoading(true);
    const credential = EmailAuthProvider.credential(
      currentUsers?.email as string,
      password
    );
    try {
      setisReAuth(true);
      if (currentUsers) {
        await reauthenticateWithCredential(currentUsers, credential);
      }
      navigate("/accountSettings");
    } catch (error) {
      setisReAuth(false);
      toast.error("Something went wrong");
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
      toast.success("Your password has been changed");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
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
      toast.success("Your email has been changed");
    } catch (error) {
      toast.error("Something went wrong");
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
      }
      toast.success("Your account has been deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setcurrentUsers(firebaseUser);
      }
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
    isLoading,
    setIsLoading,
    reAuth,
    isReAuth,
    setisReAuth,
    currentUsersRoot,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
