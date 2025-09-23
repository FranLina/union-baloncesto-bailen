import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./EquipoDetalle.css";

export default function EquipoDetalle() {
  const { id } = useParams();
  const [equipo, setEquipo] = useState(null);

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
  }, [id]);

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
    </div>
  );
}
