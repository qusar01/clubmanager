import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordCard = ({
  submitForgotPassword,
  loading,
  errors,
  setErrors,
}) => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForgotPassword(e, { email });
  };

  return (
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
          Resetowanie hasła
        </p>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 p-2 mx-auto w-full"
        >
          <label
            className={`input input-bordered flex items-center gap-2 ${
              errors.email ? "border-red-500 text-red-500" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className={`grow ${errors.email ? "placeholder-red-500" : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              onFocus={() =>
                setErrors((prevErrors) => ({ ...prevErrors, email: null }))
              }
            />
          </label>
          {errors.email && (
            <span className="prose text-red-500 text-sm">{errors.email}</span>
          )}
          <button
            type="submit"
            className="btn btn-primary w-48 content-center w-full"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>Wyślij</span>
            )}
          </button>
        </form>
        <p className="prose text-center mb-2 text-sm">
          <Link to="/login" className="text-blue-500 text-sm">
            Wróć do logowania
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;
