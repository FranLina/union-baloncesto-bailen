import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Calendario from "../components/Calendario";
import "./Partidos.css";

export default function Partidos() {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    async function fetchPartidosDelClub() {
      try {
        // 1) Obtener todos los equipos del club
        const { data: equipos, error: errEquipos } = await supabase
          .from("equipos")
          .select("id, nombre, categoria, sexo")
          .eq("club", 1);

        if (errEquipos) throw errEquipos;
        if (!equipos || equipos.length === 0) return [];

        const equiposIds = equipos.map((e) => e.id);

        // 2) Obtener todos los partidos donde alguno de esos equipos sea local o visitante
        const { data: partidos, error: errPartidos } = await supabase
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
           nombre,
           categoria,
           sexo,
           club ( id, escudo )
         ),
         visitante (
           id,
           nombre,
           categoria,
           sexo,
           club ( id, escudo )
         )`
          )
          .or(
            `local.in.(${equiposIds.join(",")}),visitante.in.(${equiposIds.join(
              ","
            )})`
          )
          .order("fecha", { ascending: true });

        if (errPartidos) throw errPartidos;

        setPartidos(partidos);
      } catch (err) {
        console.error("Error cargando partidos del club:", err.message);
        return [];
      }
    }
    fetchPartidosDelClub();
  }, []);

  return (
    <div>
      <Calendario partidos={partidos} />
    </div>
  );
}
