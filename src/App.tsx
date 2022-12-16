import React from "react";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <>
        <Loading />
        <Navbar />
        <Toaster />
        <Outlet />
      </>
    </AuthContextProvider>
  );
};

export default App;
