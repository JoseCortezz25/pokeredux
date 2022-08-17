import { useState, useEffect } from "react";
import {
  getAllTypesPokemon,
  getAllPokemons,
  getPokemonDetails,
} from "../../service/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons } from "../../actions";
import Loader from "../Loader/Loader";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Home.css";

const Home = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  const [pokemonSearched, setPokemonSearched] = useState(pokemons);
  const [typeOfPokemons, setTypeOfPokemons] = useState([]);

  const searchPokemon = (search) => {
    const filteredPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
    });
    if (search === "") {
      setPokemonSearched(pokemons);
    }
    setPokemonSearched(filteredPokemons);
  };

  const filterBySpecie = (event) => {
    if (event.target.value === "all") return setPokemonSearched(pokemons);

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.types.some(
        (type) => type.type.name === event.nativeEvent.target.value
      )
    );

    const matchBetweenPokemonsAndFiltered = pokemons.filter((pokemon) => {
      return filteredPokemons.some((filteredPokemon) => {
        return filteredPokemon.name === pokemon.name;
      });
    });

    setPokemonSearched(matchBetweenPokemonsAndFiltered);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { results } = await getAllPokemons();
        const pokemonDetailed = await Promise.all(
          results.map((pokemon) => getPokemonDetails(pokemon))
          );
          
          dispatch(setPokemons(pokemonDetailed));
          setPokemonSearched(pokemonDetailed);
        } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();

    getAllTypesPokemon()
      .then((data) => {
        setTypeOfPokemons(data.map((specie) => specie.name));
      })
      .catch((err) => console.log("getAllTypesPokemon err", err));
  }, []);

  return (
    <div className="Home">
      <div className="Home__filters">
        <Search setSearch={searchPokemon} />
        <select onChange={filterBySpecie}>
          <option disabled>Choose an Specie</option>
          <option value="all">💂 All species</option>
          {typeOfPokemons?.map((specie) => (
            <option value={specie}>{specie.replaceAll("-", " ")}</option>
          ))}
        </select>
      </div>
      {pokemonSearched.length > 0 ? (
        <PokemonList pokemons={pokemonSearched} />
      ) : (
        <div className="Loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
