import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useHandlerClose = () => {
  const { deleteAccount, setisReAuth } = useAuth();
  const navigate = useNavigate();
  const handlerClose = useCallback(() => {
    navigate("/");
    setisReAuth(false);
  }, []);
  return { handlerClose };
};
