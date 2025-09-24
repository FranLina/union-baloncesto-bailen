import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Menu.css";

export default function Menu() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY === 0) {
        setVisible(true);
      } else if (window.scrollY > lastScrollY.current) {
        setVisible(false); // bajando
      } else {
        setVisible(true); // subiendo
      }
      lastScrollY.current = window.scrollY;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false); // cerrar menú
  };

  return (
    <nav className={`navbar ${visible ? "show" : "hide"}`}>
      <img className="navbar-logo" src="/ubb-escudo.png" alt=""></img>
      <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        &#9776;
      </div>
      <ul className={`navbar-links ${mobileOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/equipos" onClick={handleLinkClick}>
            Equipos
          </Link>
        </li>
        <li>
          <Link to="/cronicas" onClick={handleLinkClick}>
            Crónicas
          </Link>
        </li>
        <li>
          <Link to="/partidos" onClick={handleLinkClick}>
            Partidos
          </Link>
        </li>
        <li>
          <Link to="/entrenamientos" onClick={handleLinkClick}>
            Entrenamientos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
