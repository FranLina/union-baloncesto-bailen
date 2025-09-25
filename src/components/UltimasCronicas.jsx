import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./UltimasCronicas.css";

const UltimasCronicas = () => {
  const [cronicas, setCronicas] = useState([]);

  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  useEffect(() => {
    const fetchCronicas = async () => {
      const { data, error } = await supabase
        .from("cronicas")
        .select("*")
        .order("fecha", { ascending: false }) // las más recientes primero
        .limit(3); // solo 3

      if (error) {
        console.error("Error cargando crónicas:", error);
      } else {
        setCronicas(data);
      }
    };

    fetchCronicas();
  }, []);

  return (
    <div className="ultimas-cronicas">
      <h2>Últimas Noticas sobre el club</h2>
      <div className="cronicas-grid">
        {cronicas.map((cronica) => (
          <Link
            key={cronica.id}
            to={`/cronicas/${cronica.id}`}
            className="cronica-card"
          >
            <img
              src={cronica.fotos?.[0] || "/ubb-escudo.jpg"}
              alt={cronica.titulo}
              className="cronica-img"
            />
            <h3>{cronica.titulo}</h3>
            <p>{stripHtml(cronica.contenido).slice(0, 150)}...</p>
            <span className="cronica-fecha">
              {new Date(cronica.fecha).toLocaleDateString()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UltimasCronicas;
