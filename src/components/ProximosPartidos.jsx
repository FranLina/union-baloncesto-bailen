import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./ProximosPartidos.css";

export default function ProximoPartido({ clubId = 1 }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]); // [{ team, match }]
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProximoPartidoPorEquipo() {
      setLoading(true);
      setError(null);

      try {
        // 1) Traer equipos del club
        const { data: equipos, error: errEquipos } = await supabase
          .from("equipos")
          .select("id, nombre, categoria, sexo")
          .eq("club", clubId);

        if (errEquipos) throw errEquipos;
        if (!equipos || equipos.length === 0) {
          if (mounted) setResults([]);
          return;
        }

        const hoy = new Date().toISOString().split("T")[0];

        // 2) Para cada equipo, buscar el próximo partido donde participe (local o visitante)
        const promises = equipos.map(async (team) => {
          const { data: partidos, error: errPart } = await supabase
            .from("partidos")
            .select(
              `id,
               fecha,
               hora,
               estado,
               pabellon,
               resultado,
               local (
                 id,
                 nombre,
                 club ( id, escudo )
               ),
               visitante (
                 id,
                 nombre,
                 club ( id, escudo )
               )`
            )
            .or(`local.eq.${team.id},visitante.eq.${team.id}`)
            .gte("fecha", hoy)
            .order("fecha", { ascending: true })
            .limit(1);

          if (errPart) {
            // devolvemos objeto con error para poder manejarlo después
            return { team, match: null, error: errPart };
          }

          return { team, match: partidos?.[0] ?? null };
        });

        const all = await Promise.all(promises);

        if (mounted) setResults(all);
      } catch (err) {
        console.error("Error en ProximoPartido:", err);
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProximoPartidoPorEquipo();

    return () => {
      mounted = false;
    };
  }, [clubId]);

  if (loading) return <p>Cargando próximos partidos…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!results.length) return <p>No hay equipos o partidos programados.</p>;

  return (
    <div className="lista-partidos">
      {results.map(({ team, match, error: mErr }) => (
        <div className="card" key={team.id}>
          <h4>
            {team.categoria} {team.sexo}
          </h4>

          {mErr && <p className="error">Error cargando partido</p>}

          {!mErr && !match && (
            <p className="sin-partido">
              No hay partido próximo para este equipo
            </p>
          )}

          {match && (
            <div className="partido-detalle">
              <div className="equipo">
                <img
                  src={match.local?.club?.escudo}
                  alt={match.local?.nombre}
                  className="escudo"
                />
                <div className="equipo-nombre">{match.local?.nombre}</div>
              </div>

              <div className="vs">
                <div className="resultado">
                  {match.resultado &&
                    (() => {
                      const partes = match.resultado.split("-");
                      return (
                        <>
                          <span
                            className={partes[0] > partes[1] ? "ganador" : ""}
                          >
                            {partes[0]}
                          </span>{" "}
                          -{" "}
                          <span
                            className={partes[1] > partes[0] ? "ganador" : ""}
                          >
                            {partes[1]}
                          </span>
                        </>
                      );
                    })()}
                </div>
                <div className="vs-text">VS</div>
                <div className="fecha">
                  {new Date(`${match.fecha}T${match.hora}`).toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </div>
              </div>

              <div className="equipo">
                <img
                  src={match.visitante?.club?.escudo}
                  alt={match.visitante?.nombre}
                  className="escudo"
                />
                <div className="equipo-nombre">{match.visitante?.nombre}</div>
              </div>
            </div>
          )}

          {match && match.pabellon && (
            <p className="pabellon">
              <FaMapMarkerAlt />
              <span> {match.pabellon}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
