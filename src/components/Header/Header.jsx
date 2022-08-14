import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const comparePokemons = useSelector((state) => state.comparePokemons);
  return (
    <header>
      <nav>
        <span>
          {" "}
          <Link to="/">🤙 PokeRedux</Link>{" "}
        </span>
      </nav>
      <nav>
        <Link to={`/compare/${comparePokemons[0]}/${comparePokemons[1]}`}>Compare {comparePokemons.lenght} Pokemons</Link>
      </nav>
    </header>
  );
};

export default Header;
