export enum TileState {
  EMPTY,
  X,
  O,
}

export type PlayerMarker = TileState.X | TileState.O;

export interface AppState {
  board: TileState[];
  draw: boolean;
  player: PlayerMarker;
  winner: PlayerMarker | null;
}

export enum BoardActions {
  SetCell = '[board] set_cell',
  Reset = '[board] reset',
}

interface SetCellAction {
  type: BoardActions.SetCell,
  payload: { index: number },
}

interface ResetAction {
  type: BoardActions.Reset,
}

export type BoardActionsT = SetCellAction | ResetAction;

export const tileIcons: {[key in TileState]: string} = {
  0: ' ',
  1: '😀',
  2: '😈'
};
