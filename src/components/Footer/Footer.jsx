import React from "react";
import PokemonLogo from '../../assets/pokeredux_logo.svg'
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <nav>
        <img src={PokemonLogo} alt="" />
      </nav>
      <nav>
        By{" "}
        <a
          href="https://github.com/JoseCortezz25"
          target="_blank"
          implies
          rel="noopener"
        >
          Alfonso Chavarro
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
