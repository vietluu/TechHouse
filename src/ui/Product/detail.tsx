'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Listproduct, cartAdd, product } from '@/types/productType';
import SlideProduct from '@/components/SlideProduct';
import { Button, Rate, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
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
  const { isLoading } = useAppSelector((state) => state.CartSlice);
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
      <div className=" bg-white container justify-start flex flex-row flex-wrap p-3 my-3">
        <div className="max-w-full flex-auto ">
          <SlideProduct image={product.images} />
        </div>

        <div className="ml-0 mt-0 flex-auto pl-3 md:pl-0 md:mt-3">
          <div className="product-description">
            <span id="product_id" className="text-3xl font-bold mb-6">
              {product.title}
            </span>
            <div className="mt-6">
              <span className="text-md">{product.rating + ' '}</span>
              <Rate value={product.rating} allowHalf />
              <span>{'  '}Đã mua: </span>
              <span className="text-md">{`${product.stock}`}</span>
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
              <span className="text-2xl font-bold">
                {product.price + '$  '}
              </span>
              <span className="text-[#eb5757] p-1 rounded-sm ml-2">
                {'-' + Math.floor(product.discountPercentage) + '%'}
              </span>
            </p>
            <div>
              <button
                className="px-2 py-1 bg-slate-200 tex-lg"
                onClick={(e) => changeCount('reduce')}
                disabled={count <= 1 ? true : false}
              >
                -
              </button>
              <span className="px-2 py-1 text-md mx-1 bg-slate-200">
                {count}
              </span>
              <button
                className="px-2 py-1 bg-slate-200 tex-lg"
                onClick={(e) => changeCount('increase')}
              >
                +
              </button>
            </div>
          </div>

          <div className=" grid grid-cols-2 py-7 gap-6">
            <Button
              type="default"
              className="!px-4 !border-Sky-500 !text-white !h-auto !py-3 !rounded-sm !bg-sky-500"
            >
              Mua ngay
            </Button>

            <Button
              type="default"
              id="btn_process"
              loading={isLoading[addCart.typePrefix]}
              className="!px-4 !border-Sky-700 !text-sky-700 !h-auto !py-3 !rounded-sm !bg-sky-200"
              onClick={addCartData}
            >
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </div>

      <div className="product_title">
        <h2>Sản phẩm liên quan</h2>
      </div>
      <div className="fluid_container">
        <div className="product py-5">
          <div className="bg-[#dedcdc] p-2 sm:p-1 sm:gap-1 grid place-content-center items-center  gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5	">
            {sub?.products?.length &&
              sub.products
                .filter((e: product) => e.id !== product.id)
                .map((value: product) => (
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
        </div>
      </div>
    </section>
  );
}

export default detail;
