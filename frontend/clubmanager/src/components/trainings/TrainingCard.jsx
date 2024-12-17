import React from "react";
import MyCalendar from "../calendar/MyCalendar";

const TrainingCard = () => {
  const events = [
    {
      title: "Spotkanie z zespołem",
      startTime: new Date(2024, 11, 20, 10, 0), // 20 grudnia 2024, godz. 10:00
      endTime: new Date(2024, 11, 20, 12, 0), // 20 grudnia 2024, godz. 12:00
    },
    {
      title: "Wizyta u lekarza",
      startTime: new Date(2024, 11, 22, 14, 30), // 22 grudnia 2024, godz. 14:30
      endTime: new Date(2024, 11, 22, 15, 30), // 22 grudnia 2024, godz. 15:30
    },
    {
      title: "Kolacja z przyjaciółmi",
      startTime: new Date(2024, 11, 25, 19, 0),
      endTime: new Date(2024, 11, 25, 21, 0),
    },
    {
      title: "Prezentacja projektu",
      startTime: new Date(2024, 11, 18, 9, 0),
      endTime: new Date(2024, 11, 18, 10, 30),
    },
    {
      title: "Siłownia",
      startTime: new Date(2024, 11, 21, 18, 0),
      endTime: new Date(2024, 11, 21, 19, 0),
    },
    {
      title: "Spotkanie z klientem",
      startTime: new Date(2024, 11, 19, 13, 30),
      endTime: new Date(2024, 11, 19, 15, 0),
    },
    {
      title: "Zakupy świąteczne",
      startTime: new Date(2024, 11, 23, 11, 0),
      endTime: new Date(2024, 11, 23, 13, 0),
    },
    {
      title: "Warsztaty kulinarne",
      startTime: new Date(2024, 11, 17, 16, 0),
      endTime: new Date(2024, 11, 17, 19, 0),
    },
    {
      title: "Webinar",
      startTime: new Date(2024, 11, 20, 15, 0),
      endTime: new Date(2024, 11, 20, 16, 30),
    },
    {
      title: "Spacer z psem",
      startTime: new Date(2024, 11, 24, 7, 0),
      endTime: new Date(2024, 11, 24, 7, 30),
    },
    {
      title: "Rozmowa rekrutacyjna",
      startTime: new Date(2024, 11, 15, 10, 30),
      endTime: new Date(2024, 11, 15, 11, 30),
    },
    {
      title: "Konsultacja z doradcą",
      startTime: new Date(2024, 11, 28, 14, 0),
      endTime: new Date(2024, 11, 28, 15, 0),
    },
    {
      title: "Nauka języka obcego",
      startTime: new Date(2024, 11, 16, 17, 0),
      endTime: new Date(2024, 11, 16, 18, 30),
    },
    {
      title: "Wycieczka rowerowa",
      startTime: new Date(2024, 11, 30, 9, 0),
      endTime: new Date(2024, 11, 30, 12, 0),
    },
    {
      title: "Spotkanie integracyjne",
      startTime: new Date(2024, 11, 29, 16, 0),
      endTime: new Date(2024, 11, 29, 20, 0),
    },
  ];

  return (
    <div className="card bg-base-100 shadow-2xl w-full md:w-3/4 max-w-[1000px] animate-in fade-in zoom-in mt-16">
      <div className="card-body items-center justify-center w-full">
        <div className="text-xl lg:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center mx-auto pt-4">
          <span className="font-bold">Treningi</span>
        </div>
        <MyCalendar
          events={events}
          onSelectEvent={(event) => alert(event.title)}
        />
      </div>
    </div>
  );
};

export default TrainingCard;
