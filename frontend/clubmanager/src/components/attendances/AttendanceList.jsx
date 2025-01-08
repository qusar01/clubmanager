import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useSelector } from "react-redux";

const AttendanceList = ({ eventType }) => {
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
        response = axiosInstance.get(
          `/trainings/club/${clubId}/user/${userId}`
        );
      } else {
        response = axiosInstance.get(`/events/club/${clubId}/user/${userId}`);
      }

      setEvents(response.data);
    } catch (error) {}
  };

  return (
    <div className="h-[500px] py-4 w-96">
      <div className="overflow-x-auto">
        <table className="table h-[450px] table-xs sm:table-sm md:table-md lg:table-lg table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Data rozpoczęcia</th>
              <th>Data zakończenia</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <strong>title</strong>
              </td>
              <td>Początek</td>
              <td>Koniec</td>
              <th>
                <button className="btn btn-secondary btn-sm">
                  Zaznacz obecność
                </button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
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
  );
};

export default AttendanceList;
