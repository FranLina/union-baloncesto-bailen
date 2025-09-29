import ProximoPartido from "../components/ProximosPartidos";
import UltimosPartidos from "../components/UltimosPartidos";
import "./Partidos.css";

export default function Partidos() {
  return (
    <div className="contenedor-partidos">
      <h1>Próximos partidos de los Equipos</h1>
      <ProximoPartido />
      <h1>Últimos partidos de los Equipos</h1>
      <UltimosPartidos />
    </div>
  );
}
