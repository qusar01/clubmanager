import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useSelector } from "react-redux";

const AttendanceList = ({ eventType, setShowSuccessAttendance }) => {
  const [events, setEvents] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const clubId = useSelector((state) => state.user.clubId);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      let response;
      if (eventType === "trening") {
        response = await axiosInstance.get(
          `/trainings/club/${clubId}/user/${userId}`
        );
      } else {
        response = await axiosInstance.get(
          `/events/club/${clubId}/user/${userId}`
        );
      }

      setEvents(response.data);
    } catch (error) {}
  };

  const formatDate = (value) => {
    const date = new Date(value);
    const formattedDate = date.toLocaleString("pl-PL", {
      dateStyle: "short",
      timeStyle: "short",
    });
    return formattedDate;
  };

  const checkAttendance = async (event) => {
    const newAttendance = {
      userId,
      ...(eventType === "trening"
        ? { ["trainingId"]: event.id }
        : { ["eventId"]: event.id }),
    };

    try {
      await axiosInstance.post(`/attendances`, newAttendance);
      setEvents((prevEvents) => {
        return prevEvents.filter((e) => e.id !== event.id);
      });
      setShowSuccessAttendance(true);
    } catch (error) {}
  };

  return events.length > 0 ? (
    <div className="h-[500px] py-4 w-96 sm:w-auto">
      <div className="overflow-x-auto">
        <table className="table h-[450px] table-xs sm:table-sm md:table-md lg:table-lg ">
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Data rozpoczęcia</th>
              <th>Data zakończenia</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>
                  <strong>{event.title}</strong>
                </td>
                <td>{formatDate(event.startTime)}</td>
                <td>{formatDate(event.endTime)}</td>
                <th>
                  <button
                    className="btn btn-secondary btn-xs"
                    onClick={() => checkAttendance(event)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Tytuł</th>
              <th>Data rozpoczęcia</th>
              <th>Data zakończenia</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  ) : (
    <div className="h-[500px] py-4 w-96 sm:w-auto flex flex-col items-center justify-center">
      <span className="text-xl">
        Brak aktywnych {eventType === "trening" ? "treningów" : "wydarzeń"}
      </span>
    </div>
  );
};

export default AttendanceList;
