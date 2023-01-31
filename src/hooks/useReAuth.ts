import { useForm } from "react-hook-form";
import { ReAuthSchema } from "../utils/schemas/ReAuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResultHandler } from "../types/ResultHandler";
import { useAuth } from "../context/AuthContext";

export const useReAuthUser = ({ onError, onSuccess }: ResultHandler) => {
  const { reAuth } = useAuth();
  const { handleSubmit, ...form } = useForm<any>({
    resolver: zodResolver(ReAuthSchema),
  });

  const handleReAuthSchema = ({ password }: any) => {
    try {
      reAuth(password);
      onSuccess = () => {};
    } catch (err) {
      onError = () => {};
    } finally {
    }
  };

  return {
    handleSubmit,
    form: {
      handleReAuthSchema: handleSubmit(handleReAuthSchema),
      ...form,
    },
  };
};
