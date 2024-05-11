/* eslint-disable jsx-a11y/img-redundant-alt */
import classNames from 'classnames/bind';
import { useContext } from 'react';

import styles from './AccountProfile.module.scss';
import avatarImg from '../../assets/images/avatar.png';
import { handleTitleCase } from 'utils';
import { CurrentAccountContext } from 'contexts';

const cx = classNames.bind(styles);
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
          src={avatarImg}
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
