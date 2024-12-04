import React from "react";
import { Outlet } from "react-router-dom";
import ThemeChanger from "../components/ThemeChanger";
import Footer from "../components/Footer";

const AccessLayout = () => {
  return (
    <>
      <ThemeChanger isHidden={true} />
      <Outlet />
      <Footer />
    </>
  );
};

export default AccessLayout;
