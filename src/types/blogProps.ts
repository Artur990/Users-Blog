import { User } from 'firebase/auth'

export interface UseBlogProps {
  user: User | null
  createdAT: string
  userName: string
  postText: string
  author: {
    id: string
    userName: string
  }
  comments: {
    avatat: string
    userName: string
    createdAT: string
    postText: string
  }
}
