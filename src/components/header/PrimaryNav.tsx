'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MenuProps } from 'antd/lib/menu';
import { Dropdown, Empty, Menu, Popover, Badge } from 'antd';
import { useRouter } from 'next/navigation';
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
  const DropDownitems: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={() => signOutAction()}>Đăng xuất</span>,
    },
  ];
  const Content = (
    <div className=" max-w-[350px] w-full min-w-[290px]   py-1 px-3 ">
      {data?.products.length ? (
        <div className="overflow-y-scroll h-full max-h-[200px]">
          {data.products.map((val: any) => (
            <Link key={val.id} href={`/product/${val.id}`} className="">
              <div className="rounded-sm  bg-white px-1 py-3 text-black flex flex-row flex-nowrap mb-1 shadow-sm shadow-slate-300">
                <div className="w-[87%] mx-0 font-bold">{val.title}</div>
                <div className="w-[13%] text-sky-500">
                  {' x '}
                  {val?.quantity}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty className="py-4" description="Không có đơn hàng nào" />
      )}
    </div>
  );
  return (
    <div
      className={
        `${size > 150 ? 'fixed ' : 'hidden '}` +
        '  duration-500 top-0 z-50 w-full py-2 bg-white shadow-sm shadow-slate-400 top-header-container'
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
          <div className="header-cart relative mr-4">
            <Link href="/cart" className="h-full">
              <Popover
                placement="bottom"
                title={
                  <h2 className="font-bold text-xl text-sky-500 p-3 border-b border-gray-200 ">
                    Giỏ Hàng
                  </h2>
                }
                content={Content}
              >
                <Badge count={data?.totalProducts ?? 0} overflowCount={99}>
                  <b className="fa fa-cart-plus fa-2x text-gray-500"></b>
                </Badge>
              </Popover>
            </Link>
          </div>

          <div className="header-user ml-3">
            <div>
              {user.name ? (
                <Dropdown menu={{ items: DropDownitems }} placement="bottom">
                  <Image
                    priority
                    width={40}
                    height={40}
                    src={user.image}
                    alt="avt"
                    className=" inline-block rounded-full w-[40px] h-[40px] aspect-[1/1] "
                  />
                </Dropdown>
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
