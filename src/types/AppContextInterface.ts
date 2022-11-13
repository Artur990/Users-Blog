import { User } from "firebase/auth";
export interface AppContextInterface {
  userCurrent: User | null;
  blog: any;
  signUp: (
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    photoNumber: string
  ) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  handleGoogleLogin: () => void;
  upDatePassword: (password: string) => void;
  upDateEmail: (email: string) => void;
  reAuth: (password: string) => void;
  deleteAccount: () => void;
  deletePost: (id: string) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // isOpen: boolean;
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  // isRegister: boolean;
  setisReAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isReAuth: boolean;
}
