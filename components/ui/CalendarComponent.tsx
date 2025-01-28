import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, addDays } from "date-fns";
import Timeline from 'react-vis-timeline';
import "react-vis-timeline/styles/vis-timeline-graph2.css";

const fasesCultivo = ["Siembra", "Germinación", "Crecimiento", "Floración", "Cosecha"];
const duracionFases = [0, 7, 30, 60, 90]; // Días aproximados por fase

const CultivoTimeline = () => {
  const [fechaSiembra, setFechaSiembra] = useState<Date | null>(null);
  const [fechasFases, setFechasFases] = useState<any[]>([]);

  const manejarSeleccionFecha = (fecha: Date) => {
    setFechaSiembra(fecha);
    const nuevasFechas = duracionFases.map((dias) => addDays(fecha, dias));
    setFechasFases(nuevasFechas);
  };

  // Convertir las fechas a formato adecuado para react-vis-timeline
  const items = fechasFases.map((fecha, index) => ({
    id: index,
    content: `${fasesCultivo[index]} (${format(fecha, "dd-MM-yyyy")})`,
    start: fecha,
  }));

  const options = {
    width: "100%",
    height: "300px",
    margin: {
      item: 10,
      axis: 5,
    },
    zoomMin: 1000 * 60 * 60 * 24, // 1 día
    zoomMax: 1000 * 60 * 60 * 24 * 365, // 1 año
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Selecciona la fecha de siembra</h2>
      <div className="flex justify-center mb-6">
        <Calendar onChange={(value) => manejarSeleccionFecha(value as Date)} />
      </div>

      {fechaSiembra && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Cronograma del Cultivo</h3>
          <div className="mt-4">
            <Timeline items={items} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CultivoTimeline;
