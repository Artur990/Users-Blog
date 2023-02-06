import { z } from 'zod'

export const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(5, { message: 'the password is too short' })
      .trim(),
    confirmPassword: z
      .string()
      .min(5, { message: 'the password is too short' })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The email should be the same',
    path: ['confirmPassword'],
  })

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>
