import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// export const ProtectedRoute = ({ user, children }: any) => {
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };
export const PrivatedRoute = () => {
  const { isReAuth } = useAuth();
  const auth = isReAuth;
  return auth ? <Outlet /> : <Navigate to="/" />;
};
