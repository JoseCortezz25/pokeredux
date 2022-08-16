import { 
  SET_POKEMONS, 
  SET_POKEMONS_WITH_DETAILS, 
  SET_COMPARE_POKEMONS,
  CLEAN_COMPARE_POKEMONS,
  DELETE_POKEMON_FROM_COMPARE
} from "../actions/types";

const initialState = {
  pokemons: [],
  pokemonsDetails: [],
  comparePokemons: [],
}

export const pokemonsReducer = (state = initialState, action) => {

  console.log('action', action);

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
        comparePokemons: state.comparePokemons.includes(action.payload) ? state.comparePokemons : [...state.comparePokemons, action.payload]
      }
    case CLEAN_COMPARE_POKEMONS:
      return {
        ...state,
        comparePokemons: []
      }
    case DELETE_POKEMON_FROM_COMPARE:
      return {
        ...state,
        comparePokemons: state.comparePokemons.filter(pokemon => pokemon !== action.payload)
      }
    default:
      return state;
  }
}