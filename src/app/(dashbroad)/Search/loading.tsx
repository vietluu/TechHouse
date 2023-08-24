'use client';
import ProductLoading from '@/components/ProductLoading';
import React from 'react';

function loading() {
  return (
    <div className=" p-3 sm:p-2 fluid_container grid place-content-center items-center gap-5 md:gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5">
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
    </div>
  );
}

export default loading;
