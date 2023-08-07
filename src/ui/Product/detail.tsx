'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Listproduct, cartAdd, product } from '@/types/productType';
import SlideProduct from '@/components/SlideProduct';
import { Rate, message } from 'antd';
import { useAppDispatch } from '@/redux/hooks';
import { addCart } from '@/redux/slice/cartSlice';
import { useRouter, usePathname } from 'next/navigation';
import BreadCrumb from '@/components/BreadCrumb';
import Image from 'next/image';
import Link from 'next/link';
import Star from '@/components/Star';

function detail({ data }: { data: { product: product; sub: Listproduct } }) {
  const [count, setCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();
  const { product, sub } = data;

  const addCartData = async () => {
    if (localStorage.getItem('id')) {
      const body: cartAdd = {
        userId: Number(localStorage.getItem('id')),
        products: [
          {
            id: product.id,
            quantity: count,
          },
        ],
      };
      await dispatch(addCart(body));
      message.success('thêm thành công!');
    } else {
      message.warning('vui lòng đăng nhập!');
      router.push(`/signIn?callbackUrl=${path}`);
    }
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
      <BreadCrumb title={product.title} />
      <div className=" bg-white container gri grid grid-cols-2 md:grid-cols-1 p-3 my-3">
        <div className="ml-0 pr-3 max-w-full ">
          <SlideProduct image={product.images} />
        </div>

        <div className="ml-0 mt-0 w-full pl-3 md:pl-0">
          <div className="product-description">
            <span id="product_id">{product.title}</span>
            <div>
              <span className="text-sm">{product.rating + ' '}</span>
              <Rate value={product.rating} allowHalf />
              <span>{'  '}Đã mua: </span>
              <span className="text-sm">{`${product.stock}`}</span>
            </div>
            <p className="py-3">{product.description}</p>
            <div className="py-3">
              <span>Thương hiệu: </span>
              <span className=" p-1 bg-slate-300 ml-2">{product.brand}</span>
            </div>
            <div className="py-3">
              <span>Phân loại: </span>
              <span className=" p-1 bg-slate-300 ml-2">{product.category}</span>
            </div>
            <p className="mobile_paid my-5 bg-slate-300 p-3">
              <span className="text-xl">{product.price + '$  '}</span>
              <span className="text-[#eb5757] p-1 bg-[#fff0e9] rounded-sm ml-7">
                {'-' + Math.floor(product.discountPercentage) + '%'}
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

      <div className="product_title">
        <h2>Sản phẩm liên quan</h2>
      </div>
      <div className="fluid_container">
        <div className="product py-5">
          <div className="bg-[#dedcdc] p-4 grid place-content-center items-center  gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5	">
            {sub?.products?.length &&
              sub.products.map((value: product) => (
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
        </div>
      </div>
    </section>
  );
}

export default detail;
