import React from "react";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import OwnerDashboard from "../components/dashboard/OwnerDashboard";
import CoachDashboard from "../components/dashboard/CoachDashboard";
import CompetitorDashboard from "../components/dashboard/CompetitorDashboard";
import { useUserContext } from "../context/UserContext";

const HomePage = () => {
  const { role, loading } = useUserContext();

  return (
    <section className="py-8 xl:py-0">
      <section className="bg-base-200 flex justify-center items-center xl:min-h-screen">
        {loading ? <span className="loading loading-spinner"></span> : ""}
        {role === "ADMIN" && <AdminDashboard />}
        {role === "OWNER" && <OwnerDashboard />}
        {role === "COACH" && <CoachDashboard />}
        {role === "COMPETITOR" && <CompetitorDashboard />}
      </section>
    </section>
  );
};

export default HomePage;
