/* eslint-disable jsx-a11y/img-redundant-alt */
import classNames from 'classnames/bind';
import style from './CardItemRecent.module.scss';

const cx = classNames.bind(style);

const CardItemRecent = () => {
  return (
    <div
      className={cx(
        'card-item-recent-container',
        'd-flex justify-content-center align-items-center'
      )}
    >
      <img
        className={cx('card-image')}
        src='https://deckofcardsapi.com/static/img/9C.png'
        alt='profile image'
      />
      <div className={cx('card-infor')}>
        <p className={cx('name')}>Ngoc nhan</p>
        <p className={cx('role')}>Free account</p>
      </div>
    </div>
  );
};

export default CardItemRecent;
