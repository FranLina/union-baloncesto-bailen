import React from "react";
import { FaInstagram, FaFacebook, FaYoutube, FaTwitch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container1">
        <img className="footer-logo" src="/ubb-escudo.png" alt=""></img>
        <p>© 2025 Club de Baloncesto. Todos los derechos reservados.</p>
      </div>
      <div className="footer-container2">
        <h2>Métodos de contacto</h2>
        <p>ubbailen@hotmail.com</p>
        <p>Telf: 640 283 475</p>
        <p>Avda. Manolo Gómez Bur, 12, 23710 Bailén, Jaén</p>
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
            <FaXTwitter />
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
