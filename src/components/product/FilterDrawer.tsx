'use client';
import React from 'react';
import { Drawer, Rate, Slider } from 'antd';
import Link from 'next/link';
import { useTranslation } from '@/context/I18nContext';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  range: [number, number];
  setRange: (range: [number, number]) => void;
  rating: number | null;
  setRating: (rating: number | null) => void;
  brand: string | null;
  setBrand: (brand: string | null) => void;
  orderBy: string | null;
  setOrderBy: (orderBy: string | null) => void;
  brandList: string[];
  categoryList: string[];
  onApply: () => void;
  onReset: () => void;
}

export default function FilterDrawer({
  open,
  onClose,
  range,
  setRange,
  rating,
  setRating,
  brand,
  setBrand,
  orderBy,
  setOrderBy,
  brandList,
  categoryList,
  onApply,
  onReset,
}: FilterDrawerProps) {
  const { t } = useTranslation();

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={open}
      width={340}
      bodyStyle={{ padding: '16px 20px', paddingBottom: '24px' }}
      footerStyle={{ padding: 0, borderTop: 'none' }}
      footer={
        <div className="p-4 bg-white border-t border-slate-150 shadow-md pb-[calc(1rem+env(safe-area-inset-bottom,20px))]">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs transition-colors cursor-pointer shrink-0"
              onClick={onReset}
            >
              {t('product.clearAll')}
            </button>
            <button
              type="button"
              className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              onClick={onApply}
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
              {t('common.brandName')}
            </p>
          </div>
        </div>

        {/* Prominent Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer text-xs font-bold"
          aria-label={t('product.closeFilter')}
          title={t('product.closeFilter')}
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Quick Sort */}
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
              {t('product.sortRatingDesc')}
            </button>
          </div>
        </div>

        {/* Price Range */}
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

        {/* Rating */}
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
              { min: 4.5, stars: 5, label: `4.5 ${t('product.starsAndUp')}` },
              { min: 4.0, stars: 4, label: `${t('product.fromRating')} 4.0 ${t('product.starsAndUp')}` },
              { min: 3.0, stars: 3, label: `${t('product.fromRating')} 3.0 ${t('product.starsAndUp')}` },
              { min: 2.0, stars: 2, label: `${t('product.fromRating')} 2.0 ${t('product.starsAndUp')}` },
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

        {/* Brands */}
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
                {t('product.allBrands')}
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

        {/* Categories */}
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
                  onClick={onClose}
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
  );
}
