// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(localStorageKey, initialValue = '', options) {
  const {serialize = JSON.stringify, deserialize = JSON.parse} = options || {}
  const [value, setValue] = React.useState(() => {
    const localStorageValue = window.localStorage.getItem(localStorageKey)
    if (localStorageValue) {
      return deserialize(localStorageValue)
    }

    return initialValue
  })

  const prevLocalStorageKeyValue = React.useRef(localStorageKey)

  React.useEffect(() => {
    const prevKeyValue = prevLocalStorageKeyValue.current

    if (prevKeyValue !== localStorageKey) {
      localStorage.removeItem(prevKeyValue)
    }
    prevLocalStorageKeyValue.current = localStorageKey

    localStorage.setItem(localStorageKey, serialize(value))
  }, [value, localStorageKey, serialize])

  return [value, setValue]
}

function Greeting({initialName}) {
  const [name, setName] = useLocalStorageState('nameValue8', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Ozan" />
}

export default App
