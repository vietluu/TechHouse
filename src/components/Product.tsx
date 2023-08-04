'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { product } from '@/types/productType';
import dynamic from 'next/dynamic';
const Star = dynamic(() => import('./Star'), { ssr: false });
function Product({ value }: { value: product }) {
  return (
    <>
      <Link
        href={'product/' + value?.id}
        className="rounded-md w-full h-full  bg-white block pt-1 pb-4 px-2"
      >
        <Image
          className=" aspect-[4/3]"
          width={1000}
          height={1000}
          src={value?.thumbnail}
          alt={value.title}
          quality={100}
          priority
          title={value.title}
        />
        <p className="mobile_name pt-2 mb-2 mt-3">{value.title}</p>
        <p className="mobile_paid mb-2">
          <span className="text-xl">{value.price + '$  '}</span>
          <span className="text-sm text-[#eb5757] p-1 bg-[#fff0e9] rounded-sm">
            {'-' + Math.floor(value.discountPercentage) + '%'}
          </span>
        </p>
        <div>
          <Star rate={value.rating} star={false} />
          <span className="text-sm">{` (${value.stock})`}</span>
        </div>
      </Link>
    </>
  );
}

export default Product;
