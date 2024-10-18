import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expiresIn");
  let isAuthenticated = false;

  if (token && expirationTime && Date.now() < Number(expirationTime)) {
    isAuthenticated = true;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    isAuthenticated = false;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
