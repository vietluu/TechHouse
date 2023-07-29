'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { cartAdd, product } from '@/types/productType';
import Image from 'next/image';
import SlideProduct from '@/components/SlideProduct';
import { Rate } from 'antd';
import { useAppDispatch } from '@/redux/hooks';
import { addCart, getCart } from '@/redux/slice/cartSlice';
import { useRouter, usePathname } from 'next/navigation';

function detail({ data }: { data: product }) {
  const [count, setCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();
  const addCartData = async () => {
    if (localStorage.getItem('id')) {
      const body: cartAdd = {
        userId: Number(localStorage.getItem('id')),
        products: [
          {
            id: data.id,
            quantity: count,
          },
        ],
      };
      await dispatch(addCart(body));
      dispatch(getCart(Number(localStorage.getItem('id'))));
    }
    router.push(`signIn?callbackUrl=${window.location.href}`);
  };

  const changeCount = useCallback(
    (value: string) => {
      switch (value) {
        case 'increase':
          setCount(count + 1);
          break;
        case 'reduce':
          setCount(count - 1);
          break;
        default:
          return;
      }
    },
    [count]
  );

  return (
    <section className="fluid_container">
      <div className=" bg-white container grid grid-cols-2 md:grid-cols-1 p-3 my-7">
        <div className="ml-0 pr-3 max-w-full ">
          <SlideProduct image={data.images} />
        </div>

        <div className="ml-0 mt-0 w-full pl-3">
          <div className="product-description">
            <span id="product_id">{data.title}</span>
            <div>
              <span className="text-sm">{data.rating + ' '}</span>
              <Rate value={data.rating} allowHalf />
              <span>{'  '}Đã mua: </span>
              <span className="text-sm">{`${data.stock}`}</span>
            </div>
            <p>{data.description}</p>
            <div className="py-3">
              <span>Thương hiệu: </span>
              <span className=" p-1 bg-slate-300 ml-2">{data.brand}</span>
            </div>
            <div className="py-3">
              <span>Phân loại: </span>
              <span className=" p-1 bg-slate-300 ml-2">{data.category}</span>
            </div>
            <p className="mobile_paid my-5 bg-slate-300 p-3">
              <span className="text-xl">{data.price + '$  '}</span>
              <span className="text-[#eb5757] p-1 bg-[#fff0e9] rounded-sm">
                {'-' + Math.floor(data.discountPercentage) + '%'}
              </span>
            </p>
            <div>
              <button
                className="p-2 bg-slate-200 tex-lg"
                onClick={(e) => changeCount('reduce')}
                disabled={count <= 1 ? true : false}
              >
                -
              </button>
              <span className="p-2 text-md mx-1 bg-slate-200">{count}</span>
              <button
                className="p-2 bg-slate-200 tex-lg"
                onClick={(e) => changeCount('increase')}
              >
                +
              </button>
            </div>
          </div>

          <div className=" grid grid-cols-2 py-7 gap-6">
            <button type="button" className="px-4 py-3 bg-green-500">
              Mua ngay
            </button>

            <button
              type="button"
              id="btn_process"
              className="px-4 py-3 bg-green-300"
              onClick={addCartData}
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default detail;
