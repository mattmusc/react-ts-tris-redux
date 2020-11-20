import { PlayerMarker, TileState } from '../types';

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
export type AppActionsT = BoardActionsT;
