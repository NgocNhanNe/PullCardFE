import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import avatarImg from '../src/assets/images/avatar.png';
import GlobalStyle from './components/GlobalStyle';
import { Account, CurrentAccountContext } from 'contexts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const currentAccountData: Account = {
  avatar: avatarImg,
  name: 'chloe nguyen',
  role: 'Developer'
};

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <GlobalStyle>
      <CurrentAccountContext.Provider value={currentAccountData}>
        <App />
      </CurrentAccountContext.Provider>
    </GlobalStyle>
  </BrowserRouter>
  // </React.StrictMode>
);
