import { Rate } from 'antd';
import React from 'react';

function Star({ rate }: { rate: number }) {
  return (
    <Rate value={rate} allowHalf disabled style={{ fontSize: '0.8rem' }} />
  );
}

export default Star;
