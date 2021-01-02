import {PlayerMarker, Tile, UpdateGamePayload, Winner} from './common';

const winningRows = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const winningCols = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
const winningDiag = [[1, 5, 9], [3, 5, 7]];

const winningCombinations = [
  ...winningRows,
  ...winningCols,
  ...winningDiag,
];
const players: PlayerMarker[] = ['X', 'O'];

const getTile = (board: Tile[][], index: number): Tile => {
  const row = Math.floor((index - 1) / 3);
  const col = (index - 1) % 3;
  return board[row][col];
};

const isWinningCombination = (board: Tile[][], combination: number[], player: PlayerMarker): Winner | null => {
  const isWinning = combination.map(index => getTile(board, index)).every(t => t === player);
  if (isWinning) {
    return {
      player,
      winningTiles: combination,
    };
  }
  return null;
};

const getWinnerWithMarker = (board: Tile[][], player: PlayerMarker): Winner | null =>
  winningCombinations.reduce<Winner | null>((winner, comb) =>
    winner || isWinningCombination(board, comb, player), null);

const getWinner = (board: Tile[][]): Winner | null =>
  players.reduce<Winner | null>((winner, player) =>
    winner || getWinnerWithMarker(board, player), null);

const boardFilled = (board: Tile[][]): boolean =>
  board.map(tiles => tiles.every(tile => tile !== ' ')).every(b => b);

const updateBoard = (board: Tile[][], payload: UpdateGamePayload): Tile[][] =>
  board.map((tiles, row) =>
    tiles.map((tile, col) => {
      if (row === payload.r && col === payload.c && tile === ' ') {
        return payload.p;
      }
      return tile;
    }));

export {
  boardFilled, getWinner, updateBoard,
};
