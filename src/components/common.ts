export type Tile = 'X' | 'O' | ' ';
export type PlayerMarker = 'X' | 'O';

export type Winner = {
  player: PlayerMarker,
  winningTiles: number[],
  soundKey: 'winner' | 'loser' | 'draw',
};

export type UpdateGamePayload = {
  r: number,
  c: number,
  p: PlayerMarker,
};
