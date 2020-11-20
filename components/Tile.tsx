import React from 'react';
import styled from 'styled-components';
import { TileState, tileIcons } from '../types';

const TileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;
  padding-top: 25px;

  :not(:last-child) {
    border-right: 2px solid;
  }
`;

const TileContent = styled.div`
  width: 20px;
  height: 30px;
  font-size: 30px;
`;

interface TileProps {
  handleClick: Function,
  value: TileState;
}

export const Tile: React.FC<TileProps> = ({ handleClick, value }) => {
  return (
    <TileDiv onClick={handleClick}>
      <TileContent>{tileIcons[value]}</TileContent>
    </TileDiv>
  );
};
