import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";
import { useUserContext } from "../context/UserContext";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { setRole } = useUserContext();
  const dispatch = useDispatch();

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    await setRole("");
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="navbar fixed z-50 -top-0 bg-base-200 h-16">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent">
          Club Manager
        </Link>
        <ThemeChanger />
      </div>
      <div className="navbar-end">
        <button
          to="/login"
          className="btn btn-secondary btn-sm mr-2 h-10"
          onClick={logout}
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default Navbar;
