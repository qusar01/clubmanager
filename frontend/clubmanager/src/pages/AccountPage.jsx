import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axiosInstance from "../config/axiosInstance";
import Account from "../components/account/Account";

const AccountPage = () => {
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

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchClub();
  }, [userId]);

  return (
    <section className="py-1 bg-base-200">
      <section className="bg-base-200 flex justify-center my-48">
        {loading ? (
          <span className="loading loading-spinner mt-64"></span>
        ) : (
          <Account userId={userId} clubId={clubId} role={role} />
        )}
      </section>
    </section>
  );
};

export default AccountPage;
