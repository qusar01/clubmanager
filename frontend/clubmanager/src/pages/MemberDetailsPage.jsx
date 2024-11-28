import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import MemberCard from "../components/members/MemberCard";

const MemberDetailsPage = () => {
  const { role, loading } = useUserContext();
  const { memberId } = useParams();
  const [member, setMember] = useState({});

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
