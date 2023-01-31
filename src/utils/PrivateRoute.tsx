import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export const PrivatedRoute = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return true ? <Outlet /> : <Navigate to="/" />;
};

export const PrivatedRouteReAuth = () => {
  const { isReAuth } = useAuth();
  const auth = isReAuth;
  return auth ? <Outlet /> : <Navigate to="/" />;
};
