import { useEffect, useState } from "react";
import { getPokemon } from "../../service/fetchData";
import { Link } from "react-router-dom";

import "./PokemonCard.css";

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState({});
  const [typesPokemon, setTypesPokemon] = useState([]);

  useEffect(() => {
    getPokemon(name)
      .then((data) => {
        setPokemon(data);
        setTypesPokemon(data.types[0].type.name);
      })
      .catch((err) => console.log("getPokemon err", err));
  }, []);

  const typeOfPokemons = [
    "normal",
    "fire",
    "water",
    "grass",
    "flying",
    "fighting",
    "poison",
    "electric",
    "ground",
    "rock",
    "psychic",
    "ice",
    "bug",
    "ghost",
    "steel",
    "dragon",
    "fairy",
    "dark",
  ];

  const detectTypePokemon = (type) => {
    if (typeOfPokemons.includes(type)) {
      return `PokemonCard Type${type[0].toUpperCase() + type.slice(1)}`;
    }
    return "PokemonCard";
  };

  return pokemon ? (
    <div className={`${detectTypePokemon(typesPokemon)}`}>
      <Link to={`/pokemon/${pokemon.name}`}>
        <div className="PokemonCard__image">
          <img src={pokemon.sprites?.front_default} alt="" />
        </div>
        <h3 className="PokemonCard__name">{name}</h3>
        <ul className="PokemonCard__description">
          {pokemon.types?.map((type) => (
            <li key={type?.type.name}>{type?.type.name}</li>
          ))}
        </ul>
      </Link>
    </div>
  ) : (
    <p>loading</p>
  );
};

export default PokemonCard;
