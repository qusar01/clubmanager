import React from "react";
import OwnerAccount from "../components/account/OwnerAccount";
import { useUserContext } from "../context/UserContext";
import DelUserModal from "../components/modals/DelUserModal";

const AccountPage = () => {
  const { role, loading } = useUserContext();

  return (
    <section className="py-1 bg-base-200">
      <section className="bg-base-200 flex justify-center my-52">
        {loading ? <span className="loading loading-spinner mt-64"></span> : ""}
        {role === "ADMIN" && <AdminDashboard />}
        {role === "OWNER" && <OwnerAccount />}
        {role === "COACH" && <CoachDashboard />}
        {role === "COMPETITOR" && <CompetitorDashboard />}
      </section>
    </section>
  );
};

export default AccountPage;
