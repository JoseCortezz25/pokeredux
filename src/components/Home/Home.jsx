import { useState, useEffect } from "react";
import { getAllPokemons } from "../../service/fetchData";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Home.css'

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonSearched, setPokemonSearched] = useState(pokemons);

  const searchPokemon = (search) => {
    const filteredPokemons = pokemons.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
    });
    if(search === "") {
      setPokemonSearched(pokemons);
    } 
    setPokemonSearched(filteredPokemons);
  }

  useEffect(() => {
    getAllPokemons()
      .then((data) => {
        setPokemons(data);
        setPokemonSearched(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Home">
      <Search setSearch={searchPokemon} />
      <PokemonList pokemons={pokemonSearched} />
    </div>
  );
};

export default Home;
