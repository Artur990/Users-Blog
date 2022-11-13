import { useForm } from "react-hook-form";
import { ReAuthSchema, ReAuthSchemaSchemaType } from "./ReAuthSchema";
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
      onSuccess?.();
    } catch (err) {
      onError?.(err as Error);
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
