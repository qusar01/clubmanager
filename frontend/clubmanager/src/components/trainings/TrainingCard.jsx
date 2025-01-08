import React, { useEffect, useState } from "react";
import MyCalendar from "../calendar/MyCalendar";
import axiosInstance from "../../config/axiosInstance";
import { useUserContext } from "../../context/UserContext";
import { useSelector } from "react-redux";
import EventInfoModal from "../modals/EventInfoModal";
import AddEventModal from "../modals/AddEventModal";
import Toast from "../Toast";
import AttendanceList from "../attendances/AttendanceList";

const TrainingCard = () => {
  const clubId = useSelector((state) => state.user.clubId);
  const { role, loading } = useUserContext();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAttendance, setIsAttendance] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [showSuccessAttendance, setShowSuccessAttendance] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      const modal = document.getElementById("event_info");
      if (modal) modal.showModal();
    }
  }, [selectedEvent]);

  const fetchTrainings = async () => {
    const response = await axiosInstance.get(`/trainings/club/${clubId}`);
    const formattedEvents = response.data.map((training) => ({
      id: training.id,
      title: training.title,
      startTime: new Date(training.startTime),
      endTime: new Date(training.endTime),
      description: training.description,
      clubId: training.clubId,
      coachId: training.coachId,
    }));
    setEvents(formattedEvents);
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
          <span className="font-bold">Treningi</span>
        </div>
        {events && !isAttendance && (
          <MyCalendar events={events} onSelectEvent={selectEvent} />
        )}

        {isAttendance && (
          <AttendanceList
            eventType="trening"
            setShowSuccessAttendance={setShowSuccessAttendance}
          />
        )}

        <AddEventModal
          eventType="trening"
          setShowSuccess={setShowSuccess}
          setEvents={setEvents}
        />
        {showSuccess && (
          <Toast
            message="Pomyślnie dodano trening."
            type="success"
            onClose={() => setShowSuccess(false)}
          />
        )}

        {role === "COACH" && (
          <button
            className="btn btn-secondary"
            onClick={() => document.getElementById("add_event").showModal()}
          >
            Dodaj trening
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
          eventType="trening"
          setEvents={setEvents}
          onClose={closeModal}
          setShowSuccessDelete={setShowSuccessDelete}
        />
        {showSuccessDelete && (
          <Toast
            message="Pomyślnie usunięto trening."
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

export default TrainingCard;
