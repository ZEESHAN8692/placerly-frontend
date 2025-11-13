import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DashboardLayout from "../layout/sidebar";

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { title: "Meeting", date: "2025-11-10" },
    { title: "Project Deadline", date: "2025-11-15" },
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Enter Event Title:");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-[#0B192D] text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#F9C74F] mb-4">
        📅 Full Calendar
      </h1>

      <div className="w-full max-w-6xl bg-[#10233F]  p-4 shadow-lg">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          height="80vh"
          eventColor="#F9C74F"
          eventTextColor="#000"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
        />
      </div>
    </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
