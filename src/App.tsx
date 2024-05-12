import 'bootstrap-scss/bootstrap.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CardDeck } from 'types/CardDeck.type';
import { RouteType, privateRoutes } from './routes';
import { CardDeckContext, CardSelectedContext, LastCardsContext } from 'contexts';

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

  const [cardDeck, setCardDeck] = useState<CardDeck | null>(null);

  useEffect(() => {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => {
        if (res.status === 200) {
          setCardDeck(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <CardSelectedContext.Provider value={{ cardSelected, setCardSelected }}>
      <LastCardsContext.Provider value={{ lastCards, setLastCards }}>
        <CardDeckContext.Provider value={{ cardDeck, setCardDeck }}>
          <Routes>{getRoutes(privateRoutes)}</Routes>
        </CardDeckContext.Provider>
      </LastCardsContext.Provider>
    </CardSelectedContext.Provider>
  );
};

export default App;
