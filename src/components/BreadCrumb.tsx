'use client';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/context/I18nContext';

function BreadCrumb({ title }: { title: string | any }) {
  const { t } = useTranslation();

  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-hidden">
      <ol className="flex items-center flex-nowrap gap-1.5 sm:gap-1 text-sm sm:text-xs text-slate-500 m-0 p-0 list-none leading-none">
        {/* Item 1: Trang chu */}
        <li className="inline-flex items-center shrink-0 leading-none">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-sky-600 transition-colors leading-none"
          >
            <i className="fas fa-home text-xs text-slate-400"></i>
            <span>{t('common.home')}</span>
          </Link>
        </li>

        {/* Separator 1 */}
        <li className="inline-flex items-center text-slate-300 shrink-0 select-none px-0.5 leading-none" aria-hidden="true">
          /
        </li>

        {/* Item 2: San pham */}
        <li className="inline-flex items-center shrink-0 leading-none">
          <Link
            href="/product"
            className="inline-flex items-center text-slate-500 hover:text-sky-600 transition-colors leading-none"
          >
            <span>{t('common.products')}</span>
          </Link>
        </li>

        {/* Separator 2 & Item 3 (if title exists) */}
        {title && (
          <>
            <li className="inline-flex items-center text-slate-300 shrink-0 select-none px-0.5 leading-none" aria-hidden="true">
              /
            </li>
            <li className="inline-flex items-center min-w-0 leading-none">
              <span
                className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-[130px] block leading-none"
                title={typeof title === 'string' ? title : undefined}
              >
                {title}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
