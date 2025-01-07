import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import axiosInstance from "../../config/axiosInstance";
import { useSelector } from "react-redux";

const EventInfoModal = ({
  event,
  eventType,
  setEvents,
  onClose,
  setShowSuccessDelete,
}) => {
  const [loading, setLoading] = useState();
  const { role } = useUserContext();
  const userId = useSelector((state) => state.user.userId);

  const deleteEvent = async () => {
    setLoading(true);

    try {
      if (eventType === "trening") {
        await axiosInstance.delete(`/trainings/${event.id}`);
      } else {
        await axiosInstance.delete(`/events/${event.id}`);
      }
      setLoading(false);
      setShowSuccessDelete(true);
      setEvents((prevEvents) => {
        return prevEvents.filter((e) => e.id !== event.id);
      });
      document.getElementById("event_info").close();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <dialog id="event_info" className="modal">
        <div className="modal-box text-center">
          <p className="prose text-2xl font-bold">{event && event.title}</p>
          <p className="prose text-lg">{event && event.description}</p>
          <p className="prose text-lg">
            {event && event.location ? event.location : ""}
          </p>
          <p className="prose text-lg">
            Początek:{" "}
            {new Date(event && event.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="prose text-lg">
            Koniec:{" "}
            {new Date(event && event.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <div className="modal-action">
            {role === "COACH" && event && userId === event.coachId && (
              <button className="btn btn-error" onClick={deleteEvent}>
                Usuń
              </button>
            )}
            <button className="btn" onClick={onClose}>
              Zamknij
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EventInfoModal;
