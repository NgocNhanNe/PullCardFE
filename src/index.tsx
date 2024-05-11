import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import GlobalStyle from './components/GlobalStyle';
import { Account, CurrentAccountContext } from 'contexts';
import avatarImg from '../src/assets/images/avatar.png';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const currentAccountData: Account = {
  avatar: avatarImg,
  name: 'chloe',
  role: 'Free account'
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
