'use client';
import Link from 'next/link';
import { memo, use, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Form, Input, Menu } from 'antd';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { getCart } from '@/redux/slice/cartSlice';
import { signOut } from '@/redux/slice/profile';
import Item from 'antd/es/list/Item';
import SearchBar from './SearchBar';
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

function Header() {
  const [menuToggle, setMenuToggle] = useState<Boolean>(false);
  const [openKeys, setOpenKeys] = useState(['']);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const [show, setShow] = useState(false);
  const [userMenu, setUsermenu] = useState(false);
  const [user, setUser] = useState<{ name: string; image: string }>({
    name: '',
    image: '',
  });
  const [navData, setNavData] = useState<MenuItem[]>([]);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.CartSlice.data);
  const userData = useAppSelector((state) => state.AuthSlice.data);
  const router = useRouter();
  let items: MenuItem[] = [];
  if (typeof window !== 'undefined') {
    items = [
      getItem('Trang chủ', '/'),
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
        ? getItem('SignOut', 'signout')
        : getItem('SignIn/SignUp', '/signIn'),
    ];
  }

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

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useLayoutEffect(() => {
    setSize(window?.innerWidth);
    window.addEventListener('scroll', scroll);
    window.addEventListener('resize', onChangeSize);
    setPage(window.scrollY);
    if (localStorage.getItem('token')) {
      setUser({
        name: localStorage.getItem('name') || '',
        image: localStorage.getItem('image') || '',
      });
    }
    dispatch(getCart(Number(localStorage.getItem('id'))));
  }, [use.name]);

  const onChangeSize = (): void => {
    setSize(window?.innerWidth);
  };

  const scroll = (): void => {
    setPage(window.scrollY);
  };

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };

  const signOutAction = async () => {
    setUsermenu(false);
    dispatch(signOut);
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
    localStorage.removeItem('token');
    setUser({
      name: '',
      image: '',
    });

    dispatch(getCart(Number(localStorage.getItem('id'))));
  };

  return (
    <header>
      <div className="top-header">
        <div className="top-header-container">
          <div className="nav-menu">
            <div className="icon-menu" onClick={toggleMenu}></div>
          </div>

          {menuToggle && size < 1200 && (
            <div className="mobile-menu">
              <div className="mobile-wrapper">
                <Menu
                  mode="inline"
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  style={{ width: '100%' }}
                  items={navData}
                  onSelect={async (items: MenuItem) => {
                    console.log(items?.key);
                    if (items?.key == 'signout') {
                      setMenuToggle(false);
                      return signOutAction();
                    }
                    return (
                      await router.push(`${items?.key}`), setMenuToggle(false)
                    );
                  }}
                />
              </div>
            </div>
          )}
          <div className="header-logo">
            <h1 className="text-3xl sm:text-3xl m-0 font-bold">
              <Link href="/">TechHouse</Link>
            </h1>
          </div>
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="header-contact">
            {size > 900 && (
              <Link href={'tel:19008198'} className="flex">
                <span>
                  <span className="fas fa-phone fa-2x"></span>
                </span>
                <span>
                  Hotline:
                  <br />
                  0963638362
                </span>
              </Link>
            )}

            <div
              className="header-cart relative"
              onMouseOver={() => setShow(true)}
              onMouseLeave={() => {
                setShow(false);
              }}
            >
              <Link href="cart">
                <span className="cart">
                  <b className="fa fa-cart-plus fa-2x"></b>
                  <sup id="count">
                    {data?.carts?.length ? data?.carts[0].totalProducts : 0}
                  </sup>
                </span>
                <span>Giỏ Hàng</span>
              </Link>
              {user.name && (
                <>
                  {show && (
                    <div className="z-20 right-0 mt-1 cart-list absolute max-w-[250px] w-[250px] max-h-[200px] rounded-sm overflow-y-scroll bg-slate-200 p-1 top-[1.5rem]">
                      {data?.carts[0].products.length ? (
                        <>
                          {data.carts[0].products.map((val) => (
                            <Link key={val.id} href={`product/${val.id}`}>
                              <div className="rounded-sm bg-white px-1 py-3 text-black flex flex-row flex-nowrap mb-1">
                                <span className="w-[87%] mx-0">
                                  {val.title}
                                </span>
                                <span className="w-[13%]">
                                  {' x '}
                                  {val?.quantity}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <h3>no data</h3>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="header-user">
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
                    <span className="!m-0 lg:hidden pl-1 inline-block">
                      {user.name}
                    </span>
                    {userMenu && (
                      <ul className="min-w-[80px] absolute bottom-[-45px] right-0 z-20 bg-white shadow-md shadow-gray-400 text-black p-3 list-none">
                        <li onClick={signOutAction}>Sign Out</li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href="signIn" className="flex">
                    {' '}
                    <b className="fa fa-user fa-2x"></b>
                    <span className="pl-1"> Đăng Ký/ Đăng Nhập</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-bar-mobile">
        <div className="searchbar-wraper">
          <SearchBar />
        </div>
      </div>

      <div className="dropdown-menu">
        <div className="menu-wrapper">
          <ul className="menu-ul">
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="product">Sản Phẩm</Link>
              <ul className="sub-menu">
                <li>
                  <Link href="/product">Sản phẩm mới</Link>
                </li>
                <li>
                  <Link href="/product">Sản phẩm giảm giá</Link>
                </li>
                <li>
                  <Link href="/product">Sản phẩm hot</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href="blog">Blog</Link>
            </li>
            <li>
              <Link href="about">Giới Thiệu</Link>
            </li>
            <li>
              <Link href="contact">Liên Hệ</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
export default memo(Header);
