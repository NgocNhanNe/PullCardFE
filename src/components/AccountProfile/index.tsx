/* eslint-disable jsx-a11y/img-redundant-alt */
import profileIcon from '../../assets/images/logo.png';
import style from './AccountProfile.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const AccountProfile = () => {
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
          <p className={cx('name')}>Ngoc nhan</p>
          <p className={cx('role')}>Free account</p>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
