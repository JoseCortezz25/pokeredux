import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePokemonFromCompare } from "../../actions";
import logoPokeRedux from "../../assets/pokeredux.svg";

const Header = () => {
  const comparePokemons = useSelector((state) => state.comparePokemons);
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);

  return (
    <header>
      <nav>
        <div  className="logo">
          <Link to="/">
            <img src={logoPokeRedux} alt="PokeRedux Logo" />
          </Link>
        </div>
      </nav>
      <nav>
        <div className="btnContainer">
          <button
            className="btnCompare"
            onClick={() => setShowList((prevState) => !prevState)}
          >
            Compare
            <strong>{Number(comparePokemons.length)}</strong>
          </button>
          <ul className={`btnCompare__content${showList ? " show" : " hidden"}`}>
            {comparePokemons.map((pokemon) => (
              <li key={pokemon} className="btnCompare__item">
                <p>{pokemon}</p>
                <button onClick={() => dispatch(deletePokemonFromCompare(pokemon))} >
                  x
                </button>
              </li>
            ))}

            <li className="btnCompare__item">
              <Link to={`/compare/${comparePokemons[0]}/${comparePokemons[1]}`}>
                <button>Compare Pokemons</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
