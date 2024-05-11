import { menuList } from './menu';
import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import logo from '../../../assets/images/logo.png';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import AccountProfile from 'components/AccountProfile';
import { useContext } from 'react';
import { CardSelectedContext, LastCardsContext } from 'contexts';

const cx = className.bind(styles);

const Sidebar = () => {
  const { setCardSelected } = useContext(CardSelectedContext);
  const { setLastCards } = useContext(LastCardsContext);

  return (
    <div
      style={{ borderRight: '1px solid #eee' }}
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
        <Row
          key={item.path}
          className='d-flex justify-content-center w-75'
        >
          <span className={cx('heading-menu-item')}>Admin tools</span>

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
                onClick={() => {
                  setCardSelected(null);
                  setLastCards([]);

                  localStorage.clear();
                }}
              >
                {item.title}
              </Link>
            </div>
          </div>
        </Row>
      ))}
      <div className={cx('profile-container')}>
        <div className={cx('profile')}>
          <AccountProfile />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
