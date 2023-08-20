'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import SearchBar from '../SearchBar';
import Item from 'antd/es/list/Item';
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

function PrimaryNav({ data, user, signOutAction, size }: any) {
  const [userMenu, setUsermenu] = useState(false);
  const [show, setShow] = useState(false);
  const [navData, setNavData] = useState<MenuItem[]>([]);
  const [openKeys, setOpenKeys] = useState(['']);
  const router = useRouter();
  const searchRef = useRef(null);

  let items: MenuItem[] = [];
  if (typeof window !== 'undefined') {
    items = [
      getItem(<Link href="/">Trang Chủ</Link>, 'home'),
      getItem(<Link href="/product">Sản phẩm</Link>, 'product'),

      getItem(<Link href="/blog">Blog</Link>, '/blog'),

      getItem(<Link href="/about">Giới thiệu</Link>, '/about'),

      getItem(<Link href="/contact">Liên hệ</Link>, '/contact'),
    ];
  }

  useLayoutEffect(() => {
    items.length && setNavData(items);
  }, []);
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div
      className={
        `${size > 150 ? 'fixed ' : 'hidden '}` +
        '  duration-500 top-0 z-50 w-full py-2 bg-white shadow-sm shadow-slate-500 top-header-container'
      }
    >
      <div className="flex flex-row container max-w-[1378px]">
        <div className="header-logo w-1/4">
          <h1 className="text-center text-3xl text-sky-500 sm:text-3xl m-0 font-bold ">
            <Link href="/">TechHouse</Link>
          </h1>
        </div>
        <div className="Primary__menu w-2/4">
          <Menu
            mode="horizontal"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              display: 'list-item',
              textAlign: 'center',
              fontSize: '1rem',
            }}
            items={navData}
          />
        </div>
        <div className="header-contact w-1/4">
          <div
            className="header-cart relative mr-4"
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => {
              setShow(false);
            }}
          >
            <Link href="/cart" className="h-full">
              <span className="cart">
                <b className="fa fa-cart-plus fa-2x text-slate-400"></b>
                <sup id="count" className="text-white">
                  {data?.carts?.length ? data?.carts[0].totalProducts : 0}
                </sup>
              </span>
            </Link>
            {user.name && (
              <>
                {show && (
                  <div className=" lg:hidden z-20 right-0 mt-1 cart-list absolute  w-[350px]  rounded-sm  bg-white py-1 px-3 top-[1.7rem] shadow-sm shadow-slate-400">
                    <h2 className="font-bold text-xl text-sky-500 p-3 border-b border-gray-200 ">
                      Giỏ Hàng
                    </h2>
                    {data?.carts[0].products.length ? (
                      <div className="overflow-y-scroll h-full max-h-[200px]">
                        {data.carts[0].products.map((val: any) => (
                          <Link
                            key={val.id}
                            href={`/product/${val.id}`}
                            className=""
                          >
                            <div className="rounded-sm  bg-white px-1 py-3 text-black flex flex-row flex-nowrap mb-1 shadow-sm shadow-slate-300">
                              <div className="w-[87%] mx-0 font-bold">
                                {val.title}
                              </div>
                              <div className="w-[13%] text-sky-500">
                                {' x '}
                                {val?.quantity}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <h3 className="py-4">no data</h3>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="header-user ml-3">
            <div
              className=" relative"
              onMouseOver={(e) => setUsermenu(true)}
              onMouseLeave={() => setUsermenu(false)}
            >
              {user.name ? (
                <>
                  <Image
                    priority
                    width={40}
                    height={40}
                    src={user.image}
                    alt="avt"
                    className=" inline-block rounded-full w-[40px] h-[40px] aspect-[1/1] "
                  />
                  {userMenu && (
                    <ul className="min-w-[90px] absolute bottom-[-45px] right-0 z-20 bg-white shadow-md shadow-gray-400 text-black p-3 list-none">
                      <li onClick={signOutAction}>Đăng xuất</li>
                    </ul>
                  )}
                </>
              ) : (
                <Link href="/signIn" className="flex">
                  {' '}
                  <b className="fa fa-user fa-2x text-slate-400"></b>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrimaryNav;
