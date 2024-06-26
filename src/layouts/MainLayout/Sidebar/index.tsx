import axios from 'axios';
import className from 'classnames/bind';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import logo from '../../../assets/images/logo.png';
import styles from './Sidebar.module.scss';
import AccountProfile from 'components/AccountProfile';
import { menuList } from './menu';
import { CardDeckContext, CardSelectedContext, LastCardsContext } from 'contexts';

const cx = className.bind(styles);
const Sidebar = () => {
  const { setLastCards } = useContext(LastCardsContext);
  const { setCardSelected } = useContext(CardSelectedContext);
  const { setCardDeck } = useContext(CardDeckContext);

  return (
    <div
      style={{ borderRight: '1px solid #eee' }}
      className='d-flex align-items-center justity-content-center flex-column vh-100'
    >
      <Row className={cx('logo')}>
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
          className={cx('menu-item-container', 'd-flex justify-content-center ')}
        >
          <span className={cx('heading-menu-item')}>Admin tools</span>

          <div
            className={cx(
              'menu-item',
              'd-flex justify-content-center align-items-center '
            )}
            onClick={() => {
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
              setCardSelected(null);
              setLastCards([]);
              localStorage.clear();
            }}
          >
            <div className='d-flex justify-content-center align-items-center'>
              <div className={cx('item-icon')}>{item.icon}</div>
              <Link
                to={item.path}
                className='text-light ps-4'
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
