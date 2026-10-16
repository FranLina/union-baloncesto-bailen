import React from "react";
import { useNavigate } from "react-router-dom";
import { generarSlug } from "../utils";
import "./EquipoCard.css";

export default function EquipoCard({ id, nombre, categoria, sexo, foto }) {
  const navigate = useNavigate();
  return (
    <div
      className="equipo-card"
      onClick={() => navigate(`/equipos/${id}-${generarSlug(nombre)}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={foto || "/ubb-escudo.png"}
        alt={`Foto de ${nombre}`}
        className="equipo-foto"
        loading="lazy"
        decoding="async"
      />
      <div className="equipo-info">
        <h3>{nombre}</h3>
        <p>
          <strong>Categoría:</strong> {categoria} {sexo}
        </p>
      </div>
    </div>
  );
}
