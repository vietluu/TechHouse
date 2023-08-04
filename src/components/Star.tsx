import { Rate } from 'antd';
import React from 'react';

function Star({ rate, star }: { rate: number; star: boolean }) {
  return (
    <Rate
      value={rate}
      allowHalf
      allowClear={star}
      style={{ fontSize: '0.8rem' }}
    />
  );
}

export default Star;
