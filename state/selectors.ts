import { createSelector } from 'reselect';
import { AppState } from '../types';

export const getAppState = (state: AppState) => state;

export const getBoard = createSelector(
  [getAppState],
  state => state.board,
);

export const getPlayer = createSelector(
  [getAppState],
  state => state.player,
);

export const getDraw = createSelector(
  [getAppState],
  state => state.draw,
);

export const getWinner = createSelector(
  [getAppState],
  state => state.winner,
);

export const getGameFinished = createSelector(
  [getAppState],
  ({ draw, winner }) => draw || winner !== null,
);

export const getGameMessagesDomain = createSelector(
  [getAppState],
  ({ draw, winner }) => ({ draw, winner }),
);
