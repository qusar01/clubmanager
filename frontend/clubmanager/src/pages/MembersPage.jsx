import React, { useState, useEffect } from "react";
import MembersList from "../components/members/MembersList";
import axiosInstance from "../config/axiosInstance";
import { useUserContext } from "../context/UserContext";
import { useSelector } from "react-redux";

const MembersPage = () => {
  const { role, loading } = useUserContext();
  const clubId = useSelector((state) => state.user.clubId);
  const [members, setMembers] = useState([]);

  const fetchMembers = async (e) => {
    try {
      const resp = await axiosInstance.get(`/clubs/${clubId}/users`);
      setMembers(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (clubId) {
      fetchMembers();
    }
  }, [clubId]);

  return (
    <section className="py-0">
      <section className="bg-base-200 flex justify-center items-center min-h-screen">
        {loading || !role ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <MembersList members={members} setMembers={setMembers} role={role} />
        )}
      </section>
    </section>
  );
};

export default MembersPage;
