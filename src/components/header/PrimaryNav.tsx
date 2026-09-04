'use client';
import React, {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { MenuProps } from 'antd/lib/menu';
import { Dropdown, Empty, Menu, Popover, Badge } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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

import { useTranslation } from '@/context/I18nContext';
import LanguageSwitcher from '../LanguageSwitcher';

function PrimaryNav({ data, user, signOutAction, size }: any) {
  const { t } = useTranslation();
  const [userMenu, setUsermenu] = useState(false);
  const [show, setShow] = useState(false);
  const [openKeys, setOpenKeys] = useState(['']);
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef(null);

  const getActiveKey = () => {
    if (pathname.startsWith('/product') || pathname.startsWith('/category')) return '/product';
    if (pathname.startsWith('/blog')) return '/blog';
    if (pathname.startsWith('/about')) return '/about';
    if (pathname.startsWith('/contact')) return '/contact';
    if (pathname === '/') return '/';
    return '';
  };

  const navData: MenuItem[] = [
    getItem(<Link href="/">{t('common.home')}</Link>, '/'),
    getItem(<Link href="/product">{t('common.products')}</Link>, '/product', null, [
      {
        label: <Link href="/product">{t('common.newProducts')}</Link>,
        key: 'product:new',
      },
      {
        label: <Link href="/product">{t('common.bestSellerProducts')}</Link>,
        key: 'product:best',
      },
      {
        label: <Link href="/product">{t('common.saleProducts')}</Link>,
        key: 'product:sale',
      },
    ]),
    getItem(<Link href="/blog">{t('common.blog')}</Link>, '/blog'),
    getItem(<Link href="/about">{t('common.about')}</Link>, '/about'),
    getItem(<Link href="/contact">{t('common.contact')}</Link>, '/contact'),
  ];
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const DropDownitems: MenuProps['items'] = [
    {
      key: 'user_info',
      disabled: true,
      label: (
        <div className="px-2 py-2 border-b border-slate-100 flex items-center gap-3">
          <Image
            priority
            width={34}
            height={34}
            src={user.image || '/assets/Image/logo.png'}
            alt="avt"
            className="rounded-full w-[34px] h-[34px] object-cover ring-2 ring-sky-500/20"
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
          <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">Khóa</span>
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
          <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">Khóa</span>
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
          <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">Khóa</span>
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
          <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">Khóa</span>
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
    <div
      className={
        `${size > 150 ? 'fixed ' : 'hidden '}` +
        ' duration-300 top-0 left-0 z-50 w-full py-2.5 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 top-header-container'
      }
    >
      <div className="flex flex-row items-center justify-between container max-w-7xl mx-auto px-4">
        <div className="header-logo">
          <h1 className="text-2xl text-sky-600 m-0 font-extrabold tracking-tight">
            <Link href="/" className="flex items-center gap-2">
              <i className="fas fa-bolt text-amber-500 text-lg"></i>
              <span>TechHouse</span>
            </Link>
          </h1>
        </div>
        <div className="Primary__menu flex-1 flex justify-center min-w-0">
          <Menu
            mode="horizontal"
            disabledOverflow={true}
            selectedKeys={[getActiveKey()]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              minWidth: 0,
              display: 'flex',
              justifyContent: 'center',
            }}
            items={navData}
          />
        </div>
        <div className="header-contact flex items-center gap-3">
          <div className="header-cart relative">
            <Link href="/cart" className="flex items-center">
              <Popover
                placement="bottom"
                open={size <= 1024 ? false : undefined}
                title={
                  <h2 className="font-bold text-base text-slate-800 p-2 border-b border-slate-100 flex items-center justify-between">
                    <span>{t('common.cart')}</span>
                    <span className="text-xs text-sky-600 font-normal">{data?.totalProducts ?? 0} {t('common.cartTotalItems')}</span>
                  </h2>
                }
                content={Content}
              >
                <Badge count={data?.totalProducts ?? 0} overflowCount={99} size="small">
                  <span className="w-9 h-9 rounded-full bg-slate-100 hover:bg-sky-50 flex items-center justify-center transition-colors">
                    <i className="fa fa-shopping-cart text-slate-700"></i>
                  </span>
                </Badge>
              </Popover>
            </Link>
          </div>

          <div className="header-user">
            <div>
              {Boolean(user?.name && user.name.trim() && user.name !== 'undefined' && user.name !== 'null') ? (
                <Dropdown menu={{ items: DropDownitems }} placement="bottom">
                  <Image
                    priority
                    width={36}
                    height={36}
                    src={user.image}
                    alt="avt"
                    className="inline-block rounded-full w-[36px] h-[36px] object-cover ring-2 ring-sky-500/20"
                  />
                </Dropdown>
              ) : (
                <Dropdown
                  menu={{ items: guestItems }}
                  placement="bottom"
                  trigger={['click', 'hover']}
                >
                  <Link href="/signIn" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-700 text-xs font-semibold transition-colors">
                    <i className="fa fa-user"></i>
                    <span>{t('common.login')}</span>
                  </Link>
                </Dropdown>
              )}
            </div>
          </div>

          <LanguageSwitcher variant="light" />
        </div>
      </div>
    </div>
  );
}

export default PrimaryNav;
