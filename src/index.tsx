import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import GlobalStyle from './components/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </BrowserRouter>
  </React.StrictMode>
);
