import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { useState } from "react";
import "./Calendario.css";

// Colores por categoría
const categoriaColors = {
  Senior: "#1e90ff", // azul
  Junior: "#ff4500", // naranja
  Cadete: "#32cd32", // verde
  Infantil: "#ffdf00", // amarillo
  Mini: "#ffa500", // naranja
  Babybasket: "#8a2be2", // violeta
  default: "#808080", // gris
};

export default function Calendario({ partidos }) {
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);

  const eventos = partidos.map((match) => {
    // Detectamos la categoría del equipo del club
    const categoria =
      match.local?.categoria || match.visitante?.categoria || "default";

    return {
      title: `${match.local.nombre} vs ${match.visitante.nombre}`,
      date: `${match.fecha}T${match.hora}`,
      extendedProps: match,
      color: categoriaColors[categoria] || categoriaColors.default, // 👈 color según categoría
    };
  });

  const handleEventClick = (info) => {
    setPartidoSeleccionado(info.event.extendedProps);
  };

  const cerrarModal = () => {
    setPartidoSeleccionado(null);
  };

  return (
    <>
      <div className="leyenda-equipos">
        <p className="leyenda-senior">Senior Masculino</p>
        <p className="leyenda-cadete">Cadete Preferente</p>
        <p className="leyenda-infantil">Infantil Preferente</p>
        <p className="leyenda-mini">MiniBasket Preferente</p>
        <p className="leyenda-baby">BaybyBasket Preferente</p>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        locale={esLocale}
        firstDay={1}
        contentHeight="auto"
        expandRows={true}
        fixedWeekCount={false}
        buttonText={{
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        eventClick={handleEventClick}
      />

      {partidoSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <p className="modal-competicion">
              {partidoSeleccionado.competicion}
              {" - "}
              {partidoSeleccionado.local?.categoria}{" "}
              {partidoSeleccionado.local?.sexo}
            </p>
            <div className="modal-info">
              <div className="modal-local">
                <img
                  src={partidoSeleccionado.local?.club?.escudo}
                  alt={partidoSeleccionado.local?.nombre}
                  className="modal-escudo"
                />
                <div className="modal-equipo-nombre">
                  {partidoSeleccionado.local?.nombre}
                </div>
              </div>
              <div className="modal-vs">
                {partidoSeleccionado.resultado &&
                  (() => {
                    const partes = partidoSeleccionado.resultado.split("-");
                    return (
                      <p className="modal-resultado">
                        <span
                          className={partes[0] > partes[1] ? "ganador" : ""}
                        >
                          {partes[0]}
                        </span>{" "}
                        -{" "}
                        <span
                          className={partes[1] > partes[0] ? "ganador" : ""}
                        >
                          {partes[1]}
                        </span>
                      </p>
                    );
                  })()}
                <p className="modal-dia">
                  {new Date(partidoSeleccionado.fecha).toLocaleDateString(
                    "es-ES",
                    { weekday: "long" }
                  )}
                </p>
                <p className="modal-fecha">
                  {new Date(partidoSeleccionado.fecha).toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </p>
                <p className="modal-hora">
                  {partidoSeleccionado.hora.slice(0, 5)}
                </p>
              </div>
              <div className="modal-visitante">
                <img
                  src={partidoSeleccionado.visitante?.club?.escudo}
                  alt={partidoSeleccionado.visitante?.nombre}
                  className="modal-escudo"
                />
                <div className="modal-equipo-nombre">
                  {partidoSeleccionado.visitante?.nombre}
                </div>
              </div>
            </div>
            <div className="modal-pabellon-youtube">
              {partidoSeleccionado.pabellon && (
                <p
                  className="modal-pabellon"
                  onClick={() => {
                    const query = encodeURIComponent(
                      partidoSeleccionado.pabellon
                    );
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${query}`,
                      "_blank"
                    );
                  }}
                  style={{ cursor: "pointer" }}
                  title="Ver en Google Maps"
                >
                  <FaMapMarkerAlt />{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {partidoSeleccionado.pabellon}
                  </span>
                </p>
              )}
              {partidoSeleccionado.url_youtube && (
                <p className="modal-youtube">
                  <a
                    href={partidoSeleccionado.url_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Ver en</span>
                    <TbBrandYoutubeFilled />
                  </a>
                </p>
              )}
            </div>
            <button className="cerrar" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
