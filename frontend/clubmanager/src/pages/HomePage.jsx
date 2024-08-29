import React from "react";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import OwnerDashboard from "../components/dashboard/OwnerDashboard";
import CoachDashboard from "../components/dashboard/CoachDashboard";
import CompetitorDashboard from "../components/dashboard/CompetitorDashboard";
import { useUserContext } from "../context/UserContext";

const HomePage = () => {
  const { role, loading } = useUserContext();

  return (
    <section className="py-1 bg-base-200">
      <section className="bg-base-200 flex justify-center my-32">
        {loading ? <span className="loading loading-spinner mt-64"></span> : ""}
        {role === "ADMIN" && <AdminDashboard />}
        {role === "OWNER" && <OwnerDashboard />}
        {role === "COACH" && <CoachDashboard />}
        {role === "COMPETITOR" && <CompetitorDashboard />}
      </section>
    </section>
  );
};

export default HomePage;
