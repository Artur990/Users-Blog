import { z } from 'zod'

export const RegisterSchema = z
  .object({
    email: z.string().email('Enter the correct address').min(5).max(15),
    password: z.string().min(5, 'Password is too short').trim(),
    name: z.string().min(4, 'First name must be at least 4 characters long'),
    confirmPassword: z.string().min(5, 'Password is too short'),
    phoneNumber: z.string().min(6, 'Phone number is too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The email should be the same',
    path: ['confirmPassword'],
  })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
