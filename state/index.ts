import { Store, createStore } from 'redux';

import { TileState } from '../types';
import {
  AppActionsT,
  AppState,
  BoardActions,
  BoardActionsT
} from './types';
import {
  getNextPlayer,
  getWinner,
  isFilled,
  minimax,
  updateBoard
} from './helpers';

const appIinitialState: AppState = {
  board: [
    TileState.EMPTY, TileState.EMPTY, TileState.EMPTY,
    TileState.EMPTY, TileState.EMPTY, TileState.EMPTY,
    TileState.EMPTY, TileState.EMPTY, TileState.EMPTY,
  ],
  draw: false,
  player: TileState.X,
  winner: null,
};

const appReducer = (state: AppState = appIinitialState, action: BoardActionsT) => {
  switch (action.type) {
    case BoardActions.SetCell:
      const player = getNextPlayer(state.player);
      
      let updatedBoard = updateBoard(state.board, action.payload.index, state.player);

      // ai turn
      if (player === TileState.O) {
        updatedBoard = minimax(updatedBoard, player);
      }

      const winner = getWinner(updatedBoard);
      const draw = isFilled(updatedBoard) && winner === null;

      return {
        ...state,
        board: updatedBoard,
        draw,
        player,
        winner,
      };

    case BoardActions.Reset:
      return {
        ...appIinitialState,
      }

    default: return state;
  }
};

export const store: Store<AppState, AppActionsT> = createStore(appReducer);
