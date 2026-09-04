'use client';
import Link from 'next/link';
import { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCart, resetCart, initCartFromSession } from '@/redux/slice/cartSlice';
import { signOut } from '@/redux/slice/profile';
import SearchBar from '../SearchBar';
import Cookies from 'js-cookie';
import MobileNav from './MobileNav';
import PrimaryNav from './PrimaryNav';
import LanguageSwitcher from '../LanguageSwitcher';
import { Avatar, Badge, Dropdown, Empty, Popover, Space, message } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import type { MenuProps } from 'antd/lib/menu';
import { useTranslation } from '@/context/I18nContext';

function Header() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const [user, setUser] = useState<{ name: string; image: string }>({
    name: '',
    image: '',
  });
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.CartSlice.data);
  const router = useRouter();
  const pathname = usePathname();

  const isHomeActive = pathname === '/';
  const isProductActive = pathname.startsWith('/product') || pathname.startsWith('/category');
  const isBlogActive = pathname.startsWith('/blog');
  const isAboutActive = pathname.startsWith('/about');
  const isContactActive = pathname.startsWith('/contact');
  const isValidAuthToken = (token: any): boolean => {
    return typeof token === 'string' &&
      token.trim().length > 10 &&
      token !== 'undefined' &&
      token !== 'null';
  };

  const syncUserState = useCallback(() => {
    if (typeof window === 'undefined') return;
    const localToken = localStorage.getItem('token');
    const cookieToken = Cookies.get('token');
    const token = isValidAuthToken(localToken) ? localToken : (isValidAuthToken(cookieToken) ? cookieToken : null);

    // Initialize cart from session
    dispatch(initCartFromSession());

    if (token) {
      const name = localStorage.getItem('name') || Cookies.get('name');
      const validName = name && name !== 'undefined' && name !== 'null' && name.trim() !== '' ? name : 'User';
      const image = localStorage.getItem('image') || Cookies.get('image') || '';
      setUser({ name: validName, image });
    } else {
      setUser({ name: '', image: '' });
      // Clean up stale or invalid tokens
      if (localToken && !isValidAuthToken(localToken)) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('id');
      }
      if (cookieToken && !isValidAuthToken(cookieToken)) {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('name', { path: '/' });
        Cookies.remove('id', { path: '/' });
      }
    }
  }, [dispatch]);

  const isUserLoggedIn = Boolean(
    user.name &&
    user.name.trim() !== '' &&
    user.name !== 'undefined' &&
    user.name !== 'null'
  );

  useEffect(() => {
    setSize(window?.innerWidth || 0);
    window.addEventListener('scroll', scroll);
    window.addEventListener('resize', onChangeSize);
    window.addEventListener('storage', syncUserState);
    window.addEventListener('auth-change', syncUserState);
    setPage(window.scrollY);
    syncUserState();

    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', onChangeSize);
      window.removeEventListener('storage', syncUserState);
      window.removeEventListener('auth-change', syncUserState);
    };
  }, [pathname, syncUserState]);

  const onChangeSize = (): void => {
    setSize(window?.innerWidth || 0);
  };

  const signOutAction = () => {
    dispatch(signOut());
    Cookies.remove('token', { path: '/' });
    Cookies.remove('name', { path: '/' });
    Cookies.remove('id', { path: '/' });
    Cookies.remove('image', { path: '/' });
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
    localStorage.removeItem('token');
    setUser({
      name: '',
      image: '',
    });

    dispatch(resetCart());
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth-change'));
    }
    message.success(t('common.logout'));
    router.push('/');
    router.refresh();
  };

  const scroll = (): void => {
    setPage(window.scrollY);
  };

  const items: MenuProps['items'] = [
    {
      key: 'user_info',
      disabled: true,
      label: (
        <div className="px-2 py-2 border-b border-slate-100 flex items-center gap-3">
          <Avatar
            src={user.image || '/assets/Image/logo.png'}
            size={34}
            className="ring-2 ring-sky-500/20"
          />
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm text-slate-800 leading-tight">{user.name}</span>
            <span className="text-[11px] text-sky-600 font-medium mt-0.5">{t('common.memberBadge')}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'my_account',
      disabled: true,
      label: (
        <div className="flex items-center justify-between py-1 text-slate-400">
          <span className="flex items-center gap-2 text-xs">
            <i className="fas fa-user-circle text-sky-600"></i> {t('common.myAccount')}
          </span>
        </div>
      ),
    },
    {
      key: 'change_password',
      disabled: true,
      label: (
        <div className="flex items-center justify-between py-1 text-slate-400">
          <span className="flex items-center gap-2 text-xs">
            <i className="fas fa-key text-amber-500"></i> {t('common.changePassword')}
          </span>
        </div>
      ),
    },
    {
      key: 'order_history',
      disabled: true,
      label: (
        <div className="flex items-center justify-between py-1 text-slate-400">
          <span className="flex items-center gap-2 text-xs">
            <i className="fas fa-box-open text-emerald-500"></i> {t('common.orderHistory')}
          </span>
        </div>
      ),
    },
    {
      key: 'account_settings',
      disabled: true,
      label: (
        <div className="flex items-center justify-between py-1 text-slate-400">
          <span className="flex items-center gap-2 text-xs">
            <i className="fas fa-cog text-slate-400"></i> {t('common.accountSettings')}
          </span>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      danger: true,
      label: (
        <div
          onClick={() => signOutAction()}
          className="flex items-center gap-2 py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
        >
          <i className="fas fa-sign-out-alt"></i> {t('common.logout')}
        </div>
      ),
    },
  ];

  const guestItems: MenuProps['items'] = [
    {
      key: 'login',
      label: (
        <Link href="/signIn" className="flex items-center gap-2 py-1.5 text-xs font-semibold text-sky-600">
          <i className="fas fa-sign-in-alt text-sky-600"></i> {t('common.login')}
        </Link>
      ),
    },
    {
      key: 'signup',
      label: (
        <Link href="/signUp" className="flex items-center gap-2 py-1.5 text-xs font-medium text-slate-700 hover:text-sky-600">
          <i className="fas fa-user-plus text-amber-500"></i> {t('auth.signUpNow')}
        </Link>
      ),
    },
  ];

  const Content = (
    <div className="max-w-[360px] w-full min-w-[300px] py-1 px-1 flex flex-col">
      {data?.products?.length ? (
        <>
          {/* Scrollable Products List Only */}
          <div className="overflow-y-auto max-h-[220px] pr-1 space-y-2 overscroll-contain">
            {data.products.map((val: any) => (
              <Link key={val.id} href={`/product/${val.id}`} className="block">
                <div className="rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors p-3 flex flex-row items-center justify-between border border-slate-100">
                  <div className="w-[80%] font-medium text-slate-800 text-sm truncate">{val.title}</div>
                  <div className="text-sky-600 font-bold text-sm">
                    x{val?.quantity}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pinned View Cart Button at Bottom */}
          <div className="pt-3 mt-2 border-t border-slate-100 bg-white">
            <Link
              href="/cart"
              className="block w-full text-center py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-sm shadow-xs transition-colors"
            >
              {t('common.viewCart')}
            </Link>
          </div>
        </>
      ) : (
        <Empty className="py-4" description={t('common.emptyCart')} />
      )}
    </div>
  );
  return (
    <header>
      <div
        className={
          `${
            page > 200
              ? 'shadow-md fixed top-0 left-0 z-50 backdrop-blur-md bg-sky-700/95'
              : ''
          }` + ' transition-all duration-300 top-header'
        }
      >
        <div className="top-header-container">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {size <= 1024 && <MobileNav signOutAction={signOutAction} />}

            <div className="header-logo">
              <h1 className="text-2xl sm:text-lg m-0 font-extrabold tracking-tight">
                <Link href="/" className="flex items-center gap-1.5 sm:gap-1">
                  <i className="fas fa-bolt text-amber-300 text-xl sm:text-base"></i>
                  <span>TechHouse</span>
                </Link>
              </h1>
            </div>
          </div>

          <div className="search-bar">
            <SearchBar />
          </div>

          <div className="header-contact flex items-center gap-2 sm:gap-1.5">
            {size >= 1100 && (
              <a href={'tel:19008198'} className="header-hotline flex items-center h-[38px] px-3.5 rounded-full">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-[10px] text-white"></i>
                </span>
                <span className="ml-2 text-xs leading-tight text-white whitespace-nowrap">
                  <span className="opacity-80 block text-[10px]">{t('common.hotline')}:</span>
                  <span className="font-bold">0963.638.362</span>
                </span>
              </a>
            )}

            <div className="header-cart">
              <Popover
                placement="bottom"
                trigger={['hover']}
                open={size <= 1024 ? false : undefined}
                title={
                  <h2 className="font-bold text-base text-slate-800 p-2 border-b border-slate-100 flex items-center justify-between">
                    <span>{t('common.cart')}</span>
                    <span className="text-xs text-sky-600 font-normal">{data?.totalProducts ?? 0} {t('common.cartTotalItems')}</span>
                  </h2>
                }
                content={Content}
              >
                <Link
                  href="/cart"
                  aria-label={t('common.cart')}
                  className="relative flex items-center justify-center h-[36px] sm:h-[34px] px-3 sm:px-0 sm:w-[34px] rounded-full bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 text-white transition-all shadow-xs"
                >
                  <i className="fas fa-shopping-bag text-sm sm:text-xs"></i>
                  <span className="md:hidden ml-1.5 text-xs font-semibold whitespace-nowrap">{t('common.cart')}</span>
                  {(data?.totalProducts ?? 0) > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-1 ring-2 ring-sky-700 shadow-xs leading-none">
                      {(data?.totalProducts ?? 0) > 99 ? '99+' : data?.totalProducts}
                    </span>
                  )}
                </Link>
              </Popover>
            </div>

            <div className="header-user">
              {isUserLoggedIn ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  trigger={['click', 'hover']}
                  className="!rounded-lg"
                >
                  <div
                    role="button"
                    aria-label={t('common.account')}
                    className="cursor-pointer h-[36px] sm:h-[34px] px-2.5 sm:px-0 sm:w-[34px] rounded-full bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 text-white transition-all flex items-center justify-center shadow-xs"
                  >
                    <Avatar
                      src={user.image || '/assets/Image/logo.png'}
                      alt="avt"
                      size={24}
                      className="ring-1 ring-white/60"
                    />
                    <span className="!m-0 md:hidden pl-1.5 inline-block text-white font-semibold text-xs truncate max-w-[90px]">
                      {user.name}
                    </span>
                  </div>
                </Dropdown>
              ) : (
                <Dropdown
                  menu={{ items: guestItems }}
                  placement="bottomRight"
                  trigger={['click', 'hover']}
                >
                  <div
                    role="button"
                    aria-label={t('common.account')}
                    className="cursor-pointer flex items-center justify-center h-[36px] sm:h-[34px] px-2.5 sm:px-0 sm:w-[34px] rounded-full text-xs font-semibold text-white bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 transition-all shadow-xs"
                  >
                    <i className="fa fa-user text-xs"></i>
                    <span className="md:hidden ml-1.5">{t('common.account')}</span>
                  </div>
                </Dropdown>
              )}
            </div>

            {/* Language Switcher - desktop/tablet only, mobile has it in drawer */}
            <div className="sm:hidden">
              <LanguageSwitcher variant="transparent" />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar integrated smoothly inside the blue header */}
        <div className="hidden sm:block px-3.5 pb-2.5 pt-0.5 sm:pt-2">
          <SearchBar variant="mobile" />
        </div>
      </div>
      <div className="dropdown-menu">
        <div className="menu-wrapper">
          <ul className="menu-ul">
            <li className={isHomeActive ? 'active' : ''}>
              <Link href="/">{t('common.home')}</Link>
            </li>
            <li className={isProductActive ? 'active' : ''}>
              <Link href="/product">{t('common.products')}</Link>
              <ul className="sub-menu">
                <li>
                  <Link href="/product">{t('common.newProducts')}</Link>
                </li>
                <li>
                  <Link href="/product">{t('common.saleProducts')}</Link>
                </li>
                <li>
                  <Link href="/product">{t('common.bestSellerProducts')}</Link>
                </li>
              </ul>
            </li>

            <li className={isBlogActive ? 'active' : ''}>
              <Link href="/blog">{t('common.blog')}</Link>
            </li>
            <li className={isAboutActive ? 'active' : ''}>
              <Link href="/about">{t('common.about')}</Link>
            </li>
            <li className={isContactActive ? 'active' : ''}>
              <Link href="/contact">{t('common.contact')}</Link>
            </li>
          </ul>
        </div>
      </div>
      {size >= 1024 && (
        <PrimaryNav
          data={data}
          signOutAction={signOutAction}
          user={user}
          size={page}
        />
      )}
    </header>
  );
}
export default memo(Header);
