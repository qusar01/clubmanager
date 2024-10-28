import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import VerificationCard from "../components/auth/VerificationCard";
import SignUpCard from "../components/auth/SignUpCard";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [verify, setVerify] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitRegister = async (
    e,
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      birthDate,
      phoneNumber,
      clubNip,
      clubName,
    }
  ) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      ["phoneNumber"]: phone,
      birthDate,
    };

    const newClub = {
      phoneNumber,
      clubNip,
      clubName,
    };

    const newOwner = {
      registerUserDto: newUser,
      clubDto: newClub,
    };

    console.log(newOwner);
    try {
      const registerRes = await axiosInstance.post(`/auth/signup`, newOwner);
      setEmail(email);
      setPassword(password);
      setVerify(true);
      setLoading(false);
    } catch (error) {
      console.error("Error during signing up: ", error);
      setLoading(false);
      setErrors(error.response.data);
    }
  };

  const submitVerify = async (e, { pin }) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const verificationCode = pin.join("");

    const newVerification = {
      email,
      verificationCode,
    };

    console.log(newVerification);

    try {
      const verRes = await axiosInstance.post(`/auth/verify`, newVerification);
      console.log(verRes.response);
      await loginAfterSigningUp(e);
    } catch (error) {
      console.error("Error during verification process: ", error);
      setErrors(error.response.data);
      setLoading(false);
    }
  };

  const loginAfterSigningUp = async (e) => {
    e.preventDefault();

    const newLogin = {
      email,
      password,
    };

    console.log("dane logowania: ", newLogin);

    try {
      const loginRes = await axiosInstance.post(`/auth/login`, newLogin);
      localStorage.setItem("token", loginRes.data.token);
      const expirationTime = Date.now() + loginRes.data.expiresIn;
      localStorage.setItem("expiresIn", expirationTime);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error during login process: ", error);
      setLoading(false);
    }
  };

  return (
    <section className="bg-base-200 flex items-center justify-center min-h-screen min-w-screen">
      {verify ? (
        <VerificationCard
          submitVerify={submitVerify}
          loading={loading}
          errors={errors}
          setErrors={setErrors}
        />
      ) : (
        <SignUpCard
          submitRegister={submitRegister}
          loading={loading}
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </section>
  );
};

export default Register;
