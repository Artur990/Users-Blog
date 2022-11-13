import { z } from "zod";

export const ReAuthSchema = z.object({
  // login: z.string().min(5, { message: "min 5 znakow" }),
  password: z.string().min(5, { message: "hasło jest zbyt którkie" }).trim(),
});

export type ReAuthSchemaSchemaType = z.infer<typeof ReAuthSchema>;
