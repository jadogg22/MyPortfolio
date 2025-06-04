export interface Cell {
  isMine: boolean;
  exploded?: boolean
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}