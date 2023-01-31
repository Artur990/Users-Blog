import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchemaType, LoginSchema } from "../utils/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResultHandler } from "../types/ResultHandler";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLoginUser = ({ onError, onSuccess }: ResultHandler) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { handleSubmit, setValue, ...form } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginUser = ({ email, password }: LoginSchemaType) => {
    setIsLoading(true);
    try {
      login(email, password);
      navigate("/");
      onSuccess = () => {};
    } catch (err) {
      onError?.(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
    form: {
      handleLoginUser: handleSubmit(handleLoginUser),
      ...form,
    },
  };
};
