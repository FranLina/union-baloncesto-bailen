import ProximoPartido from "../components/ProximosPartidos";
import "./Partidos.css";

export default function Partidos() {
  return (
    <div className="contenedor-partidos">
      <h1>Próximos partidos de los Equipos</h1>
      <ProximoPartido />
    </div>
  );
}
