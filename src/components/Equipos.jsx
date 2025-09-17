import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    async function cargarEquipos() {
      const { data, error } = await supabase.from("equipos").select("*");
      if (error) {
        console.error("Error cargando equipos:", error.message);
      } else {
        setEquipos(data);
      }
    }
    cargarEquipos();
  }, []);

  return (
    <div>
      <h1>Equipos</h1>
      <ul>
        {equipos.map((eq) => (
          <li key={eq.id}>
            {eq.foto_url && (
              <img src={eq.foto_url} alt={eq.nombre} width="50" />
            )}
            {eq.nombre} - {eq.categoria} - {eq.sexo}
          </li>
        ))}
      </ul>
    </div>
  );
}
