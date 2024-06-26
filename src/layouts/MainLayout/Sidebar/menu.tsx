import * as React from 'react';
import { ReactNode } from 'react';
import iconRestart from '../../../assets/images/iconRestart.png';

type MenuItem = {
  icon: ReactNode;
  path: string;
  title: string;
};

export const menuList: MenuItem[] = [
  {
    icon: (
      <img
        src={iconRestart}
        alt='icon'
      />
    ),
    title: 'Restart Game',
    path: '/restart-game'
  }
];
