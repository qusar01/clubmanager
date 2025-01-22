import React, { useEffect, useState } from "react";
import UserStatsChart from "./UserStatsChart";
import axiosInstance from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import ClubRanking from "./ClubRanking";
import { useUserContext } from "../../context/UserContext";

const UserStats = () => {
  const [attendances, setAttendances] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [ranking, setRanking] = useState([]);
  const { role } = useUserContext();
  const userId = useSelector((state) => state.user.userId);
  const clubId = useSelector((state) => state.user.clubId);

  useEffect(() => {
    fetchStats();
  }, []);
  useEffect(() => {
    fetchRanking();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get(`/stats/user/${userId}`);
      setAttendances(response.data.attendances);
      setTotalEvents(response.data.events + response.data.trainings);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRanking = async () => {
    try {
      const response = await axiosInstance.get(`/stats/club/${clubId}`);
      setRanking(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl w-full lg:w-3/4 max-w-[1000px] animate-in fade-in zoom-in mt-16">
      <div className="card-body items-center justify-center w-full">
        <div className="text-xl lg:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center mx-auto pt-4">
          <span className="font-bold">Statystyki</span>
        </div>
        <div className="w-full flex flex-col items-center justify-around sm:flex-row">
          {role === "COMPETITOR" && (
            <UserStatsChart
              attendances={attendances}
              totalEvents={totalEvents}
            />
          )}
          <ClubRanking
            ranking={ranking}
            isComp={role === "COMPETITOR" ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default UserStats;
