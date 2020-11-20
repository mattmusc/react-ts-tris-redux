import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getGameMessagesDomain } from '../state/selectors';
import { tileIcons } from '../types';

const H4 = styled.h4`
  height: 10px;
  color: ${props => props.show ? 'black' : 'white'}
`;

export const GameMessages = () => {
  const { draw, winner } = useSelector(getGameMessagesDomain);
  return (
    <React.Fragment>
      <H4 show={winner || draw}>
        {winner && `Player ${tileIcons[winner]} won!`}
        {draw && "It's a draw!"}
      </H4>
    </React.Fragment>
  );
};
