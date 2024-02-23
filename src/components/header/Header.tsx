'use client';
import Link from 'next/link';
import { memo, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCart, resetCart } from '@/redux/slice/cartSlice';
import { signOut } from '@/redux/slice/profile';
import SearchBar from '../SearchBar';
import Cookies from 'js-cookie';
import MobileNav from './MobileNav';
import PrimaryNav from './PrimaryNav';
import { Avatar, Badge, Dropdown, Empty, Popover, Space } from 'antd';
import { useRouter } from 'next/navigation';
import type { MenuProps } from 'antd/lib/menu';

function Header() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const [user, setUser] = useState<{ name: string; image: string }>({
    name: '',
    image: '',
  });
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.CartSlice.data);
  const router = useRouter();
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
      dispatch(getCart(Number(localStorage.getItem('id'))));
    }
  }, [user.name]);
  const onChangeSize = (): void => {
    setSize(window?.innerWidth);
  };
  const signOutAction = async () => {
    dispatch(signOut);
    Cookies.remove('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
    localStorage.removeItem('token');
    setUser({
      name: '',
      image: '',
    });

    dispatch(resetCart());
    router.push('/');
  };
  const scroll = (): void => {
    setPage(window.scrollY);
  };
  const items: MenuProps['items'] = [
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
    <header>
      <div
        className={
          `${
            page > 200
              ? 'shadow-sm shadow-stone-300 fixed top-0 left-0 z-50'
              : ''
          }` + ' transition-all duration-500 top-header '
        }
      >
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
          <div className="header-contact justify-center items-center gap-2">
            {size >= 1100 && (
              <a href={'tel:19008198'} className="flex justify-start flex-auto">
                <span className="mr-0">
                  <span className="fas fa-phone fa-2x"></span>
                </span>
                <span className="ml-2">
                  Hotline:
                  <br />
                  0963638362
                </span>
              </a>
            )}

            <div className="header-cart h-full flex-auto">
              <Link
                href="/cart"
                className="h-full flex justify-center items-center w-full mr-0"
              >
                <Popover
                  placement="bottom"
                  trigger={['hover']}
                  open={size <= 1024 ? false : undefined}
                  title={
                    <h2 className="font-bold text-xl text-sky-500 p-3 border-b border-gray-200">
                      Giỏ Hàng
                    </h2>
                  }
                  content={Content}
                >
                  <Badge count={data?.totalProducts ?? 0} overflowCount={99}>
                    <b className="fa fa-cart-plus fa-2x text-white"></b>
                  </Badge>
                  <span className="ml-2 md:hidden">Giỏ Hàng</span>
                </Popover>
              </Link>
            </div>

            <div className=" header-user flex-auto ml-0 flex justify-center">
              <div>
                {user.name ? (
                  <>
                    <Dropdown
                      menu={{ items }}
                      placement="bottom"
                      trigger={['click', 'hover']}
                      className="!rounded-sm"
                    >
                      <Space className="w-fit">
                        <Avatar
                          src={user.image || '/assets/Image/logo.png'}
                          alt="avt"
                          size={'default'}
                        />
                        <span className="!m-0 lg:hidden pl-1 inline-block">
                          {user.name}
                        </span>
                      </Space>
                    </Dropdown>
                    {/* {userMenu && (
                      <ul className="min-w-[90px] absolute bottom-[-45px] right-0 z-20 bg-white shadow-md shadow-gray-400 text-black p-3 list-none">
                        <li onClick={signOutAction}>Đăng xuất</li>
                      </ul>
                    )} */}
                  </>
                ) : (
                  <Link href="/signIn" className="flex">
                    {' '}
                    <b className="fa fa-user fa-2x"></b>
                    <span className="pl-1 md:hidden"> Đăng Ký/ Đăng Nhập</span>
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
