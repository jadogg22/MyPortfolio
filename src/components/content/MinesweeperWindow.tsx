import React from 'react';
import { useMinesweeper } from '../../games/useMinesweeper';

export const MinesweeperWindow: React.FC = () => {
  const {
    board,
    gameStatus,
    revealCell,
    toggleFlag,
    resetGame,
  } = useMinesweeper(10, 10, 10); // rows, cols, mines

  if (board.length === 0) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-2 font-mono text-xs bg-gray-100 select-none">
      <div className="flex justify-between items-center mb-2">
        <span>Status: <strong>{gameStatus}</strong></span>
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
        >
          Reset
        </button>
      </div>

      <div
        className="grid border border-black justify-center
"
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, 24px)`
        }}
      >
        {board.map((row, x) =>
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              onClick={() => revealCell(x, y)}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleFlag(x, y);
              }}
              className={`w-6 h-6 flex items-center justify-center border border-gray-400 transition-all duration-200 ease-in-out hover:bg-gray-400
                ${cell.isRevealed ? 'bg-white' : 'bg-gray-300'}
                ${cell.isFlagged && !cell.isRevealed ? 'bg-yellow-300' : ''}
                ${cell.isRevealed && cell.isMine ? 'bg-red-400' : ''}
                ${cell.exploded ? 'bg-red-600 text-white font-bold' : ''}
                ${cell.isFlagged && !cell.isRevealed ? 'bg-yellow-300 text-black' : ''}
                cursor-pointer select-none
              `}
            >
              {cell.isRevealed
                ? cell.isMine
                ? cell.exploded
                  ? '💥' // exploded mine
                  : '💣' // just a mine
                : cell.neighborMines || ''
                : cell.isFlagged
                  ? '🚩'
                    : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
