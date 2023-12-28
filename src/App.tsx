import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { getHolidaysByYear } from "festivos-colombia-lib";
import { Holiday } from "./interface/IOHoliday";

function App() {
  const [festivos, setFestivos] = useState<Holiday[]>([]);

  return (
    <div className="mx-12 py-12">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setFestivos(getHolidaysByYear(2024))}
      >
        Get Holidays
      </button>
      <ul className="mb-5">
        {festivos.map((festivo: Holiday) => (
          <li key={festivo.date}>
            {festivo.nameDay} - {festivo.date} - {festivo.name}
          </li>
        ))}
      </ul>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={festivos.map((festivo: Holiday) => ({
          title: festivo.name,
          date: festivo.date,
        }))}
      />
    </div>
  );
}

export default App;
