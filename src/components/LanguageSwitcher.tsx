'use client';
import React from 'react';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from '@/context/I18nContext';
import { Locale } from '@/locales';

interface LanguageSwitcherProps {
  variant?: 'light' | 'transparent';
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'transparent',
  className = '',
}) => {
  const { locale, changeLocale } = useTranslation();

  const items: MenuProps['items'] = [
    {
      key: 'vi',
      label: (
        <div className="flex items-center gap-2 py-1 px-1">
          <span className="text-base leading-none">🇻🇳</span>
          <span className={`text-xs font-semibold ${locale === 'vi' ? 'text-sky-600' : 'text-slate-700'}`}>
            Tiếng Việt
          </span>
          {locale === 'vi' && <i className="fas fa-check text-xs text-sky-600 ml-auto"></i>}
        </div>
      ),
      onClick: () => changeLocale('vi'),
    },
    {
      key: 'en',
      label: (
        <div className="flex items-center gap-2 py-1 px-1">
          <span className="text-base leading-none">🇬🇧</span>
          <span className={`text-xs font-semibold ${locale === 'en' ? 'text-sky-600' : 'text-slate-700'}`}>
            English
          </span>
          {locale === 'en' && <i className="fas fa-check text-xs text-sky-600 ml-auto"></i>}
        </div>
      ),
      onClick: () => changeLocale('en'),
    },
  ];

  const isTransparent = variant === 'transparent';

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={['click', 'hover']}
    >
      <button
        type="button"
        className={`h-[36px] sm:h-[32px] px-2.5 sm:px-2 rounded-full flex items-center gap-1 transition-all text-xs font-semibold cursor-pointer outline-none shrink-0 ${
          isTransparent
            ? 'bg-white/12 hover:bg-white/22 border border-white/20 text-white'
            : 'bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700'
        } ${className}`}
      >
        <span className="text-sm sm:text-xs leading-none">{locale === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
        <span className="uppercase tracking-wider text-[11px] sm:text-[10px] font-bold">
          {locale}
        </span>
        <i className="fas fa-chevron-down text-[8px] opacity-70 ml-0.5 sm:hidden"></i>
      </button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
