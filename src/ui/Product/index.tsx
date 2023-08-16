'use client';
import React from 'react';
import { product } from '@/types/productType';
import { Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Star from '@/components/Star';

export default function index({
  data,
}: {
  data: { products: []; total: number; skip: number; limit: number };
}) {
  const path = usePathname();
  const router = useRouter();
  const param = useSearchParams().get('keyword');
  const changePage = (value: number) => {
    if (param) {
      return router.push(path + `?keyword=${param}&page=${value}`);
    }
    return router.push(path + `?page=${value}`);
  };
  return (
    <div className="fluid_container">
      <div className="product py-5">
        <div className="bg-[#dedcdc] p-4 grid place-content-center items-center  gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5	">
          {data?.products?.length &&
            data.products.map((value: product) => (
              <Link
                key={value.id}
                href={'/product/' + value?.id}
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
            ))}
        </div>
        <div className="flex justify-center items-center py-5">
          <Pagination
            total={data.total}
            pageSize={20}
            current={data.skip != 0 ? data.skip / 10 + 1 : 1}
            onChange={changePage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
