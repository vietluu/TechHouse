'use client';
import ProductLoading from '@/components/ProductLoading';
import React from 'react';

function loading() {
  return (
    <div className=" p-6 fluid_container grid place-content-center items-center  gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5	">
      <ProductLoading />
    </div>
  );
}

export default loading;
