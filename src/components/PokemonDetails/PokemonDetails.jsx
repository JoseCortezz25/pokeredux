import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../service/fetchData";
import "./PokemonDetails.css";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    getPokemon(name)
      .then((data) => {
        setPokemon(data);
      })
      .catch((err) => console.log(err));
  }, [name]);
  console.log(pokemon);

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
      return `AboutPokemon Type${type[0].toUpperCase() + type.slice(1)}`;
    }
    return "AboutPokemon";
  };

  return pokemon ? (
    <section className="PokemonDetails">
      <div className="PokemonDetails__images">
        <div className="PokemonImage">
          <h3>Default</h3>
          <div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <img src={pokemon.sprites.back_default} alt={pokemon.name} />
          </div>
        </div>
        <div className="PokemonComplementaryImage">
          <h3>Shiny</h3>
          <div>
            <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
            <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
          </div>
        </div>
      </div>
      <div className="PokemonDetails__content">
        <h1>{pokemon.name}</h1>
        <ul className="TypesPokemon">
          {pokemon.types?.map((type) => (
            <li key={type?.type.name}>{type?.type.name}</li>
          ))}
        </ul>
        <h2>About</h2>

        <div className={detectTypePokemon(pokemon.types[0]?.type.name)}>
          <p>
            <strong>Specie: </strong> {pokemon.species.name}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height} m
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight} kg
          </p>
        </div>
        <div className="SectionInfo">
          <p>
            <strong>Abilities: </strong>
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
        </div>

        <h2>Base Stats</h2>
        <div className="SectionInfo Stats">
          {pokemon.stats.map((stat) => (
            <p>
              <strong>{stat.stat.name}: </strong>
              {stat.effort} - {stat.base_stat} <br />
            </p>
          ))}
        </div>
      </div>
    </section>
  ) : (
    <p>Loading...</p>
  );
};

export default PokemonDetails;
