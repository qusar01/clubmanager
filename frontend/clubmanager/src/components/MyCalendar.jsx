import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../CalendarStyles.css";

dayjs.locale("pl");

const localizer = dayjsLocalizer(dayjs);

const messages = {
  date: "Data",
  time: "Czas",
  event: "Wydarzenie",
  allDay: "Cały dzień",
  week: "Tydzień",
  work_week: "Tydzień roboczy",
  day: "Dzień",
  month: "Miesiąc",
  previous: "<",
  next: ">",
  yesterday: "Wczoraj",
  tomorrow: "Jutro",
  today: "Dzisiaj",
  agenda: "Agenda",
  noEventsInRange: "Brak wydarzeń w tym zakresie.",
};

const MyCalendar = ({ events, onSelectEvent }) => {
  return (
    <div className="p-4 w-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startTime"
        endAccessor="endTime"
        style={{ height: 600 }}
        messages={messages}
        onSelectEvent={onSelectEvent}
        views={["month", "week", "day", "agenda"]}
        className="w-full"
      />
    </div>
  );
};

export default MyCalendar;
