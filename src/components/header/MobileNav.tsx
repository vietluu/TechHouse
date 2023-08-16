'use client';
import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import SearchBar from '../SearchBar';
import Item from 'antd/es/list/Item';

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
      getItem('Trang chủ', '/home'),
      getItem('Sản phẩm', '/product', '', [
        getItem('Tất cả sản phẩm', '/product'),
        getItem('Sản phẩm giảm giá', '/product'),
        getItem('Sản phẩm hot', '/product'),
        getItem('Sản Phẩm mới', '/product'),
      ]),

      getItem('Blog', '/blog'),

      getItem('Giới thiệu', '/about'),

      getItem('Liên hệ', '/contact'),
      localStorage?.getItem('token')
        ? getItem('Đăng xuất', 'signout')
        : getItem('Đăng nhập/Đăng kí', '/signIn'),
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
      document.body.style.position = 'static';
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
                if (items?.key == 'signout') {
                  setMenuToggle(false);
                  return signOutAction();
                }
                return await router.push(`${items?.key}`), setMenuToggle(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MobileNav;
