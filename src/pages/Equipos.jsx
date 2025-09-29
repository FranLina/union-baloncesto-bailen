import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import EquipoCard from "../components/EquipoCard";
import "./Equipo.css";

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    async function cargarEquipos() {
      const { data, error } = await supabase
        .from("equipos")
        .select(`id,nombre,categoria,sexo,foto_equipo,club (id,escudo)`)
        .eq("club", 1);
      if (error) {
        console.error("Error cargando equipos:", error.message);
      } else {
         // Orden personalizado por categoría
        const ordenCategorias = {
          Senior: 1,
          Junior: 2,
          Cadete: 3,
          Infantil: 4,
          Mini: 5,
          Baby: 6,
        };

        data.sort((a, b) => {
          return (
            (ordenCategorias[a.categoria] ?? 999) -
            (ordenCategorias[b.categoria] ?? 999)
          );
        });
        setEquipos(data);
      }
    }
    cargarEquipos();
  }, []);

  return (
    <div className="equipos-container">
      <h1>Nuestros equipos</h1>
      <div className="equipos-grid">
        {equipos.map((eq) => (
          <EquipoCard
            key={eq.id}
            id={eq.id}
            nombre={eq.nombre}
            categoria={eq.categoria}
            sexo={eq.sexo}
            foto={eq.foto_equipo}
          />
        ))}
      </div>
    </div>
  );
}
