import { confirmPasswordReset } from "firebase/auth";
import { z } from "zod";

export const RegisterSchema = z
  .object({
    // login: z.string().min(5, { message: "min 5 znakow" }),
    email: z.string().email("wpisz poprawny adres").min(5).max(15),
    password: z.string().min(5, { message: "hasło jest zbyt którkie" }).trim(),
    name: z.string().min(3, "Imię musi wymagać conajmiej 4 znaki"),
    // .matches (
    //   "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // ),
    confirmPassword: z.string().min(5, { message: "hasło jest zbyt krótkie" }),
    phoneNumber: z.string(),

    // isOptional.neOf("password", "Passwords must match")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Email powinnien być taki sam",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
