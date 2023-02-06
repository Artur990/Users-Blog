import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Enter the correct addres' })
    .min(5)
    .max(15),
  password: z.string().min(5, { message: 'Password is too short' }).trim(),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
