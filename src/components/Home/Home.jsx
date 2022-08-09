import { useState, useEffect } from "react";
import { getAllPokemons } from "../../service/fetchData";
import PokemonList from "../PokemonList/PokemonList";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getAllPokemons()
      .then(data => {
        setPokemon(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <section>
      <PokemonList pokemons={pokemon} />
    </section>
  )
};

export default Home;
