// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(initialValue, localStorageKey) {
  const [value, setValue] = React.useState(
    () =>
      JSON.parse(window.localStorage.getItem(localStorageKey)) || initialValue,
  )

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [value, localStorageKey])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName, 'value')

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
  return <Greeting />
}

export default App
