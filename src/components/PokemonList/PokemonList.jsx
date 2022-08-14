import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css";

const PokemonList = ({ pokemons }) => {
  return (
    <section className="PokemonList">
      {pokemons ? (
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            sprites={pokemon.sprites}
            species={pokemon.types}
          />
        ))
      ) : (
        <p>loading</p>
      )}
    </section>
  );
};

export default PokemonList;
