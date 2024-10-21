import React, { useEffect, useState } from "react";
import OwnerAccount from "../components/account/OwnerAccount";
import { useUserContext } from "../context/UserContext";
import axiosInstance from "../config/axiosInstance";

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

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <section className="py-1 bg-base-200">
      <section className="bg-base-200 flex justify-center my-52">
        {loading ? <span className="loading loading-spinner mt-64"></span> : ""}
        {role === "ADMIN" && <div></div>}
        {role === "OWNER" && <OwnerAccount userId={userId} clubId={clubId} />}
        {role === "COACH" && <CoachDashboard />}
        {role === "COMPETITOR" && <CompetitorDashboard />}
      </section>
    </section>
  );
};

export default AccountPage;
