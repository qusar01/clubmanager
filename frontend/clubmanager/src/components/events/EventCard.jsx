import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUserContext } from "../../context/UserContext";
import axiosInstance from "../../config/axiosInstance";
import MyCalendar from "../calendar/MyCalendar";
import AttendanceList from "../attendances/AttendanceList";
import AddEventModal from "../modals/AddEventModal";
import Toast from "../Toast";
import EventInfoModal from "../modals/EventInfoModal";

const EventCard = () => {
  const clubId = useSelector((state) => state.user.clubId);
  const { role, loading } = useUserContext();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAttendance, setIsAttendance] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [showSuccessAttendance, setShowSuccessAttendance] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      const modal = document.getElementById("event_info");
      if (modal) modal.showModal();
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get(`/events/club/${clubId}`);
      const formattedEvents = response.data.map((event) => ({
        id: event.id,
        title: event.title,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
        location: event.location,
        description: event.description,
        clubId: event.clubId,
        coachId: event.coachId,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    document.getElementById("event_info").close();
    setSelectedEvent(null);
  };

  return (
    <div className="card bg-base-100 shadow-2xl w-full md:w-3/4 max-w-[1000px] animate-in fade-in zoom-in mt-16">
      <div className="card-body items-center justify-center w-full">
        <div className="text-xl lg:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center mx-auto pt-4">
          <span className="font-bold">Wydarzenia</span>
        </div>
        {events && !isAttendance && (
          <MyCalendar events={events} onSelectEvent={selectEvent} />
        )}

        {isAttendance && (
          <AttendanceList
            eventType="wydarzenie"
            setShowSuccessAttendance={setShowSuccessAttendance}
          />
        )}

        <AddEventModal
          eventType="wydarzenie"
          setShowSuccess={setShowSuccess}
          setEvents={setEvents}
        />
        {showSuccess && (
          <Toast
            message="Pomyślnie dodano wydarzenie."
            type="success"
            onClose={() => setShowSuccess(false)}
          />
        )}

        {role === "COACH" && (
          <button
            className="btn btn-secondary"
            onClick={() => document.getElementById("add_event").showModal()}
          >
            Dodaj wydarzenie
          </button>
        )}

        {isAttendance && role === "COMPETITOR" && (
          <button
            className="btn btn-primary"
            onClick={() => setIsAttendance(false)}
          >
            Kalendarz
          </button>
        )}
        {!isAttendance && role === "COMPETITOR" && (
          <button
            className="btn btn-secondary"
            onClick={() => setIsAttendance(true)}
          >
            Obecności
          </button>
        )}

        <EventInfoModal
          event={selectedEvent}
          eventType="wydarzenie"
          setEvents={setEvents}
          onClose={closeModal}
          setShowSuccessDelete={setShowSuccessDelete}
        />
        {showSuccessDelete && (
          <Toast
            message="Pomyślnie usunięto wydarzenie."
            type="success"
            onClose={() => setShowSuccessDelete(false)}
          />
        )}
        {showSuccessAttendance && (
          <Toast
            message="Pomyślnie zaznaczono obecność."
            type="success"
            onClose={() => setShowSuccessAttendance(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EventCard;
