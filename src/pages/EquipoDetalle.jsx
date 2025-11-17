import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import "./EquipoDetalle.css";
import Clasificacion from "../components/Clasificacion";

export default function EquipoDetalle() {
  const { slug } = useParams();

  // El id está antes del primer guion
  const id = slug.split("-")[0];

  const equipoId = Number(id);
  const [equipo, setEquipo] = useState(null);
  const [partidos, setPartidos] = useState(null);
  const [clasificacion, setClasificacion] = useState(null);

  useEffect(() => {
    async function fetchEquipo() {
      const { data, error } = await supabase
        .from("equipos")
        .select(
          "id, nombre, categoria, sexo, foto_equipo, descripcion,entrenamientos"
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error cargando equipo:", error);
      } else {
        setEquipo(data);
      }
    }
    fetchEquipo();

    async function fetchPartidosEquipo() {
      const { data, error } = await supabase
        .from("partidos")
        .select(
          `id,
               fecha,
               hora,
               estado,
               pabellon,
               resultado,
               competicion,
               url_youtube,
               local (
                 id,
                 nombre
               ),
               visitante (
                 id,
                 nombre
               )`
        )
        .or(`local.eq.${id},visitante.eq.${id}`)
        .order("fecha", { ascending: true });

      if (error) {
        console.error("Error cargando partidos:", error);
      } else {
        setPartidos(data);
      }
    }
    fetchPartidosEquipo();
  }, [id]);

  useEffect(() => {
    if (!equipo) return;

    async function fetchClasificacion() {
      const { data, error } = await supabase
        .from("clasificacion")
        .select(
          `
        id,
        categoria,
        sexo,
        ganados,
        perdidos,
        puntos_favor,
        puntos_contra,
        puntos_totales,
        equipos (
          id,
          nombre,
          club,
          club (
            id,
            nombre,
            escudo
          )
        )
      `
        )
        .eq("categoria", equipo.categoria)
        .eq("sexo", equipo.sexo)
        .order("puntos_totales", { ascending: false })
        .order("puntos_favor", { ascending: false })
        .order("puntos_contra", { ascending: true });

      if (error) console.error("Error cargando clasificación:", error);
      else setClasificacion(data);
    }

    fetchClasificacion();
  }, [equipo]);

  function formatDateTime(dateString) {
    const d = new Date(dateString);
    if (isNaN(d)) return "Fecha inválida";

    const dateOptions = { day: "2-digit", month: "long", year: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };

    const fecha = d.toLocaleDateString("es-ES", dateOptions);
    const hora = d.toLocaleTimeString("es-ES", timeOptions);

    return `${fecha} - ${hora}`;
  }

  if (!equipo) return <p>Cargando equipo...</p>;

  return (
    <div className="equipo-detalle">
      <h1>
        {equipo.nombre} {equipo.categoria} {equipo.sexo}
      </h1>
      <div className="container-equipo">
        {equipo.foto_equipo && (
          <img
            src={equipo.foto_equipo}
            alt={equipo.nombre}
            className="detalle-foto"
          />
        )}
        <div className="detalle-info">
          <p>{equipo.descripcion}</p>
        </div>
      </div>
      {equipo.entrenamientos && (
        <div className="entrenamientos">
          <h3>Entrenamientos</h3>
          <ul>
            {equipo.entrenamientos.map((e, index) => (
              <li key={index}>
                {e.dia} | {e.hora} en {e.pista}
              </li>
            ))}
          </ul>
        </div>
      )}

      {clasificacion && <Clasificacion clasificacion={clasificacion} />}

      {partidos && (
        <div className="calendario">
          <h3>Calendario</h3>
          <table className="calendario-partidos">
            <thead>
              <tr>
                <th>Competición</th>
                <th>Local</th>
                <th>Visitante</th>
                <th>Fecha y Hora</th>
                <th>Resultado</th>
                <th>Pabellón</th>
                <th>Link Youtube</th>
              </tr>
            </thead>
            <tbody>
              {partidos.map((par, i) => (
                <tr key={i}>
                  <td data-label="Competición">{par.competicion}</td>
                  <td
                    data-label="Local"
                    className={
                      par.local?.id === equipoId ? "equipo-negrita" : ""
                    }
                  >
                    {par.local?.nombre}
                  </td>
                  <td
                    data-label="Visitante"
                    className={
                      par.visitante?.id === equipoId ? "equipo-negrita" : ""
                    }
                  >
                    {par.visitante?.nombre}
                  </td>
                  <td data-label="Fecha y Hora">
                    {formatDateTime(par.fecha + " " + par.hora)}
                  </td>
                  <td data-label="Resultado">{par.resultado}</td>
                  <td data-label="Pabellón">{par.pabellon}</td>
                  <td data-label="YouTube">
                    {par.url_youtube && (
                      <a
                        href={par.url_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TbBrandYoutubeFilled />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
