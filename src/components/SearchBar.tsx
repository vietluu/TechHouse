'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';

import { useTranslation } from '@/context/I18nContext';

interface SearchBarProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

function SearchBar({ variant = 'desktop', className = '' }: SearchBarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const refInput = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);

  // Clear search bar whenever the user navigates
  useEffect(() => {
    if (refInput.current) {
      refInput.current.value = '';
      setHasValue(false);
    }
  }, [pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
  };

  const handleClear = () => {
    if (refInput.current) {
      refInput.current.value = '';
      refInput.current.focus();
      setHasValue(false);
    }
  };

  const getSearch = async () => {
    const query = refInput.current?.value.trim();
    if (!query) return;
    return router.push(`/Search?keyword=${encodeURIComponent(query)}`);
  };

  if (variant === 'mobile') {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getSearch();
        }}
        className={`w-full flex items-center bg-white rounded-full shadow-xs px-3 h-[38px] border border-slate-200/80 transition-all focus-within:ring-2 focus-within:ring-sky-400 ${className}`}
      >
        <i className="fas fa-search text-slate-400 text-xs shrink-0 mr-2"></i>
        <input
          ref={refInput}
          type="text"
          placeholder={t('common.searchPlaceholder')}
          aria-label={t('common.searchAria')}
          onChange={handleInputChange}
          className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none border-none p-0 focus:ring-0 focus:outline-none"
        />
        {hasValue && (
          <button
            type="button"
            aria-label={t('common.clearSearchAria')}
            onClick={handleClear}
            className="text-slate-400 hover:text-slate-600 w-5 h-5 flex items-center justify-center shrink-0 ml-1 border-none bg-transparent cursor-pointer p-0"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        )}
      </form>
    );
  }

  return (
    <>
      <input
        ref={refInput}
        type="text"
        placeholder={t('common.searchPlaceholder')}
        aria-label={t('common.searchAria')}
        onChange={handleInputChange}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            await getSearch();
          }
        }}
      />
      {hasValue && (
        <button
          type="button"
          aria-label={t('common.clearSearchAria')}
          onClick={handleClear}
          className="!bg-transparent !text-slate-400 hover:!text-slate-600 !w-6 !h-6 !p-0 !min-w-0 !mr-1"
        >
          <i className="fas fa-times text-xs"></i>
        </button>
      )}
      <button type="button" aria-label={t('common.searchAria')} onClick={() => getSearch()}>
        <i className="fas fa-search"></i>
      </button>
    </>
  );
}

export default SearchBar;
