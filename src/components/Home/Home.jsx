import { useState, useEffect } from "react";
import {
  getLocationAreas,
  getAllTypesPokemon,
  getAllPokemons,
  getPokemonByUrl,
} from "../../service/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons } from "../../actions";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Home.css";

const Home = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  const [locations, setLocations] = useState();
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

  const filterByLocation = (event) => {
    console.log("value", event);
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
          results.map((pokemon) => getPokemonByUrl(pokemon))
        );
        console.log("pokemonDetailed", pokemonDetailed);
        dispatch(setPokemons(pokemonDetailed));
        setPokemonSearched(pokemonDetailed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();

    getLocationAreas()
      .then((data) => {
        setLocations(data.map((location) => location.name));
      })
      .catch((error) => console.log(error));

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
        <div>
          <form onSubmit={filterByLocation}>
            <select>
              <option disabled>Choose an option</option>
              {locations?.map((location) => (
                <option value={location}>
                  {location.replaceAll("-", " ")}
                </option>
              ))}
            </select>
          </form>

          <form onSubmit={filterBySpecie}>
            <select onChange={filterBySpecie}>
              <option disabled>Choose an Specie</option>
              <option value="all">💂 All species</option>
              {typeOfPokemons?.map((specie) => (
                <option value={specie}>{specie.replaceAll("-", " ")}</option>
              ))}
            </select>
          </form>

          <button>🎟 Color</button>
        </div>
      </div>
      {pokemonSearched ? (
        <PokemonList pokemons={pokemonSearched} />
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default Home;
