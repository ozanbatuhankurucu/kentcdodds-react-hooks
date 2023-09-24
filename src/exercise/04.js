// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )

  const [history, setHistory] = React.useState([])
  const [currentStep, setCurrentStep] = React.useState(null)
  const winner = calculateWinner(squares)

  const status = (function () {
    const nextPlayer = calculateNextValue(squares)

    if (winner) {
      return `Winner: ${winner}`
    } else {
      if (squares.every(Boolean)) {
        return `Scratch: Cat's game`
      } else {
        return `Next player: ${nextPlayer}`
      }
    }
  })()

  const notEmptySquares = squares.filter(square => Boolean(square))

  function selectSquare(square) {
    if (squares[square] !== null || winner) return

    const squaresCopy = [...squares]
    const nextValue = calculateNextValue(squares)
    squaresCopy[square] = nextValue

    setCurrentStep(squares.filter(square => Boolean(square)).length)
    setSquares(squaresCopy)
    setHistory(prev => [...prev.slice(0, notEmptySquares.length), squaresCopy])
  }

  function restart() {
    setSquares(Array(9).fill(null))
    setHistory([])
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">STATUS: {status}</div>

        <ol>
          <li>
            <div>
              <button
                disabled={notEmptySquares.length === 0}
                onClick={() => {
                  setSquares(Array(9).fill(null))
                  setCurrentStep(null)
                }}
              >
                Go to game start {currentStep === null && '(current)'}
              </button>
            </div>
          </li>
          {history.map((square, index) => (
            <li>
              <button
                disabled={index === currentStep}
                onClick={() => {
                  setSquares([...history[index]])
                  setCurrentStep(index)
                }}
              >
                Go to move #{index + 1} {index === currentStep && '(current)'}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
