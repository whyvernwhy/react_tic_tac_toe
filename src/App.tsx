import React from 'react';
import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

const PLAYER_X: string = "❌"
const PLAYER_O: string = "⭕"

type Move = string | null

function App() {
  return Game();
}

function Game() {
  const [history, setHistory]: [history: Move[][], setHistory: any] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove]: [currentMove: number, setCurrentMove: any] = useState(0)
  const xIsNext: boolean = currentMove % 2 === 0
  const currentSquares: Move[] = history[currentMove]
  const moves = history.map((squares, move: number) => {
    let description = move > 0 ? `Go to move #${move}` : `Start over`

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  function handlePlay(nextSquares: Move[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean, squares: Move[], onPlay: (nextSquares: Move[]) => void }) {
  const winner = calculateWinner(squares)
  let status: Move = null;

  status = winner ? `Winner: ${winner}` : `Up next: ${xIsNext ? PLAYER_X : PLAYER_O}`

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? PLAYER_X : PLAYER_O
    onPlay(nextSquares)
  }

  return (<>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
    
  );
}

function Square({ value, onSquareClick }: {value: Move, onSquareClick: any}) {  
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function calculateWinner(squares: any[]): Move { 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
