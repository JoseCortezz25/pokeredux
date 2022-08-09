import axios from 'axios';

const API = 'https://pokeapi.co/api/v2';

export const getAllPokemons = () => {
  return axios.get(`${API}/pokemon`)
    .then(response => response.data.results)
    .catch(error => console.log(error));
    // .then(response => response.json())
    // .then(data => data.results)
    // .catch(error => console.log(error));
}