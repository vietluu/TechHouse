'use client';
import React from 'react';
import { Select } from 'antd';
import { useTranslation } from '@/context/I18nContext';

interface ProductToolbarProps {
  total: number;
  activeFiltersCount: number;
  orderBy: string | null;
  onOpenFilter: () => void;
  onSelectOrderBy: (value: string | null) => void;
}

export default function ProductToolbar({
  total,
  activeFiltersCount,
  orderBy,
  onOpenFilter,
  onSelectOrderBy,
}: ProductToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 py-2 px-1 mb-2">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-xl text-slate-800 font-bold tracking-tight m-0">
          {t('common.products')}
        </h1>
        <span className="text-xs text-slate-500 font-medium">
          {total} {t('common.products').toLowerCase()}
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
          onClick={onOpenFilter}
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
          <span className="text-sm sm:text-xs text-slate-500 whitespace-nowrap">
            {t('product.sortBy')}
          </span>
          <Select
            allowClear
            value={orderBy || undefined}
            onClear={() => onSelectOrderBy(null)}
            className="!w-36 sm:!w-32 text-xs"
            placeholder={t('product.sortDefault')}
            onChange={(val) => onSelectOrderBy(val || null)}
          >
            <Select.Option value="increment">
              {t('product.sortPriceAsc')}
            </Select.Option>
            <Select.Option value="decrement">
              {t('product.sortPriceDesc')}
            </Select.Option>
            <Select.Option value="rating">
              {t('product.sortRatingDesc')}
            </Select.Option>
          </Select>
        </div>
      </div>
    </div>
  );
}
