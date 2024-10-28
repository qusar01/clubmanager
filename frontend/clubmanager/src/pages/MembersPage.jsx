import React, { useState, useEffect } from "react";
import MembersList from "../components/members/MembersList";
import axiosInstance from "../config/axiosInstance";
import { useUserContext } from "../context/UserContext";

const MembersPage = () => {
  const { role, loading } = useUserContext();
  const [userId, setUserId] = useState("");
  const [clubId, setClubId] = useState("");

  const fetchUser = async (e) => {
    try {
      const currUser = await axiosInstance.get(`/users/me`);
      setUserId(currUser.data.id);
      setClubId(currUser.data.clubId);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClub = async (e) => {
    if (!clubId) {
      try {
        const currClub = await axiosInstance.get(`/clubs/users/${userId}`);
        setClubId(currClub.data.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchMembers = async (e) => {
    try {
      const resp = await axiosInstance.get(`/clubs/${clubId}/users`);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchClub();
  }, [userId]);

  useEffect(() => {
    fetchMembers();
  }, [clubId]);

  return (
    <section className="py-1 bg-base-200">
      <section className="bg-base-200 flex justify-center my-48">
        {loading ? (
          <span className="loading loading-spinner mt-64"></span>
        ) : (
          <MembersList />
        )}
      </section>
    </section>
  );
};

export default MembersPage;
