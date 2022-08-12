import { useEffect, useState } from "react";
import { getAllTypesPokemon, getPokemon } from "../../service/fetchData";
import { Link } from "react-router-dom";
import { setPokemonsDetails } from "../../actions";

import "./PokemonCard.css";
import { useDispatch } from "react-redux";

const PokemonCard = ({ name }) => {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState({});
  const [typesPokemon, setTypesPokemon] = useState([]);
  const [typeOfPokemons, setTypeOfPokemons] = useState([]);

  useEffect(() => {
    getPokemon(name)
      .then((data) => {
        setPokemon(data);
        dispatch(setPokemonsDetails(data));
        setTypesPokemon(data.types[0].type.name);
      })
      .catch((err) => console.log("getPokemon err", err));

    getAllTypesPokemon()
      .then((data) => {
        setTypeOfPokemons(data.map(specie => specie.name));
      })
      .catch((err) => console.log("getAllTypesPokemon err", err));

  }, [name]);

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
