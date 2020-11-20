import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import { ActionButtons, Board, GameMessages } from './components';
import { store } from './state';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <GameMessages />
        <Board />
        <ActionButtons />
      </AppWrapper>
    </Provider>
  );
};

render(<App />, document.getElementById('root'));
