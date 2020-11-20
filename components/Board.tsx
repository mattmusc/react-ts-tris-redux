import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Tile } from './Tile';
import { getBoard, getDraw, getWinner } from '../state/selectors';
import { BoardActions } from '../types';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
  margin-bottom: 25px;
`;

const BoardDiv = styled.div`
  display: flex;
  flex-direction: column;  
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;

  :not(:last-child) {
    border-bottom: 2px solid;
  }
`;

export const Board: React.FC = () => {
  const board = useSelector(getBoard);
  const draw = useSelector(getDraw);
  const winner = useSelector(getWinner);

  const dispatch = useDispatch();

  const onTileClick = (r: number, c: number, index: number) => () => {
    if (winner !== null || draw) {
      return;
    }

    dispatch({ type: BoardActions.SetCell, payload: { index } });
  };

  return (
    <Wrapper>
      <BoardDiv>
        <Row>
          <Tile value={board[0]} handleClick={onTileClick(0, 0, 0)} />
          <Tile value={board[1]} handleClick={onTileClick(0, 1, 1)} />
          <Tile value={board[2]} handleClick={onTileClick(0, 2, 2)} />
        </Row>
        <Row>
          <Tile value={board[3]} handleClick={onTileClick(1, 0, 3)} />
          <Tile value={board[4]} handleClick={onTileClick(1, 1, 4)} />
          <Tile value={board[5]} handleClick={onTileClick(1, 2, 5)} />
        </Row>
        <Row>
          <Tile value={board[6]} handleClick={onTileClick(2, 0, 6)} />
          <Tile value={board[7]} handleClick={onTileClick(2, 1, 7)} />
          <Tile value={board[8]} handleClick={onTileClick(2, 2, 8)} />
        </Row>
      </BoardDiv>
    </Wrapper>
  );
};
