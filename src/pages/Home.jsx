import React from "react";
import "./Home.css";
import UltimasCronicas from "../components/UltimasCronicas";
import ProximoPartido from "../components/ProximosPartidos";
import UltimosPartidos from "../components/UltimosPartidos";

export default function Home() {
  return (
    <div className="home">
      <h1>¡¡Bienvenidos!!</h1>
      <p className="amarillo">
        El baloncesto corre por nuestra sangre ¿en la tuya también?
      </p>

      <p>
        La Unión Baloncesto Bailén nace de un proyecto emprendido con el fin de
        consolidar un club serio que se interesara por cuidar del baloncesto y
        su práctica por la juventud de Bailén. Desde esta web queremos darnos a
        conocer, estar cerca de nuestros jugadores, entrenadores y
        simpatizantes, dar información acerca del estado del club y por
        supuesto, de sus equipos; además de invitar a todo aquel jugador o
        jugadora que quiera unirse a las filas del UB BAILÉN a venir a
        visitarnos y entrenar, será acogido sin problemas y se le atenderá de la
        mejor forma posible.
      </p>

      <div className="contenedor-partidos">
        <h2>Próximos partidos de los Equipos</h2>
        <ProximoPartido />
        <h2>Últimos partidos de los Equipos</h2>
        <UltimosPartidos />
      </div>

      <UltimasCronicas />
    </div>
  );
}
