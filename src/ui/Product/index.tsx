'use client';
import React from 'react';
import { product } from '@/types/productType';
import { Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
const Product = dynamic(() => import('@/components/Product'));
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
        <div className="bg-[#dedcdc] p-4 grid place-content-center items-center  gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5	">
          {data?.products?.length &&
            data.products.map((value: product) => <Product value={value} />)}
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
