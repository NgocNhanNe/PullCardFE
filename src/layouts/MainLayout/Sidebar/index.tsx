import * as React from 'react';
import { menuList } from './menu';
import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import logo from '../../../assets/images/logo.png';
import { Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import AccountProfile from 'components/AccountProfile';

const cx = className.bind(styles);

const Sidebar = () => {
  return (
    <div
      style={{ borderRight: '1px solid #eee', width: '250px' }}
      className='d-flex align-items-center justity-content-center flex-column vh-100'
    >
      <Row style={{ padding: '65px 45px' }}>
        <Link to={'/restart-game'}>
          {' '}
          <img
            src={logo}
            alt='logo'
          />
        </Link>
      </Row>

      {menuList.map(item => (
        <Row className='d-flex justify-content-center w-75'>
          <span>Admin tools</span>

          <div
            className={cx(
              'menu-item',
              'd-flex justify-content-center align-items-center p-4'
            )}
          >
            <div className='d-flex justify-content-center align-items-center'>
              <div className='me-4'>{item.icon}</div>
              <Link
                to={item.path}
                className='text-light'
              >
                {item.title}
              </Link>
            </div>
          </div>
        </Row>
      ))}
      <div className={cx('profile')}>
        <AccountProfile />
      </div>
    </div>
  );
};
export default Sidebar;
