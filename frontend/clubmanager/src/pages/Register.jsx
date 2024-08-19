import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VerificationCard from "../components/VerificationCard";
import SignUpCard from "../components/SignUpCard";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [verify, setVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitRegister = async (
    e,
    { firstName, lastName, email, password, phoneNumber, clubNip, clubName }
  ) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    const newClub = {
      phoneNumber,
      clubNip,
      clubName,
    };

    try {
      const userRes = await axios.post(`/api/auth/signup`, newUser);
      newClub["owner"] = userRes.data;
      console.log("klub: ", newClub);

      const clubRes = await axios.post(`/api/clubs`, newClub);
      console.log("odp: ", clubRes.data);

      setEmail(email);
      setPassword(password);
      setVerify(true);
      setLoading(false);
    } catch (error) {
      console.error("Error during signing up: ", error);
      setLoading(false);
    }
  };

  const submitVerify = async (e, { pin }) => {
    e.preventDefault();
    setLoading(true);
    const verificationCode = pin.join("");

    const newVerification = {
      email,
      verificationCode,
    };

    console.log(newVerification);

    try {
      const verRes = await axios.post(`/api/auth/verify`, newVerification);
      console.log(verRes.response);
    } catch (error) {
      console.error("Error during verification process: ", error);
    }
    loginAfterSigningUp(e);
  };

  const loginAfterSigningUp = async (e) => {
    e.preventDefault();

    const newLogin = {
      email,
      password,
    };

    console.log("dane logowania: ", newLogin);

    try {
      const loginRes = await axios.post(`/api/auth/login`, newLogin);
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
    <section className="bg-base-200 flex items-center justify-center min-h-screen">
      {verify ? (
        <VerificationCard submitVerify={submitVerify} loading={loading} />
      ) : (
        <SignUpCard submitRegister={submitRegister} loading={loading} />
      )}
    </section>
  );
};

export default Register;
