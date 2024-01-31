'use client';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { product } from '@/types/productType';
import {
  Button,
  Pagination,
  Select,
  Rate,
  Slider,
  Drawer,
  Radio,
  Empty,
} from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Star from '@/components/Star';

export default function index({
  data,
}: {
  data: { products: []; total: number; skip: number; limit: number };
}) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [range, setRange] = useState<[number, number] | undefined>([0, 2000]);

  const path = usePathname();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const page = useSearchParams().get('page');

  const changePage = async (value: number) => {
    await router.push(path + '?' + createQueryString('page', value));
  };
  const createQueryString = useCallback(
    (
      name: string,
      value: string | number | [number, number] | null | undefined
    ) => {
      const params = new URLSearchParams(searchParams);

      if (!value) {
        params.delete(name);
      } else {
        if (typeof value == 'object') {
          params.set(name, `${value[0] + '-' + value[1]}`);
        } else params.set(name, value.toString());
      }
      return params.toString();
    },
    [searchParams]
  );

  const resetFilter = async () => {
    Promise.all([setRange([0, 2000]), setRating(null)]).then(() =>
      router.push(path)
    );
  };

  useLayoutEffect(() => {
    router.push(path + '?' + createQueryString('rating', rating));
  }, [rating]);

  const CategoryList = () => {
    const listCategory = data.products.map((value: product) => value.brand);
    const arr = Array.from(new Set(listCategory));
    return (
      <div>
        <ul>
          {arr &&
            arr.map((value: string) => (
              <li>
                <Link
                  href={`/category/${value}`}
                  className="text-lg py-3 !text-black"
                >
                  {value}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const Footer = () => (
    <div className="flex flex-row flex-1 justify-evenly gap-3 absolute bottom-2 right-2">
      <Button
        className="p-3 w-full !text-white !rounded-none !bg-red-400"
        onClick={resetFilter}
      >
        Bỏ lọc
      </Button>
    </div>
  );
  return (
    <div className="fluid_container !bg-transparent py-5">
      <div className="grid grid-cols-3 items-center px-1">
        <Button className="w-fit" onClick={(e) => setShow(true)}>
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
      <div className="product pt-1 ">
        {data?.products?.length ? (
          <div className="bg-[#dedcdc] p-4 grid place-content-center items-center sm:gap-1 sm:p-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5	">
            {data.products.map((value: product) => (
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
                  <Star rate={value.rating} />
                  <span className="text-sm">{` (${value.stock})`}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Empty />
        )}

        <div className="flex justify-center items-center py-5">
          <Pagination
            total={data.total}
            pageSize={30}
            current={Number(page) || 1}
            onChange={changePage}
            showSizeChanger={false}
          />
        </div>
      </div>

      <Drawer
        title="Bộ lọc"
        bodyStyle={{ width: '100%' }}
        onClose={(e) => setShow(false)}
        open={show}
        placement="left"
        footer={<Footer />}
      >
        {/* <div>
          <h2 className="text-xl pb-4 font-bold">Danh muc</h2>
          <CategoryList/>

        </div> */}
        <div className="flex flex-col mt-5">
          <h2 className="text-xl pb-4 font-bold">Đánh giá</h2>
          <Radio.Group
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <Radio value={5}>
              <Rate className="text-small" key={5} value={5} disabled />
            </Radio>
            <Radio value={4}>
              <Rate className="text-small" key={4} value={4} disabled />
            </Radio>
            <Radio value={3}>
              <Rate className="text-small" key={3} value={3} disabled />
            </Radio>
            <Radio value={2}>
              <Rate className="text-small" key={2} value={2} disabled />
            </Radio>
            <Radio value={1}>
              <Rate className="text-small" key={1} value={1} disabled />
            </Radio>
          </Radio.Group>
        </div>
        <div className="mt-5">
          <h2 className="text-xl pb-4 font-bold">Khoảng giá</h2>
          <Slider
            range
            step={10}
            defaultValue={[0, 2000]}
            min={0}
            max={2000}
            onChange={(e) => setRange(e)}
            value={range}
            marks={{ 0: '0', 2000: '2000' }}
          />
          <div className="text-center">
            <Button
              className="p-3 w-2/4 mx-auto !text-white !rounded-none !bg-red-400"
              onClick={(e) =>
                router.push(path + '?' + createQueryString('range', range))
              }
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
