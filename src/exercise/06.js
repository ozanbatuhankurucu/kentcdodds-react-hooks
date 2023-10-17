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
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState('idle')

  const fetchData = React.useCallback(async () => {
    setStatus('pending')
    setError(null)
    setPokemon(null)
    try {
      const poke = await fetchPokemon(pokemonName)
      setStatus('resolved')
      setPokemon(poke)
    } catch (err) {
      setStatus('rejected')
      setError(err)
    }
  }, [pokemonName])

  React.useEffect(() => {
    if (!pokemonName) {
      setStatus('idle')
      return
    }
    fetchData()
  }, [pokemonName, fetchData])

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
  if (status === 'idle') return 'Submit a pokemon'
  if (status === 'pending') return <PokemonInfoFallback name={pokemonName} />
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
