import { SET_POKEMONS, SET_POKEMONS_WITH_DETAILS } from "./types";

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