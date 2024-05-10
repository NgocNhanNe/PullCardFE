import * as React from 'react';
import { Col } from 'reactstrap';

import style from './RestartGamePage.module.scss';

import classNames from 'classnames/bind';

import cardBack from '../../assets/images/cardBack.png';
import CardItemRecent from './CardItemRecent';

const cx = classNames.bind(style);

const RestartGamePage = () => {
  return (
    <div className={cx('restart-container', 'd-flex')}>
      <Col
        sm={8}
        className={cx('flip-card-container', 'vh-100')}
      >
        <h4>Hi Ngoc Nhan</h4>
        <h1>Let's Play!</h1>
        <div className={cx('flip-card')}>
          <div className={cx('flip-card-inner')}>
            <div className={cx('flip-card-front')}>
              <img
                src='https://deckofcardsapi.com/static/img/9C.png'
                alt='Avatar'
                width={300}
                height={355}
              />
            </div>
            <div className={cx('flip-card-back')}>
              <img
                src={cardBack}
                alt='Avatar'
                width={300}
                height={379}
              />
            </div>
          </div>
        </div>

        <div>
          <button className={cx('choose-btn')}>Choose a card!</button>
        </div>
      </Col>
      <Col
        sm={4}
        className={cx('flip-card-recent')}
      >
        <div className={cx('flip-card-recent-list', 'd-flex flex-column')}>
          <div
            className={cx(
              'flip-card-recent-title',
              'd-flex justify-content-start align-items-center mb-5'
            )}
          >
            <span>Your last cards</span>
          </div>
          <CardItemRecent />
          <CardItemRecent />
          <CardItemRecent />
        </div>
      </Col>
    </div>
  );
};
export default RestartGamePage;
