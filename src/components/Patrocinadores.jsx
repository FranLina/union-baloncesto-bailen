import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "./Patrocinadores.css";

const Patrocinadores = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const { data, error } = await supabase
        .from("patrocinadores")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error cargando patrocinadores:", error);
      } else {
        setSponsors(data);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <div className="patrocinadores">
      <h2>Nuestros Patrocinadores</h2>
      <div className="slider">
        <div className="slide-track">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div key={index} className="slide">
              <a
                href={sponsor.enlace}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={sponsor.logo_url} alt={sponsor.nombre} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patrocinadores;
