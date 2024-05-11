import * as React from 'react';
import classNames from 'classnames/bind';

import empty from '../../assets/images/empty.png';
import styles from './NoLastCardResponse.module.scss';

const cx = classNames.bind(styles);
const NoLastCardResponse = () => {
  return (
    <div className={cx('no-reponse-container')}>
      <img
        style={{ width: '120px' }}
        src={empty}
        alt='empty'
      />
      <p>Available</p>
    </div>
  );
};

export default NoLastCardResponse;
