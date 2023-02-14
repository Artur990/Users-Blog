import { z } from 'zod'

export const EditUsersSchema = z.object({
  name: z.string().min(3, 'Name must be at least 4 characters long'),
  email: z.string().email('Enter the correct address').min(5).max(15),
  password: z.string().min(5, 'Password is too short').trim(),
  phoneNumber: z.string().min(6),
})
export type EditUsersSchemaType = z.infer<typeof EditUsersSchema>
