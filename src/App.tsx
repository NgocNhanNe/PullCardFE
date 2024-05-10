import { Route, Routes } from 'react-router-dom';

import './App.css';
import { RouteType, privateRoutes, publicRoutes } from './routes';

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
  return (
    <Routes>
      {getRoutes(publicRoutes)}
      {getRoutes(privateRoutes)}
    </Routes>
  );
};

export default App;
