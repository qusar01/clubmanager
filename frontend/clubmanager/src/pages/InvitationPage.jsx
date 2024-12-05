import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import InvitationCard from "../components/invitation/InvitationCard";
import ErrorCard from "../components/ErrorCard";
import VerificationCard from "../components/auth/VerificationCard";
import { useDispatch } from "react-redux";
import { setClubId, setUserId } from "../redux/slices/userSlice";

const InvitationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isValidToken, setIsValidToken] = useState(false);
  const [invId, setInvId] = useState("");
  const [verify, setVerify] = useState(false);

  const token = new URLSearchParams(location.search).get("token");

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [clubId, setClubIdd] = useState("");

  const submitRegister = async (
    e,
    { firstName, lastName, email, password, phone, birthDate, role, clubId }
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
      role,
      clubId,
    };

    try {
      const registerRes = await axiosInstance.post(
        `/auth/signup-member`,
        newUser
      );
      setEmail(email);
      setPassword(password);
      setLoading(false);
      setVerify(true);
      await axiosInstance.delete(`/invitations/${invId}`);
    } catch (error) {
      console.error("Error during signing up: ", error);
      setLoading(false);
      setErrors(error.response.data);
    }
  };

  const submitVerify = async (e, { pin }) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
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
      const currUser = await axiosInstance.get(`/users/me`);
      dispatch(setUserId(currUser.data.id));
      dispatch(setClubId(clubId));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error during login process: ", error);
      setLoading(false);
    }
  };

  const validateToken = async () => {
    try {
      const response = await axiosInstance.get(
        `/invitations/validate?token=${token}`
      );
      setRole(response.data.role);
      setClubIdd(response.data.clubId);
      setEmail(response.data.email);
      setInvId(response.data.id);
      setLoading(false);
      setIsValidToken(true);
    } catch (error) {
      setIsValidToken(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  return (
    <section className="bg-base-200 flex items-center justify-center min-h-screen min-w-screen">
      {verify && (
        <VerificationCard
          submitVerify={submitVerify}
          loading={loading}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {isValidToken && !verify && (
        <InvitationCard
          submitRegister={submitRegister}
          loading={loading}
          errors={errors}
          setErrors={setErrors}
          role={role}
          clubId={clubId}
          email={email}
        />
      )}
      {!isValidToken && !loading && !verify && (
        <ErrorCard
          error="Nie znaleziono"
          message={
            "Nieprawidłowy lub wygasły token zaproszenia. Upewnij się, że korzystasz z poprawnego linku lub poproś o ponowne wysłanie zaproszenia."
          }
        />
      )}
      {loading && <span className="spinner spinner-loading"></span>}
    </section>
  );
};

export default InvitationPage;
