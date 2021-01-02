import {PlayerMarker, Tile, UpdateGamePayload, Winner} from './common';
import {boardFilled, getWinner, updateBoard} from './helpers';

interface AppState {
  board: Tile[][],
  currentPlayer: PlayerMarker,
  finished: boolean,
  winner: Winner | null,
}

export const initialState: AppState = {
  board: [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ],
  currentPlayer: 'X',
  finished: false,
  winner: null,
};

const UPDATE_GAME = 'UPDATE_GAME';
const RESET_GAME = 'RESET_GAME';

interface UpdateGameAction {
  type: typeof UPDATE_GAME,
  payload: UpdateGamePayload,
}

interface ResetGameAction {
  type: typeof RESET_GAME,
}

type AppActions = UpdateGameAction | ResetGameAction;

export const appReducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case UPDATE_GAME: {
      if (state.finished) {
        return state;
      }

      const updatedBoard = updateBoard(state.board, action.payload);
      const winner = getWinner(updatedBoard);
      const finished = winner !== null || boardFilled(updatedBoard);
      const currentPlayer: PlayerMarker = state.currentPlayer === 'X' ? 'O' : 'X';

      return {
        ...state,
        board: updatedBoard,
        currentPlayer,
        finished,
        winner,
      };
    }

    case RESET_GAME:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const updateGame = (row: number, col: number, player: PlayerMarker): UpdateGameAction => ({
  type: UPDATE_GAME,
  payload: {
    c: col,
    p: player,
    r: row,
  }
});

export const resetGame = (): ResetGameAction => ({
  type: RESET_GAME,
});
