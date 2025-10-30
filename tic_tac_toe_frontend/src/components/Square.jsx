import React from "react";

/**
 * Square component represents a single cell in the Tic Tac Toe board.
 * It renders a button showing 'X', 'O', or empty, and can be highlighted when part of a winning line.
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`ttt-square ${isWinning ? "ttt-square--win" : ""}`}
      onClick={onClick}
      aria-label={`Board cell ${value ? value : "empty"}`}
    >
      {value}
    </button>
  );
}
