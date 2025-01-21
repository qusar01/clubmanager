import React from "react";
import UserStats from "../components/stats/UserStats";

const StatsPage = () => {
  return (
    <section className="bg-base-200 flex items-center justify-center min-h-screen min-w-screen">
      <UserStats />
    </section>
  );
};

export default StatsPage;
