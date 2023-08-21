'use client';
import React, { useCallback, useState } from 'react';
import { product } from '@/types/productType';
import { Button, Pagination, Select } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Star from '@/components/Star';

export default function index({
  data,
}: {
  data: { products: []; total: number; skip: number; limit: number };
}) {
  const filter = useState({});
  const path = usePathname();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const param = useSearchParams().get('keyword');
  const changePage = (value: number) => {
    router.push(path + '?' + createQueryString('page', value));
  };
  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);

      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value.toString());
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="fluid_container py-5">
      <div className="grid grid-cols-3 items-center px-2">
        <Button className="ml-0 w-1/6 lg:w-1/5 sm:w-4/5 sm:col-[1/6]">
          <b className="fas fa-filter text-slate-400"></b> Lọc
        </Button>
        <div className="sm:hidden text-2xl text-sky-500 font-bold text-center">
          Sản phẩm
        </div>

        <div className="grid grid-cols-2 mr-0 w-3/4 sm:col-[6/12]  sm:w-full py-3 pr-0 ">
          <span>Sắp xếp theo:</span>
          <Select
            allowClear
            onClear={() => {
              router.push(path + window?.location.search);
            }}
            className="!w-full !text-center !rounded-none"
            placeholder="Mặc định"
            onChange={(e) => {
              router.push(path + '?' + createQueryString('oderBy', e));
            }}
          >
            <Select.Option value="increment">Tăng dần</Select.Option>
            <Select.Option value="decrement">Giảm dần</Select.Option>
          </Select>
        </div>
      </div>
      <div className="product pt-1 pb-5">
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
            onChange={changePage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
