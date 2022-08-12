import { useState, useEffect } from "react";
import {
  getPokemonByPage,
  getLocationAreas,
  getAllTypesPokemon,
} from "../../service/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons } from "../../actions";
import Pagination from "../Pagination/Pagination";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Home.css";

const Home = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const pokemonsDetails = useSelector((state) => state.pokemonsDetails);
  const dispatch = useDispatch();

  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [locations, setLocations] = useState();
  const [pokemonSearched, setPokemonSearched] = useState(pokemons);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
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

  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  const filterByLocation = (event) => {
    console.log("value", event);
  };

  const filterBySpecie = (event) => {
    if (event.target.value === "all") return setPokemonSearched(pokemons);

    const filteredPokemons = pokemonsDetails.filter((pokemon) =>
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
    getPokemonByPage(currentPageUrl)
      .then((data) => {
        console.log(data);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        dispatch(setPokemons(data.results));
        setPokemonSearched(data.results);
      })
      .catch((err) => {
        console.log(err);
      });

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
  }, [currentPageUrl]);

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
      <PokemonList pokemons={pokemonSearched} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </div>
  );
};

export default Home;
