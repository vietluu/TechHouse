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
import { useTranslation } from '@/context/I18nContext';

export default function index({
  data,
}: {
  data: { products: []; total: number; skip: number; limit: number };
}) {
  const { t } = useTranslation();
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
        {t('product.resetFilter')}
      </Button>
    </div>
  );
  return (
    <div className="fluid_container py-6 sm:py-3">
      <div className="flex flex-col gap-2.5 py-2 px-1 mb-4">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-xl text-slate-800 font-bold tracking-tight m-0">
            {t('common.products')}
          </h1>
          <span className="text-xs text-slate-500 font-medium">
            {data?.total ?? data?.products?.length ?? 0} {t('common.products').toLowerCase()}
          </span>
        </div>

        {/* Actions row: Filter & Sort */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <Button
            className="flex items-center gap-1.5 sm:gap-1 !rounded-full !px-4 sm:!px-3 !py-2 sm:!py-1.5 !h-auto !border-slate-200 hover:!border-sky-500 !shadow-xs font-medium text-sm sm:text-xs"
            onClick={(e) => setShow(true)}
          >
            <b className="fas fa-filter text-sky-600"></b> {t('product.filterButton')}
          </Button>

          <div className="flex items-center gap-2 sm:gap-1.5">
            <span className="text-sm sm:text-xs text-slate-500 whitespace-nowrap">{t('product.sortBy')}</span>
            <Select
              allowClear
              onClear={() => {
                router.push(path + window?.location.search);
              }}
              className="!w-36 sm:!w-32 text-xs"
              placeholder={t('product.sortDefault')}
              onChange={(e) => {
                router.push(path + '?' + createQueryString('oderBy', e));
              }}
            >
              <Select.Option value="increment">{t('product.sortPriceAsc')}</Select.Option>
              <Select.Option value="decrement">{t('product.sortPriceDesc')}</Select.Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="product pt-1">
        {data?.products?.length ? (
          <div className="grid gap-4 sm:gap-2.5 grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
            {data.products.map((value: product) => (
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
                <p className="mobile_name text-slate-800 group-hover:text-sky-600 transition-colors font-semibold text-sm sm:text-xs line-clamp-2 mb-2 break-words min-h-[2.5rem] sm:min-h-[2rem]" title={value.title}>
                  {value.title}
                </p>
                <p className="mobile_paid mt-auto mb-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                  <span className="text-lg sm:text-sm font-bold text-rose-600">{value.price}$</span>
                  {value.discountPercentage > 0 && (
                    <span className="text-xs sm:text-[11px] text-slate-400 line-through">
                      {(value.price / (1 - value.discountPercentage / 100)).toFixed(2)}$
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-1 pt-1 border-t border-slate-100 text-xs sm:text-[11px]">
                  <Star rate={value.rating} />
                  <span className="text-xs sm:text-[10px] text-slate-400">{`(${value.stock})`}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Empty className="py-12" description={t('product.noData')} />
        )}

        <div className="flex justify-center items-center py-8">
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
        title={t('product.filterTitle')}
        placement={'left'}
        closable={false}
        onClose={(e) => setShow(false)}
        open={show}
        key={'left'}
        footer={<Footer />}
      >
        <div className="flex flex-col mt-5">
          <h2 className="text-xl pb-4 font-bold">{t('product.rating')}</h2>
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
          <h2 className="text-xl pb-4 font-bold">{t('product.priceRange')}</h2>
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
              className="p-3 w-2/4 mx-auto !text-white !rounded-none !bg-sky-600 hover:!bg-sky-700"
              onClick={(e) => {
                router.push(path + '?' + createQueryString('range', range));
                setShow(false);
              }}
            >
              OK
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
