import 'bootstrap-scss/bootstrap.scss';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouteType, privateRoutes } from './routes';
import { CardSelectedContext, LastCardsContext } from 'contexts';

const getRoutes = (routes: RouteType[]) => {
  return routes.map(route => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <route.layout>
            <route.page />
          </route.layout>
        }
      ></Route>
    );
  });
};

const App = () => {
  const [cardSelected, setCardSelected] = useState(() => {
    if (localStorage.getItem('cardSelected'))
      return JSON.parse(localStorage.getItem('cardSelected')!);
    return null;
  });
  const [lastCards, setLastCards] = useState(() => {
    if (localStorage.getItem('lastCards'))
      return JSON.parse(localStorage.getItem('lastCards')!);
    return [];
  });

  return (
    <CardSelectedContext.Provider value={{ cardSelected, setCardSelected }}>
      <LastCardsContext.Provider value={{ lastCards, setLastCards }}>
        <Routes>{getRoutes(privateRoutes)}</Routes>
      </LastCardsContext.Provider>
    </CardSelectedContext.Provider>
  );
};

export default App;
