// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
  fetchPokemon,
} from '../pokemon'
import {ErrorBoundary} from '../utils'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {error, pokemon, status} = state

  const fetchData = React.useCallback(async () => {
    setState(prev => ({
      ...prev,
      status: 'pending',
    }))
    try {
      const poke = await fetchPokemon(pokemonName)
      setState(prev => ({...prev, status: 'resolved', pokemon: poke}))
    } catch (err) {
      setState(prev => ({...prev, status: 'rejected', error: err}))
    }
  }, [pokemonName])

  React.useEffect(() => {
    if (!pokemonName) {
      setState(prev => ({...prev, status: 'idle'}))
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
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <ErrorBoundary>
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App
