import {PlayerMarker, Tile, UpdateGamePayload, Winner} from './common';
import {boardFilled, getWinner, updateBoard} from './helpers';

interface AppState {
  board: Tile[][],
  currentPlayer: PlayerMarker,
  finished: boolean,
  initial: boolean,
  soundEnabled: boolean,
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
  initial: true,
  soundEnabled: false,
  winner: null,
};

const SET_SOUND_ENABLED = 'SET_SOUND_ENABLED';
const UPDATE_GAME = 'UPDATE_GAME';
const RESET_GAME = 'RESET_GAME';

interface SetSoundEnabledAction {
  type: typeof SET_SOUND_ENABLED,
  payload: {
    soundEnabled: boolean,
  },
}

interface UpdateGameAction {
  type: typeof UPDATE_GAME,
  payload: UpdateGamePayload,
}

interface ResetGameAction {
  type: typeof RESET_GAME,
}

type AppActions = SetSoundEnabledAction | UpdateGameAction | ResetGameAction;

export const appReducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case SET_SOUND_ENABLED:
      return {
        ...state,
        soundEnabled: action.payload.soundEnabled,
      };

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
        initial: false,
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

export const setSoundEnabled = (soundEnabled: boolean): SetSoundEnabledAction => ({
  type: SET_SOUND_ENABLED,
  payload: {
    soundEnabled,
  },
});

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
