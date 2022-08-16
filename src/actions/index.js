import { 
  SET_POKEMONS, 
  SET_POKEMONS_WITH_DETAILS, 
  SET_COMPARE_POKEMONS, 
  CLEAN_COMPARE_POKEMONS,
  DELETE_POKEMON_FROM_COMPARE
} from "./types";

export const setPokemons = (payload) => {
  return {
    type: SET_POKEMONS,
    payload,
  };
}

export const setPokemonsDetails = (payload) => {
  return {
    type: SET_POKEMONS_WITH_DETAILS,
    payload,
  };
}

export const setComparePokemons = (payload) => {
  return {
    type: SET_COMPARE_POKEMONS,
    payload,
  };
}

export const cleanComparePokemons = () => {
  return {
    type: CLEAN_COMPARE_POKEMONS,
  };
}

export const deletePokemonFromCompare = (payload) => {
  return {
    type: DELETE_POKEMON_FROM_COMPARE,
    payload
  }
}