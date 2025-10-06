import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import "./ProximosPartidos.css";

export default function ProximoPartido({ clubId = 1 }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]); // [{ team, match }]
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchUltimoPartidoPorEquipo() {
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

        // 2) Para cada equipo, buscar el ultimo partido donde participe (local o visitante)
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
               competicion,
               url_youtube,
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
            .lte("fecha", hoy) // partidos anteriores o iguales a hoy
            .order("fecha", { ascending: false }) // más reciente primero
            .limit(1);

          if (errPart) {
            // devolvemos objeto con error para poder manejarlo después
            return { team, match: null, error: errPart };
          }

          return { team, match: partidos?.[0] ?? null };
        });

        const all = await Promise.all(promises);

        // Orden personalizado por categoría
        const ordenCategorias = {
          Senior: 1,
          Junior: 2,
          Cadete: 3,
          Infantil: 4,
          Mini: 5,
          Baby: 6,
        };

        all.sort((a, b) => {
          return (
            (ordenCategorias[a.team.categoria] ?? 999) -
            (ordenCategorias[b.team.categoria] ?? 999)
          );
        });

        if (mounted) setResults(all);
      } catch (err) {
        console.error("Error en UltimoPartido:", err);
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUltimoPartidoPorEquipo();

    return () => {
      mounted = false;
    };
  }, [clubId]);

  if (loading) return <p>Cargando últimos partidos…</p>;
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
              No hay partido para este equipo
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
                {match.competicion && <p>{match.competicion}</p>}
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
                <div>
                  <p className="dia">
                  {new Date(match.fecha).toLocaleDateString(
                    "es-ES",
                    { weekday: "long" }
                  )}
                </p>
                <p className="fecha-partido">
                  {new Date(match.fecha).toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </p>
                <p className="hora">
                  {match.hora.slice(0, 5)}
                </p>
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

          {match && (
            <div className="pabellon-youtube">
              {match.pabellon && (
                <p className="pabellon">
                  <FaMapMarkerAlt />
                  <span> {match.pabellon}</span>
                </p>
              )}
              {match.url_youtube && (
                <p className="youtube">
                  <a
                    href={match.url_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Ver en</span>
                    <TbBrandYoutubeFilled />
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
