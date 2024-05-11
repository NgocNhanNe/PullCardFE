import * as React from 'react';
import empty from '../../assets/images/empty.png';

const NoLastCardResponse = () => {
  return (
    <div style={{ background: 'none', padding: '24px 0', textAlign: 'center' }}>
      <img
        style={{ width: '120px' }}
        src={empty}
        alt='empty'
      />
      <p style={{ color: '#AAA', fontWeight: 300, fontSize: '12px' }}>Available</p>
    </div>
  );
};

export default NoLastCardResponse;
