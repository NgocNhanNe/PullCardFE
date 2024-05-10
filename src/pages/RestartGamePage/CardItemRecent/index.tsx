/* eslint-disable jsx-a11y/img-redundant-alt */
import classNames from 'classnames/bind';
import style from './CardItemRecent.module.scss';
import { CardResponse } from 'types/CardResponse.type';
import { MdOutlineNavigateNext } from 'react-icons/md';

const cx = classNames.bind(style);

type CardItemRecentProps = {
  cardItem: CardResponse;
  onCardItemClick: (cardItemSelected: CardResponse) => void;
};

const CardItemRecent = ({ cardItem, onCardItemClick }: CardItemRecentProps) => {
  if (!cardItem) return null;

  return (
    <div
      className={cx(
        'card-item-recent-container',
        'd-flex justify-content-center align-items-center'
      )}
    >
      <img
        className={cx('card-image')}
        src={cardItem.cards[0].image}
        alt='profile image'
      />
      <div className={cx('card-infor')}>
        <div className='d-flex justify-content-between align-items-center'>
          <p className={cx('name')}>{cardItem.cards[0].code}</p>
          <MdOutlineNavigateNext
            size={25}
            className='cursor-pointer'
            onClick={() => onCardItemClick(cardItem)}
          />
        </div>
        <p className={cx('role')}>{cardItem.timestamp}</p>
      </div>
    </div>
  );
};

export default CardItemRecent;
