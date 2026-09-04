'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { product } from '@/types/productType';
import {
  Button,
  Pagination,
  Select,
  Rate,
  Slider,
  Drawer,
  Empty,
} from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Star from '@/components/Star';
import { useTranslation } from '@/context/I18nContext';

export default function Index({
  data,
}: {
  data: { products: product[]; total: number; skip: number; limit: number };
}) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const path = usePathname();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const page = useSearchParams().get('page');

  // Filter local states
  const [rating, setRating] = useState<number | null>(() => {
    const r = searchParams.get('rating');
    return r ? Number(r) : null;
  });

  const [range, setRange] = useState<[number, number]>(() => {
    const r = searchParams.get('range');
    if (r) {
      const parts = r.split('-').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return [parts[0], parts[1]];
      }
    }
    return [0, 2000];
  });

  const [brand, setBrand] = useState<string | null>(() => {
    return searchParams.get('brand') || null;
  });

  const [orderBy, setOrderBy] = useState<string | null>(() => {
    return searchParams.get('oderBy') || null;
  });

  // Sync state when URL searchParams changes
  useEffect(() => {
    const r = searchParams.get('range');
    if (r) {
      const parts = r.split('-').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        setRange([parts[0], parts[1]]);
      } else {
        setRange([0, 2000]);
      }
    } else {
      setRange([0, 2000]);
    }

    const rate = searchParams.get('rating');
    setRating(rate ? Number(rate) : null);

    setBrand(searchParams.get('brand') || null);
    setOrderBy(searchParams.get('oderBy') || null);
  }, [searchParams]);

  // Extract available brands from products
  const brandList = useMemo(() => {
    if (!data?.products) return [];
    const brands = data.products
      .map((p: product) => p.brand)
      .filter((b: string) => Boolean(b && b.trim()));
    return Array.from(new Set(brands)).slice(0, 10);
  }, [data?.products]);

  // Extract available categories from products
  const categoryList = useMemo(() => {
    if (!data?.products) return [];
    const cats = data.products
      .map((p: product) => p.category)
      .filter((c: string) => Boolean(c && c.trim()));
    return Array.from(new Set(cats)).slice(0, 8);
  }, [data?.products]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchParams.get('rating')) count++;
    if (searchParams.get('range')) count++;
    if (searchParams.get('brand')) count++;
    if (searchParams.get('oderBy')) count++;
    return count;
  }, [searchParams]);

  const changePage = async (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    await router.push(path + '?' + params.toString());
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (rating !== null) {
      params.set('rating', rating.toString());
    } else {
      params.delete('rating');
    }

    if (range && (range[0] !== 0 || range[1] !== 2000)) {
      params.set('range', `${range[0]}-${range[1]}`);
    } else {
      params.delete('range');
    }

    if (brand) {
      params.set('brand', brand);
    } else {
      params.delete('brand');
    }

    if (orderBy) {
      params.set('oderBy', orderBy);
    } else {
      params.delete('oderBy');
    }

    params.delete('page');
    const queryString = params.toString();
    router.push(path + (queryString ? `?${queryString}` : ''));
    setShow(false);
  };

  const resetFilter = () => {
    setRange([0, 2000]);
    setRating(null);
    setBrand(null);
    setOrderBy(null);

    const params = new URLSearchParams(searchParams);
    params.delete('rating');
    params.delete('range');
    params.delete('brand');
    params.delete('oderBy');
    params.delete('page');

    const queryString = params.toString();
    router.push(path + (queryString ? `?${queryString}` : ''));
    setShow(false);
  };

  const removeSingleFilter = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    params.delete('page');
    const queryString = params.toString();
    router.push(path + (queryString ? `?${queryString}` : ''));
  };

  return (
    <div className="fluid_container py-6 sm:py-3">
      <div className="flex flex-col gap-3 py-2 px-1 mb-4">
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
          <button
            type="button"
            className={`flex items-center gap-2 rounded-full px-4 sm:px-3 py-2 sm:py-1.5 h-auto border transition-all cursor-pointer font-medium text-sm sm:text-xs shadow-xs ${
              activeFiltersCount > 0
                ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold'
                : 'bg-white border-slate-200 text-slate-700 hover:border-sky-500 hover:text-sky-600'
            }`}
            onClick={() => setShow(true)}
          >
            <i className="fas fa-sliders-h text-sky-600"></i>
            <span>{t('product.filterButton')}</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[11px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 sm:gap-1.5">
            <span className="text-sm sm:text-xs text-slate-500 whitespace-nowrap">{t('product.sortBy')}</span>
            <Select
              allowClear
              value={searchParams.get('oderBy') || undefined}
              onClear={() => {
                removeSingleFilter('oderBy');
              }}
              className="!w-36 sm:!w-32 text-xs"
              placeholder={t('product.sortDefault')}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                if (e) {
                  params.set('oderBy', e);
                } else {
                  params.delete('oderBy');
                }
                params.delete('page');
                router.push(path + (params.toString() ? `?${params.toString()}` : ''));
              }}
            >
              <Select.Option value="increment">{t('product.sortPriceAsc')}</Select.Option>
              <Select.Option value="decrement">{t('product.sortPriceDesc')}</Select.Option>
              <Select.Option value="rating">Đánh giá cao</Select.Option>
            </Select>
          </div>
        </div>

        {/* Active filter badges */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-2 text-xs">
            <span className="text-slate-400 font-medium">Đang lọc:</span>
            {searchParams.get('range') && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <span>Giá: ${searchParams.get('range')}</span>
                <button
                  type="button"
                  onClick={() => removeSingleFilter('range')}
                  className="hover:text-rose-600 cursor-pointer font-bold"
                >
                  ✕
                </button>
              </span>
            )}
            {searchParams.get('rating') && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <span>★ {searchParams.get('rating')}+ sao</span>
                <button
                  type="button"
                  onClick={() => removeSingleFilter('rating')}
                  className="hover:text-rose-600 cursor-pointer font-bold"
                >
                  ✕
                </button>
              </span>
            )}
            {searchParams.get('brand') && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <span>Hãng: {searchParams.get('brand')}</span>
                <button
                  type="button"
                  onClick={() => removeSingleFilter('brand')}
                  className="hover:text-rose-600 cursor-pointer font-bold"
                >
                  ✕
                </button>
              </span>
            )}
            {searchParams.get('oderBy') && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <span>
                  {searchParams.get('oderBy') === 'increment'
                    ? 'Giá tăng dần'
                    : searchParams.get('oderBy') === 'decrement'
                    ? 'Giá giảm dần'
                    : 'Đánh giá cao'}
                </span>
                <button
                  type="button"
                  onClick={() => removeSingleFilter('oderBy')}
                  className="hover:text-rose-600 cursor-pointer font-bold"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={resetFilter}
              className="text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
            >
              {t('product.clearAll')}
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
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
                <p
                  className="mobile_name text-slate-800 group-hover:text-sky-600 transition-colors font-semibold text-sm sm:text-xs line-clamp-2 mb-2 break-words min-h-[2.5rem] sm:min-h-[2rem]"
                  title={value.title}
                >
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

      {/* Rich Filter Drawer */}
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setShow(false)}
        open={show}
        width={340}
        bodyStyle={{ padding: '16px 20px', paddingBottom: '24px' }}
        footerStyle={{ padding: 0, borderTop: 'none' }}
        footer={
          <div className="p-4 bg-white border-t border-slate-150 shadow-md pb-[calc(1rem+env(safe-area-inset-bottom,20px))]">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs transition-colors cursor-pointer shrink-0"
                onClick={resetFilter}
              >
                {t('product.clearAll')}
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                onClick={applyFilters}
              >
                <i className="fas fa-check text-xs"></i>
                <span>{t('product.applyFilter')}</span>
              </button>
            </div>
          </div>
        }
      >
        {/* Custom Header with Close Button */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-sm shadow-xs">
              <i className="fas fa-sliders-h"></i>
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-base m-0 leading-tight">
                {t('product.filterTitle')}
              </h3>
              <p className="text-xs text-slate-400 m-0">
                TechHouse Store
              </p>
            </div>
          </div>

          {/* CLOSE BUTTON - Clearly visible and responsive */}
          <button
            type="button"
            onClick={() => setShow(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer text-xs font-bold"
            aria-label={t('product.closeFilter')}
            title={t('product.closeFilter')}
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Sắp xếp nhanh (Quick Sort) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <i className="fas fa-sort-amount-down text-sky-600"></i>
              <span>{t('product.sortBy')}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderBy(null)}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                  orderBy === null
                    ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('product.sortDefault')}
              </button>
              <button
                type="button"
                onClick={() => setOrderBy('increment')}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                  orderBy === 'increment'
                    ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('product.sortPriceAsc')}
              </button>
              <button
                type="button"
                onClick={() => setOrderBy('decrement')}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                  orderBy === 'decrement'
                    ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('product.sortPriceDesc')}
              </button>
              <button
                type="button"
                onClick={() => setOrderBy('rating')}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                  orderBy === 'rating'
                    ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Đánh giá cao
              </button>
            </div>
          </div>

          {/* Khoảng giá (Price Range) */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 m-0 flex items-center gap-1.5">
                <i className="fas fa-tag text-sky-600"></i>
                <span>{t('product.priceRange')}</span>
              </h4>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                ${range[0]} — ${range[1]}
              </span>
            </div>

            {/* Quick Price Chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setRange([0, 2000])}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  range[0] === 0 && range[1] === 2000
                    ? 'bg-sky-500 text-white border-sky-500 font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t('product.allPrices')}
              </button>
              <button
                type="button"
                onClick={() => setRange([0, 50])}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  range[0] === 0 && range[1] === 50
                    ? 'bg-sky-500 text-white border-sky-500 font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                &lt; $50
              </button>
              <button
                type="button"
                onClick={() => setRange([50, 200])}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  range[0] === 50 && range[1] === 200
                    ? 'bg-sky-500 text-white border-sky-500 font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                $50 - $200
              </button>
              <button
                type="button"
                onClick={() => setRange([200, 500])}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  range[0] === 200 && range[1] === 500
                    ? 'bg-sky-500 text-white border-sky-500 font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                $200 - $500
              </button>
              <button
                type="button"
                onClick={() => setRange([500, 2000])}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  range[0] === 500 && range[1] === 2000
                    ? 'bg-sky-500 text-white border-sky-500 font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                &gt; $500
              </button>
            </div>

            <Slider
              range
              step={10}
              min={0}
              max={2000}
              onChange={(val) => setRange(val as [number, number])}
              value={range}
              className="mt-2 mb-1"
            />
            <div className="flex justify-between text-[11px] text-slate-400 px-0.5">
              <span>$0</span>
              <span>$500</span>
              <span>$1000</span>
              <span>$2000</span>
            </div>
          </div>

          {/* Đánh giá khách hàng (Rating) */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <i className="fas fa-star text-amber-500"></i>
              <span>{t('product.rating')}</span>
            </h4>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setRating(null)}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  rating === null
                    ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{t('product.allRatings')}</span>
                {rating === null && <i className="fas fa-check text-sky-600"></i>}
              </button>

              {[
                { min: 4.5, label: '4.5 sao trở lên', stars: 5 },
                { min: 4.0, label: 'Từ 4.0 sao trở lên', stars: 4 },
                { min: 3.0, label: 'Từ 3.0 sao trở lên', stars: 3 },
                { min: 2.0, label: 'Từ 2.0 sao trở lên', stars: 2 },
              ].map((item) => (
                <button
                  key={item.min}
                  type="button"
                  onClick={() => setRating(item.min)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    rating === item.min
                      ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Rate disabled defaultValue={item.stars} className="text-xs !text-amber-500" />
                    <span>{item.label}</span>
                  </div>
                  {rating === item.min && <i className="fas fa-check text-sky-600"></i>}
                </button>
              ))}
            </div>
          </div>

          {/* Thương hiệu (Brands) */}
          {brandList.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <i className="fas fa-certificate text-sky-600"></i>
                <span>{t('product.popularBrands')}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setBrand(null)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    brand === null
                      ? 'bg-sky-500 text-white border-sky-500 font-semibold shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tất cả hãng
                </button>
                {brandList.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(brand === b ? null : b)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      brand === b
                        ? 'bg-sky-500 text-white border-sky-500 font-semibold shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Danh mục (Categories) */}
          {categoryList.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <i className="fas fa-th-large text-sky-600"></i>
                <span>{t('product.categories')}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {categoryList.map((c) => (
                  <Link
                    key={c}
                    href={`/category/${c}`}
                    onClick={() => setShow(false)}
                    className="text-xs px-2.5 py-1 rounded-lg border bg-slate-50 text-slate-600 border-slate-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition-all capitalize"
                  >
                    {c.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
