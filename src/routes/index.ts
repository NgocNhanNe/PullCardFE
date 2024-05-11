import { ReactNode } from 'react';
import MainLayout from '../layouts/MainLayout';
import RestartGamePage from '../pages/RestartGamePage';

export type RouteType = {
  path: string;
  page: () => ReactNode;
  layout: (...args: any[]) => ReactNode;
};

export const privateRoutes: RouteType[] = [
  { path: '/restart-game', page: RestartGamePage, layout: MainLayout },
  { path: '/', page: RestartGamePage, layout: MainLayout }
];
