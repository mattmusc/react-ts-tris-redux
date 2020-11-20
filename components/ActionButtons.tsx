import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getGameFinished } from '../state/selectors';
import { BoardActions } from '../types';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionButtons = () => {
  const gameFinished = useSelector(getGameFinished);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <button
        disabled={!gameFinished}
        onClick={() => dispatch({ type: BoardActions.Reset })}
      >
        Reset
      </button>
    </Wrapper>
  );
};
