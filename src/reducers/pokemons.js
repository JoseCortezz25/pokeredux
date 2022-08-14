import { SET_POKEMONS, SET_POKEMONS_WITH_DETAILS, SET_COMPARE_POKEMONS } from "../actions/types";

const initialState = {
  pokemons: [],
  pokemonsDetails: [],
  comparePokemons: [],
}

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case SET_POKEMONS_WITH_DETAILS:
      return {
        ...state,
        pokemonsDetails: [...state.pokemonsDetails, action.payload]
      };
    case SET_COMPARE_POKEMONS:
      return {
        ...state,
        comparePokemons: [...state.comparePokemons, action.payload]
      }
    default:
      return state;
  }
}