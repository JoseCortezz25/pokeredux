import React from 'react'

const PokemonCard = ({pokemon: { name }}) => {
  return (
    <div>
      <h3>{name}</h3>
    </div>
  )
}

export default PokemonCard