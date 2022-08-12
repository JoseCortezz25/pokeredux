import { SET_POKEMONS, SET_POKEMONS_WITH_DETAILS } from "../actions/types";

const initialState = {
  pokemons: [],
  pokemonsDetails: []
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
    default:
      return state;
  }
}