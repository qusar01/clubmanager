import React, { useState } from "react";
import { Link } from "react-router-dom";

const InvitationCard = ({
  submitRegister,
  loading,
  errors,
  setErrors,
  role,
  clubId,
  email,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitRegister(e, {
      firstName,
      lastName,
      email,
      password,
      phone,
      birthDate,
      role,
      clubId,
    });
  };

  return (
    <div className="card bg-base-100 shadow-2xl w-full max-w-96 xl:max-w-[600px] animate-in fade-in zoom-in">
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
          Zarejestruj się w klubie
        </p>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 p-2 mx-4 w-full"
        >
          <p className="prose mb-2 text-sm">Dane członka</p>
          <div className="flex flex-col xl:flex-row space-y-4 xl:space-x-2 xl:space-y-0">
            <div className="xl:w-1/2">
              <label
                className={`input input-bordered flex items-center gap-2 ${
                  errors.firstName ? "border-red-500 text-red-500" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className={`grow ${
                    errors.firstName ? "placeholder-red-500" : ""
                  }`}
                  placeholder="Imię"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                  onFocus={() =>
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      firstName: null,
                    }))
                  }
                />
              </label>
              {errors.firstName && (
                <span className="prose text-red-500 text-sm">
                  {errors.firstName}
                </span>
              )}
            </div>
            <div className="xl:w-1/2">
              <label
                className={`input input-bordered flex items-center gap-2 ${
                  errors.lastName ? "border-red-500 text-red-500" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className={`grow ${
                    errors.lastName ? "placeholder-red-500" : ""
                  }`}
                  placeholder="Nazwisko"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                  onFocus={() =>
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      lastName: null,
                    }))
                  }
                />
              </label>
              {errors.lastName && (
                <span className="prose text-red-500 text-sm">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

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
              className={`grow ${
                errors.email ? "placeholder-red-500" : ""
              } pointer-events-none`}
              value={email}
              readOnly
            />
          </label>

          <label
            className={`input input-bordered flex items-center gap-2 ${
              errors.password ? "border-red-500 text-red-500" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className={`grow ${errors.password ? "placeholder-red-500" : ""}`}
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() =>
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: null,
                }))
              }
            />
          </label>
          {errors.password && (
            <span className="prose text-red-500 text-sm">
              {errors.password}
            </span>
          )}

          <label
            className={`input input-bordered flex items-center gap-2 ${
              errors.phoneNumber ? "border-red-500 text-red-500" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="number"
              className={`grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                errors.phoneNumber ? "placeholder-red-500" : ""
              }`}
              placeholder="Numer telefonu"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              onFocus={() =>
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  phoneNumber: null,
                }))
              }
            />
          </label>
          {errors.phoneNumber && (
            <span className="prose text-red-500 text-sm">
              {errors.phoneNumber}
            </span>
          )}

          <label
            className={`input input-bordered flex items-center gap-2 ${
              errors.birthDate ? "border-red-500 text-red-500" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className={`grow ${
                errors.birthDate ? "placeholder-red-500" : ""
              }`}
              placeholder="Data urodzenia"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              onFocus={(e) => {
                e.target.type = "date";
                setErrors((prevErrors) => ({ ...prevErrors, birthDate: null }));
              }}
              onBlur={(e) => (e.target.type = "text")}
            />
          </label>
          {errors.birthDate && (
            <span className="prose text-red-500 text-sm">
              {errors.birthDate}
            </span>
          )}

          <label
            className={`input input-bordered flex items-center gap-2 ${
              errors.email ? "border-red-500 text-red-500" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="text"
              className={`grow pointer-events-none`}
              value={role === "COACH" ? "Trener" : "Zawodnik"}
              readOnly
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary w-48 content-center w-full"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>Załóż konto</span>
            )}
          </button>
        </form>
        <p className="prose text-center mb-2 text-sm">
          Masz już konto?{" "}
          <Link to="/login" className="text-blue-500 text-sm">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default InvitationCard;
