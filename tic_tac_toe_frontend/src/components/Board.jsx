import React from "react";
import Square from "./Square";

/**
 * Board component renders the 3x3 grid of squares.
 * Props:
 * - squares: array of 9 items containing 'X', 'O', or null
 * - onSquareClick: function(index) to handle clicks on a square
 * - winningLine: array of 3 indices that form the winning line, or null
 */
// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, winningLine }) {
  const renderSquare = (i) => {
    const isWinning = Array.isArray(winningLine) && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        isWinning={isWinning}
      />
    );
  };

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {[0, 1, 2].map((row) => (
        <div className="ttt-row" role="row" key={row}>
          {[0, 1, 2].map((col) => {
            const idx = row * 3 + col;
            return (
              <div className="ttt-cell" role="gridcell" key={idx}>
                {renderSquare(idx)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
