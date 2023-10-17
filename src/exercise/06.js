// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
  fetchPokemon,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)

  const fetchData = React.useCallback(async () => {
    setPokemon(null)
    const poke = await fetchPokemon(pokemonName)
    setPokemon(poke)
  }, [pokemonName])

  React.useEffect(() => {
    if (!pokemonName) return
    fetchData()
  }, [pokemonName, fetchData])

  if (!pokemonName) return 'Submit a pokemon'
  if (pokemonName && !pokemon) return <PokemonInfoFallback name={pokemonName} />
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm
        pokemonName={pokemonName}
        onSubmit={handleSubmit}
        onChange={e => setPokemonName(e.target.value)}
      />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
