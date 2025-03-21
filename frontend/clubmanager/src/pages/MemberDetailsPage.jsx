import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import MemberCard from "../components/members/MemberCard";
import ErrorCard from "../components/ErrorCard";

const MemberDetailsPage = () => {
  const { role, loading } = useUserContext();
  const { memberId } = useParams();
  const [member, setMember] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (memberId) {
      fetchMember();
    }
  }, [memberId]);

  const fetchMember = async (e) => {
    try {
      const response = await axiosInstance.get(`/users/${memberId}`);
      setMember(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!location.state?.fromLink) {
    return (
      <section className="py-0">
        <section className="bg-base-200 flex justify-center items-center min-h-screen">
          <ErrorCard
            error="401 Brak Dostępu"
            message="Przepraszamy, nie masz uprawnień do dostępu do tej strony. Zaloguj się
          przy użyciu odpowiednich danych uwierzytelniających."
          />
        </section>
      </section>
    );
  }

  return (
    <section className="py-0">
      <section className="bg-base-200 flex justify-center items-center min-h-screen">
        {(loading && Object.keys(member) !== 0) || !role ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <MemberCard member={member} />
        )}
      </section>
    </section>
  );
};

export default MemberDetailsPage;
