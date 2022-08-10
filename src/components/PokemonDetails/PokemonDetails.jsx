import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../service/fetchData";
import "./PokemonDetails.css";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    getPokemon(name)
      .then((data) => setPokemon(data))
      .catch((err) => console.log(err));
  }, [name]);
  console.log(pokemon);

  return pokemon ? (
    <section className="PokemonDetails">
      <div className="PokemonDetails__images">
        <div className="PokemonImage">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className="PokemonComplementaryImage">
        <img src={pokemon.sprites.back_default} alt={pokemon.name} />
        </div>
      </div>
      <div className="PokemonDetails__content">
        <h1>{pokemon.name}</h1>
        <p>
          <strong>Height:</strong> {pokemon.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight}
        </p>
        <h3>Abilities</h3>
        <p>
          <strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
        <p>
          <strong>Types:</strong> {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>

        <h3>Species</h3>
        <p>
          {pokemon.species.name}
        </p>

        <h3>Stats</h3>
          {pokemon.stats.map((stat) => (
            <>
              {stat.base_stat} - {stat.effort} - {stat.stat.name} <br />

            </>
          ))}
      
      </div>
    </section>
  ) : (
    <p>Loading...</p>
  );
};

export default PokemonDetails;
