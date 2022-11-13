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
  const { signUp, userCurrent } = useAuth();
  const { handleSubmit, ...form } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const collectionRef = collection(db, "Users");
  const handleRegisterUser = ({
    email,
    password,
    confirmPassword,
    photoNumber,
    name,
  }: RegisterSchemaType) => {
    setIsLoading(true);
    console.log(email, password, confirmPassword, photoNumber, name);
    try {
      console.log("rejsestracja...");
      signUp(email, password, confirmPassword, photoNumber, name);

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
