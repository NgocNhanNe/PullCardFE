import * as React from 'react';
import { ReactNode } from 'react';
import className from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Sidebar from './Sidebar';

const cx = className.bind(styles);
type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='d-flex w-100'>
      <div className={cx('sidebar-container')}>
        <Sidebar />
      </div>
      <div className={cx('content')}>{children}</div>
    </div>
  );
};
export default MainLayout;
