import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!role) {
      setLoading(true);
      const intervalId = setInterval(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
            setLoading(false);
          } catch (error) {
            console.error("Invalid token: ", error);
            clearInterval(intervalId);
          }
        }
      }, 500);
      return () => clearInterval(intervalId);
    }
    setLoading(false);
  }, [role, loading, setRole]);

  return (
    <UserContext.Provider value={{ role, loading, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
