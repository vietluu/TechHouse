'use client';
import React, { useEffect, useMemo, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from '../SearchBar';
import Item from 'antd/es/list/Item';
import Link from 'next/link';

import { useTranslation } from '@/context/I18nContext';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2'];

function MobileNav({ signOutAction }: { signOutAction: any }) {
  const { t, locale, changeLocale } = useTranslation();
  const [menuToggle, setMenuToggle] = useState<Boolean>(false);
  const [openKeys, setOpenKeys] = useState(['']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Auto-close menu when changing route
  useEffect(() => {
    setMenuToggle(false);
  }, [pathname]);

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!(localStorage.getItem('token') || document.cookie.includes('token=')));
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const navData = useMemo((): MenuItem[] => [
    getItem(<Link href="/">{t('common.home')}</Link>, 'home'),
    getItem(t('common.products'), 'product', '', [
      getItem(<Link href="/product">{t('common.allProducts')}</Link>, 'all-product'),
      getItem(<Link href="/product">{t('common.newProducts')}</Link>, 'product-new'),
      getItem(<Link href="/product">{t('common.bestSellerProducts')}</Link>, 'product-hot'),
      getItem(<Link href="/product">{t('common.saleProducts')}</Link>, 'product-saleoff'),
    ]),
    getItem(<Link href="/blog">{t('common.blog')}</Link>, '/blog'),
    getItem(<Link href="/about">{t('common.about')}</Link>, '/about'),
    getItem(<Link href="/contact">{t('common.contact')}</Link>, '/contact'),
    isLoggedIn
      ? getItem(
          <span className="text-rose-600 font-semibold flex items-center gap-2">
            <i className="fas fa-sign-out-alt"></i> {t('common.logout')}
          </span>,
          'signout'
        )
      : getItem(
          <Link href="/signIn" className="text-sky-600 font-semibold flex items-center gap-2">
            <i className="fas fa-sign-in-alt"></i> {t('common.login')} / {t('auth.signUpNow')}
          </Link>,
          '/signIn'
        ),
  ], [t, locale, isLoggedIn]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    if (menuToggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuToggle]);

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };
  return (
    <>
      <div className="nav-menu">
        <div className="icon-menu" onClick={toggleMenu}></div>
      </div>
      {menuToggle && (
        <div className="mobile-menu" onClick={() => setMenuToggle(false)}>
          <div className="mobile-wrapper flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 overflow-y-auto pr-1 min-h-0">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <i className="fas fa-bolt text-amber-500"></i>
                  <span>TechHouse</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuToggle(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 text-xs transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <Menu
                key={locale}
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{ width: '100%', border: 'none' }}
                items={navData}
                onSelect={async (items: MenuItem) => {
                  setMenuToggle(false);
                  if (items?.key == 'signout') {
                    setMenuToggle(false);
                    return signOutAction();
                  }
                }}
              />
            </div>

            {/* Language Switcher in Drawer */}
            <div className="pt-4 mt-4 pb-4 sm:pb-8 border-t border-slate-100 shrink-0">
              <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
                <i className="fas fa-globe text-sky-600 text-xs"></i>
                <span>{t('common.displayLanguage')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => changeLocale('vi')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    locale === 'vi'
                      ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm leading-none">🇻🇳</span>
                  <span>Tiếng Việt</span>
                </button>
                <button
                  type="button"
                  onClick={() => changeLocale('en')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    locale === 'en'
                      ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm leading-none">🇬🇧</span>
                  <span>English</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileNav;
