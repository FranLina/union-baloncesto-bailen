import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { generarSlug, stripHtml } from "../utils";
import "./Cronicas.css";

export default function Cronicas() {
  const [cronicas, setCronicas] = useState([]);

  useEffect(() => {
    const fetchCronicas = async () => {
      const { data, error } = await supabase
        .from("cronicas")
        .select("*")
        .order("fecha", { ascending: false });
      if (error) console.error(error);
      else setCronicas(data);
    };
    fetchCronicas();
  }, []);

  return (
    <div className="cronicas-container">
      <h1>Crónicas</h1>
      <div className="cronicas-grid">
        {cronicas.map((cr) => (
          <div key={cr.id} className="cronica-card">
            {cr.fotos && cr.fotos.length > 0 && (
              <img src={cr.fotos[0]} alt={cr.titulo} />
            )}
            <h2>{cr.titulo}</h2>
            <p className="fecha">
              {new Date(cr.fecha).toLocaleDateString("es-ES")}
            </p>
            <p>{stripHtml(cr.contenido).slice(0, 150)}...</p>
            <Link to={`/cronicas/${cr.id}-${generarSlug(cr.titulo)}`}>Leer más</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
