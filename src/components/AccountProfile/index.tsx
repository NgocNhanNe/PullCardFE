/* eslint-disable jsx-a11y/img-redundant-alt */
import { CurrentAccountContext } from 'contexts';
import profileIcon from '../../assets/images/logo.png';
import style from './AccountProfile.module.scss';

import classNames from 'classnames/bind';
import { useContext } from 'react';
import { handleTitleCase } from 'utils';

const cx = classNames.bind(style);

const AccountProfile = () => {
  const currentAccount = useContext(CurrentAccountContext);

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div
        className={cx(
          'profile-container',
          'd-flex justify-content-center align-items-center'
        )}
      >
        <img
          className={cx('profile-image')}
          src={profileIcon}
          alt='profile image'
        />
        <div className={cx('profile-infor')}>
          <p className={cx('name')}>{handleTitleCase(currentAccount?.name!)}</p>
          <p className={cx('role')}>{currentAccount?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
