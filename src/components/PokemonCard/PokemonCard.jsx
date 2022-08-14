import { useEffect, useState } from "react";
import { getAllTypesPokemon } from "../../service/fetchData";
import { Link } from "react-router-dom";
import "./PokemonCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setComparePokemons } from "../../actions";

const PokemonCard = ({ name, sprites, species }) => {
  const [listTypesOfPokemons, setListTypesOfPokemons] = useState([]);
  const comparePokemons = useSelector((state) => state.comparePokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllTypesPokemon()
      .then((data) => {
        setListTypesOfPokemons(data.map((specie) => specie.name));
      })
      .catch((err) => console.log("getAllTypesPokemon err", err));
  }, []);

  const detectTypePokemon = (type) => {
    if (listTypesOfPokemons.includes(type)) {
      return `PokemonCard Type${type[0].toUpperCase() + type.slice(1)}`;
    }
    return "PokemonCard";
  };

  const addPokemonToCompare = (pokemonName) => {
    if (comparePokemons.length < 2) {
      dispatch(setComparePokemons(pokemonName));
    }
  };

  return (
    <div className={`${detectTypePokemon(species[0].type.name)}`}>
      <button onClick={() => addPokemonToCompare(name)}>
        Compare with another
      </button>
      <Link to={`/pokemon/${name}`}>
        <div className="PokemonCard__image">
          <img src={sprites?.front_default} alt="" />
        </div>
        <h3 className="PokemonCard__name">{name}</h3>
        <ul className="PokemonCard__description">
          {species?.map((type) => (
            <li key={type?.type.name}>{type?.type.name}</li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default PokemonCard;
