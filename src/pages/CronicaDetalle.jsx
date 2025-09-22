import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./CronicaDetalle.css";

export default function CronicaDetalle() {
  const { id } = useParams();
  const [cronica, setCronica] = useState(null);

  useEffect(() => {
    const fetchCronica = async () => {
      const { data, error } = await supabase
        .from("cronicas")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setCronica(data);
    };
    fetchCronica();
  }, [id]);

  if (!cronica) return <p>Cargando...</p>;

  return (
    <div className="cronica-detalle">
      <h1>{cronica.titulo}</h1>
      <h3>{new Date(cronica.fecha).toLocaleDateString("es-ES")}</h3>
      <p>{cronica.contenido}</p>

      <div className="fotos">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {cronica.fotos?.map((foto, index) => (
            <SwiperSlide key={index}>
              <img key={index} src={foto} alt={`Foto ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
