import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type ChangeEmailSchemaType = z.infer<typeof ChangeEmailSchema>;
export const ChangeEmailSchema = z.object({
  email: z.string().email("wpisz poprawny adres").min(5).max(15),
});
export const useChangeEmail = () => {
  const { upDateEmail } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangeEmailSchemaType>({
    resolver: zodResolver(ChangeEmailSchema),
  });

  const submit = async ({ email }: ChangeEmailSchemaType) => {
    try {
      upDateEmail(email);
      navigate("/");
      toast.success("Twoj email zostało zmienione");
    } catch (error) {
      toast.error("coś poszło nie tak");
    }
  };
  return { handleSubmit, register, errors, submit };
};
