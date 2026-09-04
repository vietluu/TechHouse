'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Listproduct, cartAdd, product } from '@/types/productType';
import SlideProduct from '@/components/SlideProduct';
import { Button, Rate, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCart, addToCart } from '@/redux/slice/cartSlice';
import { useRouter, usePathname } from 'next/navigation';
import BreadCrumb from '@/components/BreadCrumb';
import Image from 'next/image';
import Link from 'next/link';
import Star from '@/components/Star';
import { useTranslation } from '@/context/I18nContext';
import Cookies from 'js-cookie';

function detail({ data }: { data: { product: product; sub: Listproduct } }) {
  const { t } = useTranslation();
  const [count, setCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();
  const { product, sub } = data;
  const { isLoading } = useAppSelector((state) => state.CartSlice);

  const isValidAuthToken = (t: any): boolean => {
    return typeof t === 'string' &&
      t.trim().length > 10 &&
      t !== 'undefined' &&
      t !== 'null';
  };

  const addCartData = async () => {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || Cookies.get('token')) : null;

    if (isValidAuthToken(token)) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: count,
          discountPercentage: product.discountPercentage,
          thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
        })
      );
      message.success(t('common.addedToCartSuccess'));
    } else {
      message.warning(t('common.requireLoginToAddCart'));
      router.push(`/signIn?callbackUrl=${encodeURIComponent(path)}`);
    }
  };

  const buyNowData = async () => {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || Cookies.get('token')) : null;

    if (isValidAuthToken(token)) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: count,
          discountPercentage: product.discountPercentage,
          thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
        })
      );
      router.push('/cart');
    } else {
      message.warning(t('common.requireLoginToBuy'));
      router.push(`/signIn?callbackUrl=/cart`);
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
    <section className="fluid_container py-6 sm:py-3">
      <BreadCrumb title={product.title} />
      <div className="bg-white rounded-3xl sm:rounded-2xl border border-slate-150 shadow-soft p-6 sm:p-3.5 my-6 sm:my-3 flex flex-row lg:flex-col gap-8 sm:gap-4">
        <div className="w-[480px] lg:w-full shrink-0 mx-auto">
          <SlideProduct image={product.images} />
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="product-description">
            <h1 id="product_id" className="text-2xl sm:text-xl font-bold text-slate-800 tracking-tight mb-3 sm:mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                <span className="text-sm font-bold text-amber-700">{product.rating}</span>
                <Rate value={product.rating} allowHalf disabled className="text-xs !text-amber-500" />
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-sm text-slate-500">{t('product.sold')} <strong className="text-slate-700">{product.stock}</strong></span>
            </div>
            <p className="py-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100">{product.description}</p>
            <div className="flex items-center gap-6 py-2">
              <span className="text-sm text-slate-500">{t('product.brand')} <strong className="ml-1 text-sky-600 font-semibold">{product.brand}</strong></span>
              <span className="text-sm text-slate-500">{t('product.category')} <strong className="ml-1 text-slate-700 font-semibold">{product.category}</strong></span>
            </div>

            <div className="my-5 bg-gradient-to-r from-sky-50 to-blue-50/40 border border-sky-100/80 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-3xl sm:text-2xl font-extrabold text-rose-600">
                  {product.price}$
                </span>
                {product.discountPercentage > 0 && (
                  <span className="ml-3 text-sm text-slate-400 line-through">
                    {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}$
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <span className="bg-rose-50 text-rose-600 border border-rose-200/80 text-xs font-bold px-2.5 py-1 rounded-full">
                  {t('product.savePercent')} {Math.floor(product.discountPercentage)}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 my-6">
              <span className="text-sm font-medium text-slate-600">{t('product.quantity')}</span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <button
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors disabled:opacity-40"
                  onClick={(e) => changeCount('reduce')}
                  disabled={count <= 1}
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-semibold text-slate-800">
                  {count}
                </span>
                <button
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                  onClick={(e) => changeCount('increase')}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-2 pt-2">
            <Button
              type="default"
              onClick={buyNowData}
              className="!px-3 sm:!px-2 !border-sky-600 !text-white !h-auto !py-3.5 sm:!py-3 !rounded-xl !bg-sky-600 hover:!bg-sky-700 font-semibold text-sm sm:text-xs shadow-md shadow-sky-600/25 transition-all text-center flex items-center justify-center"
            >
              {t('product.buyNow')}
            </Button>

            <Button
              type="default"
              id="btn_process"
              loading={isLoading[addCart.typePrefix]}
              className="!px-3 sm:!px-2 !border-sky-200 !text-sky-700 !h-auto !py-3.5 sm:!py-3 !rounded-xl !bg-sky-50 hover:!bg-sky-100 font-semibold text-sm sm:text-xs transition-all text-center flex items-center justify-center"
              onClick={addCartData}
            >
              {t('product.addToCart')}
            </Button>
          </div>
        </div>
      </div>

      <div className="product_title my-8">
        <h2>{t('product.relatedProducts')}</h2>
      </div>
      <div className="fluid_container sm:!px-0">
        <div className="product py-2">
          <div className="grid gap-4 sm:gap-2.5 grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
            {sub?.products?.length &&
              sub.products
                .filter((e: product) => e.id !== product.id)
                .map((value: product) => (
                  <Link
                    key={value.id}
                    href={'/product/' + value?.id}
                    className="rounded-2xl w-full h-full bg-white p-3 border border-slate-150 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center">
                      <Image
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                        width={400}
                        height={400}
                        src={value?.thumbnail}
                        alt={value.title}
                        quality={90}
                        priority
                        title={value.title}
                      />
                      {value.discountPercentage > 0 && (
                        <span className="sale text-xs font-semibold px-2 py-0.5 rounded-full top-2 left-2 absolute">
                          -{Math.floor(value.discountPercentage)}%
                        </span>
                      )}
                    </div>
                    <p className="mobile_name text-slate-800 group-hover:text-sky-600 transition-colors font-semibold text-sm line-clamp-2 mb-2" title={value.title}>
                      {value.title}
                    </p>
                    <p className="mobile_paid mt-auto mb-2 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-rose-600">{value.price}$</span>
                      {value.discountPercentage > 0 && (
                        <span className="text-xs text-slate-400 line-through">
                          {(value.price / (1 - value.discountPercentage / 100)).toFixed(2)}$
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
                      <Star rate={value.rating} />
                      <span className="text-xs text-slate-400">{`(${value.stock})`}</span>
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
