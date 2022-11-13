import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("wpisz poprawny adres").min(5).max(15),
  password: z.string().min(5, { message: "hasło jest zbyt którkie" }).trim(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
