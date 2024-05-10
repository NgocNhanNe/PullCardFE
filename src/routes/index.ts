import { ReactNode } from 'react';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../layouts/MainLayout';
import LoginLayout from '../layouts/LoginLayout';
import RestartGamePage from '../pages/RestartGamePage';

export type RouteType = {
  path: string;
  page: () => ReactNode;
  layout: (...args: any[]) => ReactNode;
};

export const publicRoutes: RouteType[] = [
  { path: '/login', page: LoginPage, layout: LoginLayout }
];

export const privateRoutes: RouteType[] = [
  { path: '/restart-game', page: RestartGamePage, layout: MainLayout },
  { path: '/', page: RestartGamePage, layout: MainLayout }
];
