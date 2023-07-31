'use client';
import Link from 'next/link';
import { memo, useEffect, useLayoutEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { getCart } from '@/redux/slice/cartSlice';
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

const items: MenuItem[] = [
  getItem('Trang chủ', '/'),
  getItem('Sản phẩm', '/product', '', [
    getItem('all product', '/product'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Product view', 'sub2', '', [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3'),
  ]),
  getItem('Blog', '/blog'),

  getItem('Giới thiệu', '/about'),

  getItem('Liên hệ', '/contact'),
  getItem('SignIn/SignUp', '/sign'),
];

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

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.CartSlice.data);
  const router = useRouter();

  useEffect(() => {
    if (menuToggle) {
      document.body.style.position = 'fixed';
    } else {
      document.body.style.position = 'static';
    }
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
    if (localStorage.getItem('id')) {
      dispatch(getCart(Number(localStorage.getItem('id'))));
    }
  }, [localStorage.getItem('token')]);

  const onChangeSize = (): void => {
    setSize(window?.innerWidth);
  };

  const scroll = (): void => {
    setPage(window.scrollY);
  };
  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };
  const signOut = () => {
    localStorage.removeItem('token');
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
                  items={items}
                  onSelect={async (items: MenuItem) => {
                    await router.push(`${items?.key}`), setMenuToggle(false);
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
            <input
              id="search-input"
              type="text"
              placeholder="nhập tìm kiếm..."
            />
            <button type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="header-contact">
            {size > 900 && (
              <div className="flex">
                <span>
                  <span className="fas fa-phone fa-2x"></span>
                </span>
                <span>
                  Hotline:
                  <br />
                  0963638362
                </span>
              </div>
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
                  <i className="fa fa-cart-plus fa-2x"></i>
                  <sup id="count">{data?.carts[0]?.totalProducts || 0}</sup>
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
                            <Link href={`product/${val.id}`}>
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
                {localStorage.getItem('token') ? (
                  <>
                    <Image
                      priority
                      width={40}
                      height={40}
                      src={user.image}
                      alt="avt"
                      className=" inline-block rounded-full w-[40px] h-[40px] aspect-[1/1] "
                    />
                    <span className="!m-0 pl-1 inline-block">{user.name}</span>
                    {userMenu && (
                      <ul className="absolute bottom-[-45px] right-0 z-20 bg-white shadow-md shadow-gray-400 text-black p-3 list-none">
                        <li onClick={signOut}>Sign Out</li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href="signIn" className="flex">
                    {' '}
                    <span className="fas fa-user fa-2x"></span>
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
          <input
            id="m-search-input"
            type="text"
            placeholder="nhập tìm kiếm..."
          />
          <button type="button">
            <i className="fas fa-search"></i>
          </button>
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
                  <Link href="productIphone.aspx">iphone</Link>
                </li>
                <li>
                  <Link href="#">samsung</Link>
                </li>
                <li>
                  <Link href="#">xiaomi</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="productIphone.aspx">Product View</Link>
              <ul className="sub-menu">
                <li>
                  <Link href="detailCart.aspx?id=1">iphone 13 pro max</Link>
                </li>
                <li>
                  <Link href="#">xiaomi 12 pro</Link>
                </li>
                <li>
                  <Link href="#">samsung galaxy s22</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="blog.aspx">Blog</Link>
            </li>
            <li>
              <Link href="gioithieu.aspx">Giới Thiệu</Link>
            </li>
            <li>
              <Link href="#">Liên Hệ</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
export default memo(Header);
