import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

const InvitationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidToken, setIsValidToken] = useState(false);

  const token = new URLSearchParams(location.search).get("token");

  const validateToken = async () => {
    try {
      const response = await axiosInstance.get(
        `/invitations/validate?token=${token}`
      );
      setIsValidToken(true);
    } catch (error) {
      setIsValidToken(false);
    }
  };

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  return (
    <section className="py-8 xl:py-0">
      <section className="bg-base-200 flex justify-center items-center xl:min-h-screen">
        <div>Invitation</div>
      </section>
    </section>
  );
};

export default InvitationPage;
