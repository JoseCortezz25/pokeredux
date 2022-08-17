import axios from 'axios';

const API = 'https://pokeapi.co/api/v2';

export const getAllPokemons = (limit = 151) => {
  return axios.get(`${API}/pokemon?limit=${limit}`)
    .then(response => {
      console.log(response.data.next);
      return {
        results: response.data.results,
        next: response.data.next
      };
    })
    .catch(error => console.log(error));
}

export const getPokemon = (name) => {
  return axios.get(`${API}/pokemon/${name}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export const getPokemonDetails = (pokemon) => {
  return axios.get(pokemon.url)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export const getAllTypesPokemon = () => {
  return axios.get(`${API}/type`)
    .then(response => response.data.results)
    .catch(error => console.log(error));
}