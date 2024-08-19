import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expiresIn");

  useEffect(() => {
    if (token && expirationTime && Date.now() < expirationTime) {
      // token is valid
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 border-solid border-b border-gray-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent">
          Club Manager
        </Link>
        <ThemeChanger />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
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
