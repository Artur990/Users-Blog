import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";

export const PrivatedRoute = () => {
  const { currentUsers } = useAuth();

  return true ? <Outlet /> : <Navigate to="/" />;
};

export const PrivatedRouteReAuth = () => {
  const { isReAuth } = useAuth();
  const auth = isReAuth;
  return auth ? <Outlet /> : <Navigate to="/" />;
};
