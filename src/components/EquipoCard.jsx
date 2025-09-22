import React from "react";
import { useNavigate } from "react-router-dom";
import "./EquipoCard.css";

export default function EquipoCard({ id, nombre, categoria, sexo, foto }) {
  const navigate = useNavigate();
  return (
    <div
      className="equipo-card"
      onClick={() => navigate(`/equipos/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={foto} alt={`Foto de ${nombre}`} className="equipo-foto" />
      <div className="equipo-info">
        <h3>{nombre}</h3>
        <p>
          <strong>Categoría:</strong> {categoria}
        </p>
        <p>
          <strong>Sexo:</strong> {sexo}
        </p>
      </div>
    </div>
  );
}
