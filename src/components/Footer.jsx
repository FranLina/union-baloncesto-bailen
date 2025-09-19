import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTwitch,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container1">
        <img className="footer-logo" src="ubb-escudo.png" alt=""></img>
        <p>© 2025 Club de Baloncesto. Todos los derechos reservados.</p>
      </div>
      <div className="footer-container2">
        <h2>Métodos de contacto</h2>
        <p>unionbailenbaloncesto@gmail.com</p>
        <p>Pabellón 28 de Febrero, C/ Pablo Picasso</p>
        <p>23710 Bailén, Jaén</p>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/union_baloncesto_bailen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/UBBailen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/UBBAILEN"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.youtube.com/@Uni%C3%B3nBaloncestoBail%C3%A9n"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.twitch.tv/unionbaloncestobailen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitch />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
