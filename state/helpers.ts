import { PlayerMarker, TileState } from '../types';

const winningRows = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const winningCols = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
const winningDiag = [[1, 5, 9], [3, 5, 7]];

export const updateBoard = (
  board: TileState[],
  index: number,
  player: PlayerMarker
) => {
  if (board[index] !== TileState.EMPTY) {
    return board;
  }

  return board.map((t: TileState, tileIndex: number) => {
    if (tileIndex === index) {
      return player;
    }
    return t;
  });
};

export const getNextPlayer = (p: PlayerMarker) =>
  p === TileState.X ? TileState.O : TileState.X;

export const getWinner = (board: TileState[]): PlayerMarker | null => {
  const rows = winningRows;
  const cols = winningCols;
  const diag = winningDiag;

  const getWinnerFor = (indicess: number[][]): PlayerMarker | null => {
    let winner = null;
    for (let player of [TileState.O, TileState.X]) {
      for (let indices of indicess) {
        if (indices.every(idx => board[idx - 1] === player)) {
          winner = player;
        }
      }
    }
    return winner;
  };

  const winner = getWinnerFor(rows) || getWinnerFor(cols) || getWinnerFor(diag);
  if (winner) {
    console.debug("There is a winner:", winner);
  }

  return winner;
};

export const isEmpty = (board: TileState[]): boolean =>
  board.every(t => t === TileState.EMPTY);

export const isFilled = (board: TileState[]): boolean =>
  !isEmpty(board);

export const availableTilesIndices = (board: TileState[]): number[] => {
  return board
    .map((t: TileState, i: number) => t === TileState.EMPTY ? i : null)
    .filter(i => i);
};

export const minimax = (gameBoard: TileState[]): TileState[] => {
  const availableTiles = availableTilesIndices(gameBoard);



  return gameBoard;
};
