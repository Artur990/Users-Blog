import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchemaType, LoginSchema } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResultHandler } from "../types/ResultHandler";
import { useAuth } from "./../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { string } from "zod";
type A = { v: string };

export const useLoginUser = ({ onError, onSuccess }: ResultHandler) => {
  const navigate = useNavigate();
  const { login, upDatePassword } = useAuth();
  const { handleSubmit, setValue, ...form } = useForm<any>({
    resolver: zodResolver(LoginSchema),
  });

  // useEffect(()=>{setValue('imie',user.name)},[isEditing])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginUser = ({ email, password }: any) => {
    setIsLoading(true);
    // const credential = EmailAuthProvider.credential(email, password);
    try {
      console.log("logowanie...");
      // if(login)
      //  const user =
      login(email, password);
      // upDatePassword(password);
      navigate("/");

      onSuccess?.();
    } catch (err) {
      onError?.(err as Error);
    } finally {
      // console.log("error finally");

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
