'use client';
import Link from 'next/link';
import { memo, use, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCart } from '@/redux/slice/cartSlice';
import { signOut } from '@/redux/slice/profile';
import SearchBar from '../SearchBar';
import Cookies from 'js-cookie';
import MobileNav from './MobileNav';
import PrimaryNav from './PrimaryNav';

function Header() {
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

  const signOutAction = async () => {
    setUsermenu(false);
    dispatch(signOut);
    await Cookies.remove('token');
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
          {size <= 1024 && <MobileNav signOutAction={signOutAction} />}

          <div className="header-logo">
            <h1 className="text-3xl sm:text-3xl m-0 font-bold">
              <Link href="/">TechHouse</Link>
            </h1>
          </div>
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="header-contact">
            {size >= 1100 && (
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
              <Link href="/cart" className="h-full">
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
                    <div className="lg:hidden z-20 right-0 mt-1 cart-list absolute  w-[350px]  rounded-sm  bg-white py-1 px-3 top-[1.7rem] shadow-sm shadow-slate-400">
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
                      <ul className="min-w-[90px] absolute bottom-[-45px] right-0 z-20 bg-white shadow-md shadow-gray-400 text-black p-3 list-none">
                        <li onClick={signOutAction}>Đăng xuất</li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href="/signIn" className="flex">
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
        <div className="searchbar-wraper bg-white shadow-sm shadow-slate-400">
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
              <Link href="/product">Sản Phẩm</Link>
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
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">Giới Thiệu</Link>
            </li>
            <li>
              <Link href="/contact">Liên Hệ</Link>
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
