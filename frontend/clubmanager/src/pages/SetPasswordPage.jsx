import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SetPasswordCard from "../components/auth/SetPasswordCard";
import axiosInstance from "../config/axiosInstance";

const SetPasswordPage = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  const submitSetPassword = async (e, { password }) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axiosInstance.put(`/auth/set-password?email=${email}`, null, {
        headers: {
          password: password,
        },
      });
      setLoading(false);
      setIsNewPassword(true);
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
    } catch (error) {
      console.error("Error during setting new password: ", error);
      setErrors(error.response.data);
      setLoading(false);
    }
  };
  return (
    <section className="bg-base-200 flex items-center justify-center min-h-screen">
      {isNewPassword ? (
        <div className="card bg-base-100 shadow-2xl w-96">
          <div className="card-body items-center">
            <div className="btn btn-ghost text-xl hover:bg-transparent w-full pointer-events-none">
              Club Manager
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </div>
            <p className="prose text-center pointer-events-none mb-2">
              Pomyślnie ustawiono nowe hasło
            </p>
            <p className="prose text-center mb-2 text-sm">
              <Link to="/login" className="text-blue-500 text-sm">
                Logowanie
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <SetPasswordCard
          submitSetPassword={submitSetPassword}
          loading={loading}
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </section>
  );
};

export default SetPasswordPage;
