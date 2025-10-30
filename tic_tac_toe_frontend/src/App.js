import React, { useMemo, useState } from "react";
import "./App.css";
import "./index.css";
import "./styles.css";
import Board from "./components/Board";

/**
 * App component renders the Tic Tac Toe game.
 * Features:
 * - 3x3 board with clickable cells
 * - Turn indicator for current player
 * - Win detection with highlighted line
 * - Draw detection
 * - Reset/New Game control
 * - Responsive, light-themed styling
 */
// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Check for a winner and the winning line (if any)
  const { winner, winningLine } = useMemo(() => calculateWinner(squares), [squares]);

  const isBoardFull = useMemo(() => squares.every((s) => s !== null), [squares]);
  const isGameOver = Boolean(winner) || (isBoardFull && !winner);

  // PUBLIC_INTERFACE
  const handleSquareClick = (i) => {
    // Prevent overriding moves, and ignore clicks after game over
    if (squares[i] || isGameOver) return;

    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const statusText = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? "It's a draw!"
    : `Current Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="ttt-app">
      <div className="ttt-card">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div
          className={`ttt-status ${winner ? "ttt-status--win" : ""} ${
            !winner && isBoardFull ? "ttt-status--draw" : ""
          }`}
          aria-live="polite"
        >
          {statusText}
        </div>

        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />

        <div className="ttt-actions">
          <button
            className="ttt-button"
            onClick={handleReset}
            aria-label="Start a new game"
          >
            New Game
          </button>
        </div>

        <footer className="ttt-footer">
          <span>Two players • Local play • No history</span>
        </footer>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default App;

/**
 * Determine if there is a winner on the board.
 * Returns an object: { winner: 'X' | 'O' | null, winningLine: number[] | null }
 */
function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { winner: sq[a], winningLine: [a, b, c] };
    }
  }
  return { winner: null, winningLine: null };
}
