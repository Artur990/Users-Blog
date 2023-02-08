import { User } from 'firebase/auth'

export interface AppContextInterface {
  currentUsers: User | null
  // funkcje mozna opisywac tak w typescriptcie, dzieki temu TS lepiej wie ze to musi byc funkcja
  signUp(
    email: string,
    name: string,
    password: string,
    phoneNumber: string
  ): void
  login: (email: string, password: string) => void
  logout: () => void
  handleGoogleLogin: () => void
  upDatePassword: (password: string) => void
  upDateEmail: (email: string) => void
  reAuth: (password: string) => void
  deleteAccount: () => void
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setisReAuth: React.Dispatch<React.SetStateAction<boolean>>
  isReAuth: boolean
}
