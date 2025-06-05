import { useState, useEffect } from 'react';
import type { Cell } from '../types/Minesweeper'; 

const critAudio = new Audio('/audio/critical-stop.mp3');

export function useMinesweeper(rows: number, cols: number, mines: number) {
  const [board, setBoard] = useState<Cell[][]>([]); 
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  

    // Initialize the board with empty cells, then place mines and calculate neighbor mines.
    const generateBoard = () => {

        // Create a new board with the specified number of rows and columns
        const newBoard: Cell[][] = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
                }))
        );

        // Randomly place mines on the board
        let minesPlaced = 0;
        while (minesPlaced < mines) {
            const x = Math.floor(Math.random() * rows);
            const y = Math.floor(Math.random() * cols);
            if (!newBoard[x][y].isMine) {
                newBoard[x][y].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate neighbor mines for each cell
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                if (newBoard[x][y].isMine) continue;
                let mineCount = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue; // Skip the cell itself
                        const nx = x + dx;
                        const ny = y + dy;
                        if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && newBoard[nx][ny].isMine) {
                            mineCount++;
                        }
                    }
                }
                newBoard[x][y].neighborMines = mineCount;
            }
        }

        setBoard(newBoard);
        setGameStatus('playing');
    };

    useEffect(() => {
        // Generate the board when the hook is first used
        generateBoard();
    }, []);

   

    const revealCell = (x: number, y: number) => {
        console.log(`Revealing cell at (${x}, ${y})`);
        if (gameStatus !== 'playing' || board[x][y].isRevealed) return;

        const newBoard = [...board];
        const cell = newBoard[x][y];

        if (cell.isMine) {
            // Reveal all mines
            const revealedBoard = board.map((row, xi) =>
                row.map((c, yi) => ({
                    ...c,
                isRevealed: c.isMine || c.isRevealed,
                // Optional: track exploded cell
                exploded: xi === x && yi === y && c.isMine
                }))
            );
        setBoard(revealedBoard);
        setGameStatus('lost');
        critAudio.play();
        console.log('Game Over! You hit a mine.');
        return;
    }


        cell.isRevealed = true;

        // If the cell has no neighboring mines, reveal adjacent cells
        if (cell.neighborMines === 0) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
                        revealCell(nx, ny);
                    }
                }
            }
        }

        setBoard(newBoard);
        checkWin();
    }

    const toggleFlag = (x: number, y: number) => {
        if (gameStatus !== 'playing' || board[x][y].isRevealed) return;

        const newBoard = [...board];
        newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
        setBoard(newBoard);
        checkWin();
    };

    const checkWin = () => {
        if (gameStatus !== 'playing') return;

        const allCellsRevealedOrFlagged = board.every(row =>
            row.every(cell => cell.isRevealed || (cell.isFlagged && cell.isMine))
        );

        if (allCellsRevealedOrFlagged) {
            setGameStatus('won');
        }
    };

    const resetGame = () => {
        setGameStatus('playing');
        generateBoard();
    };

    

  return {
    board,
    gameStatus,
    revealCell,
    toggleFlag,
    resetGame,
  };
}
