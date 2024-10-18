import React from "react";
import AccessLayout from "./AccessLayout";
import MainLayout from "./MainLayout";

const ConditionalLayout = () => {
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

  return isAuthenticated ? <MainLayout /> : <AccessLayout />;
};

export default ConditionalLayout;
