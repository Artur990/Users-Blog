import { z } from 'zod'

export const ReAuthSchema = z.object({
  password: z.string().min(5, { message: 'Password is too short' }).trim(),
})

export type ReAuthSchemaSchemaType = z.infer<typeof ReAuthSchema>
