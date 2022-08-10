import axios from 'axios';

const API = 'https://pokeapi.co/api/v2';

export const getAllPokemons = (limit = 50) => {
  return axios.get(`${API}/pokemon?limit=${limit}?`)
    .then(response => response.data.results)
    .catch(error => console.log(error));
}

export const getPokemon = (name) => {
  return axios.get(`${API}/pokemon/${name}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}