import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "../utils/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResultHandler } from "../types/ResultHandler";
import { useAuth } from "../context/AuthContext";

export const useRegisterUser = ({ onError, onSuccess }: ResultHandler) => {
  const { signUp } = useAuth();
  const { handleSubmit, ...form } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleRegisterUser = ({
    name,
    email,
    password,
    phoneNumber,
  }: RegisterSchemaType) => {
    setIsLoading(true);
    try {
      signUp(email, name, password, phoneNumber);
      onSuccess = () => {};
    } catch (err) {
      onError = () => {};
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
    form: {
      handleRegisterUser: handleSubmit(handleRegisterUser),
      ...form,
    },
  };
};
