import React, {useEffect, useReducer, useRef} from 'react';
import styled from 'styled-components';

import {Tile} from './common';
import {appReducer, initialState, resetGame, setSoundEnabled, updateGame} from './store';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Board = styled.div`
  margin: 15px 10px;
  padding: 8px 5px;

  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;

  &:nth-child(2) {
    border-bottom: 2px solid black;
    border-top: 2px solid black;
  }
`;

interface TileContainerProps {
  tile: string;
}

const TileContainer = styled.div<TileContainerProps>`
  padding: 20px 30px;
  font-size: 2em;

  width: 32px;
  height: 48px;

  &:nth-child(2n) {
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
`;

const MessagesContainer = styled.div`
  min-height: 5vh;
`;

const TileMarkers: { [key in Tile]: string } = {
  'X': '🤠',
  'O': '😈',
  ' ': ' ',
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const audioRefs = useRef({
    winner: new Audio('/audio/cheering.mp3'),
    loser: new Audio('/audio/sad_trombone.mp3'),
    draw: new Audio('/audio/ding.mp3'),
  })

  useEffect(() => {
    const audioKey = state.winner?.soundKey ?? 'draw';
    const audioToPlay = audioRefs.current[audioKey];

    const stopAll = () =>
      Object.values(audioRefs.current).forEach((audio: HTMLAudioElement) => {
        audio.pause();
        audio.currentTime = 0;
      });

    if (state.finished) {
      if (state.soundEnabled) {
        console.log('playing', audioKey);
        audioToPlay.play();
      } else {
        console.log('stopping all');
        stopAll();
      }
    } else {
      console.log('stopping all');
      stopAll();
    }

  }, [state.finished, state.soundEnabled, state.winner]);

  return (
    <AppWrapper>

      <div>
        <h1>Tic Tac Toe</h1>
      </div>

      <MessagesContainer>
        {state.finished && 'Game finished!'}
        {state.winner && ` Congratulations to ${TileMarkers[state.winner.player]}!`}
        {state.finished && state.winner === null && ` It's a draw!`}
      </MessagesContainer>

      <Board>
        {
          state.board.map((rows, rowIndex) => (
            <Row key={rowIndex}>
              {rows.map((tile, colIndex) => (
                <TileContainer
                  key={colIndex}
                  onClick={() => dispatch(updateGame(rowIndex, colIndex, state.currentPlayer))}
                  tile={tile}
                >
                  {TileMarkers[tile]}
                </TileContainer>
              ))}
            </Row>
          ))
        }
      </Board>

      <div>
        <button
          type="button"
          onClick={() => dispatch(resetGame())}
        >
          Reset
        </button>

        <button
          type="button"
          onClick={() => dispatch(setSoundEnabled(!state.soundEnabled))}
        >
          Sound {state.soundEnabled ? 'off' : 'on'}
        </button>
      </div>

    </AppWrapper>
  );
};

export default App;
