import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInCard from "../components/auth/SignInCard";
import axiosInstance from "../config/axiosInstance";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitLogin = async (e, { email, password }) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const newLogin = {
      email,
      password,
    };

    try {
      const loginRes = await axiosInstance.post(`/auth/login`, newLogin);
      localStorage.setItem("token", loginRes.data.token);
      const expirationTime = Date.now() + loginRes.data.expiresIn;
      localStorage.setItem("expiresIn", expirationTime);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error during login process: ", error);
      setErrors(error.response.data);
      setLoading(false);
    }
  };

  return (
    <section className="bg-base-200 flex items-center justify-center min-h-screen">
      <SignInCard
        submitLogin={submitLogin}
        loading={loading}
        errors={errors}
        setErrors={setErrors}
      />
    </section>
  );
};

export default Login;
