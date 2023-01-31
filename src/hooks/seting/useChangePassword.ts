import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";

export const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(5, { message: "the password is too short" })
      .trim(),
    confirmPassword: z
      .string()
      .min(5, { message: "the password is too short" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The email should be the same",
    path: ["confirmPassword"],
  });

type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

export const useChangePassword = () => {
  const { upDatePassword, setisReAuth } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const submit = async ({
    password,
    confirmPassword,
  }: ChangePasswordSchemaType) => {
    try {
      upDatePassword(password);
      toast.success("Your password has been changed");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setisReAuth(false);
    }
  };
  return { handleSubmit, register, errors, submit };
};
