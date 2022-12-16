import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "./RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResultHandler } from "../types/ResultHandler";
import { useAuth } from "./../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./../firebase/config";
type A = { v: string };

export const useRegisterUser = ({ onError, onSuccess }: ResultHandler) => {
  const navigate = useNavigate();
  const { signUp, currentUsers } = useAuth();
  const { handleSubmit, ...form } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleRegisterUser = ({
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
  }: RegisterSchemaType) => {
    setIsLoading(true);
    console.log(name);
    try {
      console.log("rejsestracja...");
      signUp(email, name, password, phoneNumber);

      onSuccess?.();
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
      handleRegisterUser: handleSubmit(handleRegisterUser),
      ...form,
    },
  };
};
