import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";

const AddEventModal = ({ eventType, setShowSuccess, setEvents }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const clubId = useSelector((state) => state.user.clubId);
  const coachId = useSelector((state) => state.user.userId);

  const formatDateToISO = (dateString) => {
    if (dateString) {
      const [datePart, timePart] = dateString.split(", ");
      const [day, month, year] = datePart.split(".");

      const paddedDay = day.padStart(2, "0");
      const paddedMonth = month.padStart(2, "0");

      const formattedDate = `${year}-${paddedMonth}-${paddedDay}T${timePart}:00`;
      return formattedDate;
    }
  };

  const createEvent = async () => {
    setLoading(true);

    const newEvent = {
      title,
      description,
      ...(eventType === "wydarzenie" ? { location } : {}),
      startTime: formatDateToISO(startTime),
      endTime: formatDateToISO(endTime),
      clubId,
      coachId,
    };

    const formattedEvent = {
      title: newEvent.title,
      startTime: new Date(newEvent.startTime),
      endTime: new Date(newEvent.endTime),
      description: newEvent.description,
      ...(eventType === "wydarzenie" ? { location: newEvent.location } : {}),
      clubId: newEvent.clubId,
      coachId: newEvent.coachId,
    };

    try {
      let response;
      if (eventType === "trening") {
        response = await axiosInstance.post(`/trainings`, newEvent);
      } else {
        response = await axiosInstance.post(`/events`, newEvent);
      }
      const calEvent = { ...formattedEvent, id: response.data.id };
      setLoading(false);
      setEvents((prevEvents) => [...prevEvents, calEvent]);
      document.getElementById("add_event").close();
      setTitle("");
      setDescription("");
      setLocation("");
      setStartTime("");
      setEndTime("");
      setShowSuccess(true);
    } catch (error) {
      setErrors(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div>
      <dialog id="add_event" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Dodaj {eventType}</h3>
          <div className="flex flex-col justify-center items-center gap-4 pt-4">
            <div className="w-3/4">
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${
                  errors.title ? "border-red-500 text-red-500" : ""
                }`}
              >
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`grow ${
                    errors["title"] || errors.title ? "placeholder-red-500" : ""
                  }`}
                  placeholder="Tytuł"
                  required
                  onFocus={() =>
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      title: null,
                    }))
                  }
                />
              </label>
              {errors.title && (
                <span className="prose text-red-500 text-sm">
                  {errors.title}
                </span>
              )}
            </div>

            <textarea
              className={`textarea textarea-bordered flex items-center gap-2 w-3/4 ${
                errors.description ? "border-red-500 text-red-500" : ""
              }`}
              placeholder="Opis"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            {eventType === "wydarzenie" && (
              <div className="w-3/4">
                <label
                  className={`input input-bordered flex items-center gap-2 w-full ${
                    errors.location ? "border-red-500 text-red-500" : ""
                  }`}
                >
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`grow ${
                      errors["location"] || errors.location
                        ? "placeholder-red-500"
                        : ""
                    }`}
                    placeholder="Adres"
                    required
                    onFocus={() =>
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        location: null,
                      }))
                    }
                  />
                </label>
                {errors.location && (
                  <span className="prose text-red-500 text-sm">
                    {errors.location}
                  </span>
                )}
              </div>
            )}

            <div className="w-3/4">
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${
                  errors.startTime ? "border-red-500 text-red-500" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  className={`grow ${
                    errors.startTime ? "placeholder-red-500" : ""
                  }`}
                  placeholder="Data rozpoczęcia"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  onFocus={(e) => {
                    setStartTime(formatDateToISO(e.target.value));
                    e.target.type = "datetime-local";
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      startTime: null,
                    }));
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";

                    const value = e.target.value;
                    if (value) {
                      const date = new Date(value);
                      const formattedDate = date.toLocaleString("pl-PL", {
                        dateStyle: "short",
                        timeStyle: "short",
                      });
                      setStartTime(formattedDate);
                      setEndTime(formattedDate);
                    }
                  }}
                />
              </label>
              {errors.startTime && (
                <span className="prose text-red-500 text-sm">
                  {errors.startTime}
                </span>
              )}
            </div>

            <div className="w-3/4">
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${
                  errors.endTime ? "border-red-500 text-red-500" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  className={`grow ${
                    errors.endTime ? "placeholder-red-500" : ""
                  }`}
                  placeholder="Data zakończenia"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  onFocus={(e) => {
                    setEndTime(formatDateToISO(e.target.value));
                    e.target.type = "datetime-local";
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      endTime: null,
                    }));
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";

                    const value = e.target.value;
                    if (value) {
                      const date = new Date(value);
                      const formattedDate = date.toLocaleString("pl-PL", {
                        dateStyle: "short",
                        timeStyle: "short",
                      });
                      setEndTime(formattedDate);
                    }
                  }}
                />
              </label>
              {errors.endTime && (
                <span className="prose text-red-500 text-sm">
                  {errors.endTime}
                </span>
              )}
            </div>
          </div>

          <div className="modal-action">
            {loading ? (
              <button className="btn btn-primary">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button onClick={createEvent} className="btn btn-primary">
                Dodaj
              </button>
            )}

            <form method="dialog">
              <button className="btn">Anuluj</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddEventModal;
