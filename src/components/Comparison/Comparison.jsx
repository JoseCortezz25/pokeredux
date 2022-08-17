import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../service/fetchData";
import "./Comparison.css";
import Loader from "../Loader/Loader";

const Comparison = () => {
  const comparePokemons = useSelector(state => state.comparePokemons);
  const [pokemon1, setPokemon1] = useState({});
  const [pokemon2, setPokemon2] = useState({}); 

  useEffect(() => {
    const getInfoPokemons = async () => {
      try {
        const results = await Promise.all(
          comparePokemons.map((pokemon) => getPokemon(pokemon))
        );
        setPokemon1(results[0]);
        setPokemon2(results[1]);
      } catch (error) {
        console.error(error);
      }
    };

    getInfoPokemons();
  }, []);

  if (!pokemon1 && !pokemon2) { 
    return <Loader />
  }

  return comparePokemons.length === 2 ? (
    <section className="Comparison">
      <div className="ComparisonPokemon">
        <div className="ComparisonPokemon__images">
          <div className="PokemonImage">
            <h3>Default</h3>
            <div>
              <img src={pokemon1.sprites?.front_default} alt={pokemon1.name} />
              <img src={pokemon1.sprites?.back_default} alt={pokemon1.name} />
            </div>
          </div>
          <div className="PokemonComplementaryImage">
            <h3>Shiny</h3>
            <div>
              <img src={pokemon1.sprites?.front_shiny} alt={pokemon1.name} />
              <img src={pokemon1.sprites?.back_shiny} alt={pokemon1.name} />
            </div>
          </div>
        </div>
        <h2 className="PokemonName">{pokemon1.name}</h2>
        <div className="ComparisonPokemon__species">
          <ul className="TypesPokemon">
            {pokemon1.types?.map((type) => (
              <li key={type?.type.name}>{type?.type.name}</li>
            ))}
          </ul>
        </div>
        <div className="ComparisonPokemon__about">
          <h2>About</h2>

          <div >
            <p>
              <strong>Specie: </strong> {pokemon1.species?.name}
            </p>
            <p>
              <strong>Height:</strong> {pokemon1.height} m
            </p>
            <p>
              <strong>Weight:</strong> {pokemon1.weight} kg
            </p>
          </div>
          <div className="SectionInfo">
            <p>
              <strong>Abilities: </strong>
              {pokemon1.abilities?.map((ability) => ability.ability?.name)
                .join(", ")}
            </p>
          </div>

          <h2>Base Stats</h2>
          <div className="SectionInfo Stats">
            {pokemon1.stats?.map((stat) => (
              <p>
                <strong>{stat.stat.name}: </strong>
                {stat.effort} - {stat.base_stat} <br />
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="ComparisonPokemon">
        <div className="ComparisonPokemon__images">
          <div className="PokemonImage">
            <h3>Default</h3>
            <div>
              <img src={pokemon2.sprites?.front_default} alt={pokemon2.name} />
              <img src={pokemon2.sprites?.back_default} alt={pokemon2.name} />
            </div>
          </div>
          <div className="PokemonComplementaryImage">
            <h3>Shiny</h3>
            <div>
              <img src={pokemon2.sprites?.front_shiny} alt={pokemon2.name} />
              <img src={pokemon2.sprites?.back_shiny} alt={pokemon2.name} />
            </div>
          </div>
        </div>
        <h2 className="PokemonName">{pokemon2.name}</h2>
        <div className="ComparisonPokemon__species">
          <ul className="TypesPokemon">
            {pokemon2.types?.map((type) => (
              <li key={type?.type.name}>{type?.type.name}</li>
            ))}
          </ul>
        </div>
        <div className="ComparisonPokemon__about">
          <h2>About</h2>

          <div >
            <p>
              <strong>Specie: </strong> {pokemon2.species?.name}
            </p>
            <p>
              <strong>Height:</strong> {pokemon2.height} m
            </p>
            <p>
              <strong>Weight:</strong> {pokemon2.weight} kg
            </p>
          </div>
          <div className="SectionInfo">
            <p>
              <strong>Abilities: </strong>
              {pokemon2.abilities?.map((ability) => ability.ability?.name)
                .join(", ")}
            </p>
          </div>

          <h2>Base Stats</h2>
          <div className="SectionInfo Stats">
            {pokemon2.stats?.map((stat) => (
              <p>
                <strong>{stat.stat.name}: </strong>
                {stat.effort} - {stat.base_stat} <br />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>
      There are no or enough pokemons to compare. Go back to home and select two
      pokemons to compare.
      <Link to="/">
        <a>
          <button>Go back home</button>
        </a>
      </Link>
    </div>
  );
};

export default Comparison;
