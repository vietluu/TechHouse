'use client';
import React from 'react';
import { useTranslation } from '@/context/I18nContext';

interface ActiveFiltersProps {
  range: string | null;
  rating: string | null;
  brand: string | null;
  orderBy: string | null;
  onRemoveRange: () => void;
  onRemoveRating: () => void;
  onRemoveBrand: () => void;
  onRemoveOrderBy: () => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  range,
  rating,
  brand,
  orderBy,
  onRemoveRange,
  onRemoveRating,
  onRemoveBrand,
  onRemoveOrderBy,
  onClearAll,
}: ActiveFiltersProps) {
  const { t } = useTranslation();

  const hasAnyFilter = Boolean(range || rating || brand || orderBy);
  if (!hasAnyFilter) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-3 text-xs">
      <span className="text-slate-400 font-medium">
        {t('product.filteringBy')}
      </span>

      {range && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          <span>
            {t('product.priceLabel')} ${range}
          </span>
          <button
            type="button"
            onClick={onRemoveRange}
            className="hover:text-rose-600 cursor-pointer font-bold"
            aria-label="Remove price filter"
          >
            ✕
          </button>
        </span>
      )}

      {rating && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          <span>
            ★ {rating}+ {t('product.starsAndUp')}
          </span>
          <button
            type="button"
            onClick={onRemoveRating}
            className="hover:text-rose-600 cursor-pointer font-bold"
            aria-label="Remove rating filter"
          >
            ✕
          </button>
        </span>
      )}

      {brand && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          <span>
            {t('product.brandLabel')} {brand}
          </span>
          <button
            type="button"
            onClick={onRemoveBrand}
            className="hover:text-rose-600 cursor-pointer font-bold"
            aria-label="Remove brand filter"
          >
            ✕
          </button>
        </span>
      )}

      {orderBy && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          <span>
            {orderBy === 'increment'
              ? t('product.sortPriceAsc')
              : orderBy === 'decrement'
              ? t('product.sortPriceDesc')
              : t('product.sortRatingDesc')}
          </span>
          <button
            type="button"
            onClick={onRemoveOrderBy}
            className="hover:text-rose-600 cursor-pointer font-bold"
            aria-label="Remove sort filter"
          >
            ✕
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
      >
        {t('product.clearAll')}
      </button>
    </div>
  );
}
