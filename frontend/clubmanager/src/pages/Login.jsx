import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInCard from "../components/SignInCard";
import axios from "axios";

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
    console.log(newLogin);

    try {
      const loginRes = await axios.post(`/api/auth/login`, newLogin);
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
