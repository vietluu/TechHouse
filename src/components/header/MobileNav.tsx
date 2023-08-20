'use client';
import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import SearchBar from '../SearchBar';
import Item from 'antd/es/list/Item';
import Link from 'next/link';

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
  const [menuToggle, setMenuToggle] = useState<Boolean>(false);
  const [navData, setNavData] = useState<MenuItem[]>([]);
  const [openKeys, setOpenKeys] = useState(['']);
  const router = useRouter();

  let items: MenuItem[] = [];
  if (typeof window !== 'undefined') {
    items = [
      getItem(<Link href="/">Trang Chủ</Link>, 'home'),
      getItem('Sản phẩm', 'product', '', [
        getItem(<Link href="/product">Tất cả sản phẩm</Link>, 'all-product'),
        getItem(<Link href="/product">Sản phẩm mới</Link>, 'product-new'),
        getItem(<Link href="/product">Sản phẩm hot</Link>, 'product-hot'),
        getItem(
          <Link href="/product">Sản phẩm giảm giá</Link>,
          'product-saleoff'
        ),
      ]),

      getItem(<Link href="/blog">Blog</Link>, '/blog'),

      getItem(<Link href="/about">Giới thiệu</Link>, '/about'),

      getItem(<Link href="/contact">Liên hệ</Link>, '/contact'),
      localStorage?.getItem('token')
        ? getItem('Đăng xuất', 'signout')
        : getItem(<Link href="/signIn">Đăng nhập/đăng kí</Link>, '/signIn'),
    ];
  }
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
      document.body.style.position = 'fixed';
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'auto';
    }
    items.length && setNavData(items);
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
        <div className="mobile-menu">
          <div className="mobile-wrapper">
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{ width: '100%' }}
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
        </div>
      )}
    </>
  );
}

export default MobileNav;
