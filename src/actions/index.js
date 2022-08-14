import { SET_POKEMONS, SET_POKEMONS_WITH_DETAILS, SET_COMPARE_POKEMONS } from "./types";

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