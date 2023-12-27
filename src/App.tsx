import fc, { Festivo } from "festivos-colombia";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

function App() {
  const [festivos, setFestivos] = useState<Festivo[]>([]);
  const festivos_found = fc.getHolidaysByYear(new Date().getFullYear());

  /**
   * Convierte el formato de fecha de cada festivo en el conjunto festivos_found y establece la propiedad nameDay.
   * @returns void
   */
  const getFestivos = () => {
    festivos_found.forEach((festivo: Festivo) => {
      festivo.date = festivo.date.replaceAll("/", "-"); // dd/mm/yyyy -> dd-mm-yyyy
      festivo.date = festivo.date.split("-").reverse().join("-"); // dd-mm-yyyy -> yyyy-mm-dd
      festivo.nameDay = getNameDay(new Date(festivo.date)); // yyyy-mm-dd -> nameDay
    });

    setFestivos(festivos_found);
  };

  /**
   * Obtiene el nombre del día de la semana para una fecha dada.
   * @param date La fecha para la cual se desea obtener el nombre del día.
   * @returns El nombre del día de la semana en formato de texto.
   */
  const getNameDay = (date: Date): string => {
    date.setDate(date.getDate() + 1); // yyyy-mm-dd -> yyyy-mm-dd + 1

    return date
      .toLocaleDateString("es-CO", { weekday: "long" })
      .replace(/^\w/, (c) => c.toUpperCase()); // nameDay -> NameDay
  };

  return (
    <>
      <button onClick={getFestivos}>Get Festivos</button>
      <ul>
        {festivos.map((festivo, index) => (
          <li key={index}>
            {festivo.nameDay} - {festivo.date} - {festivo.name}
          </li>
        ))}
      </ul>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={festivos.map((festivo) => ({
          title: festivo.name,
          date: festivo.date,
        }))}
      />
    </>
  );
}

export default App;
