import { useState, useEffect } from "react";
import { getPokemonByPage } from "../../service/fetchData";
import Pagination from "../Pagination/Pagination";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Home.css";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [pokemonSearched, setPokemonSearched] = useState(pokemons);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const searchPokemon = (search) => {
    const filteredPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
    });
    if (search === "") {
      setPokemonSearched(pokemons);
    }
    setPokemonSearched(filteredPokemons);
  };

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  useEffect(() => {
    getPokemonByPage(currentPageUrl)
      .then((data) => {
        console.log(data);
        setPokemons(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        setPokemonSearched(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPageUrl]);

  return (
    <div className="Home">
      <div className="Home__filters">
        <Search setSearch={searchPokemon} />
        <div>
          <button>🚂 Location</button>
          <button>🏷 Types</button>
          <button>🎟 Species</button>
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
