import React from "react";
import { Outlet } from "react-router-dom";
import ThemeChanger from "../components/ThemeChanger";

const AccessLayout = () => {
  return (
    <>
      <ThemeChanger isHidden={true} />
      <Outlet />
    </>
  );
};

export default AccessLayout;
