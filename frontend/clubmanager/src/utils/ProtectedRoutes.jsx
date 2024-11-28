import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expiresIn");
  let isAuthenticated = false;

  if (token && expirationTime && Date.now() < Number(expirationTime)) {
    isAuthenticated = true;

    const timeToExpire = Number(expirationTime) - Date.now();

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      isAuthenticated = false;
      navigate("/login");
    }, timeToExpire);
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    isAuthenticated = false;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" />
      <Toast message="Twoja sesja wygasła." />
    </>
  );
};

export default ProtectedRoutes;
