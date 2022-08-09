import React from 'react'
import PokemonCard from '../PokemonCard/PokemonCard'

const PokemonList = ({ pokemons }) => {
  return (
    <section>
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </section>
  )
}

export default PokemonList