import React from "react";
import "./Clasificacion.css";

export default function Clasificacion({ clasificacion }) {
  if (!clasificacion || clasificacion.length === 0) {
    return <></>;
  }
  return (
    <div className="clasificacion-container">
      <h3>Clasificación</h3>
      <table className="clasificacion-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Escudo</th>
            <th>Equipo</th>
            <th>G</th>
            <th>P</th>
            <th>PF</th>
            <th>PC</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {clasificacion.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>
                {row.equipos.club?.escudo && (
                  <img
                    src={row.equipos.club.escudo}
                    alt={row.equipos.nombre}
                    className="escudo-clasificacion"
                  />
                )}
              </td>
              <td>{row.equipos.nombre}</td>
              <td>{row.ganados}</td>
              <td>{row.perdidos}</td>
              <td>{row.puntos_favor}</td>
              <td>{row.puntos_contra}</td>
              <td>{row.puntos_totales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
