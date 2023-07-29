'use client';
import React from 'react';
import { Skeleton } from 'antd';

function ProductLoading() {
  return (
    <div className="flex flex-col max-w-[200px]">
      <Skeleton.Image style={{ width: '200px', height: 160 }} active />
      <Skeleton.Input style={{ height: 10, width: '200px' }} active />
      <Skeleton.Input style={{ height: 10, width: '200px' }} active />
    </div>
  );
}

export default ProductLoading;
