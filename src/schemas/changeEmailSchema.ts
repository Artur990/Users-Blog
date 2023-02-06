import { z } from 'zod'

export const ChangeEmailSchema = z.object({
  email: z.string().email('wpisz poprawny adres').min(5).max(15),
})
export type ChangeEmailSchemaType = z.infer<typeof ChangeEmailSchema>
