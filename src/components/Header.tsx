'use client';
import Link from 'next/link';
import { memo, useEffect, useLayoutEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { api } from '@/utils/api';
import { Profile } from '@/types/profileType';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import { stat } from 'fs';
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
    getItem('Trang chủ', 'home'),
    getItem('Sản phẩm', 'sub1', '', [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
    getItem('Product view', 'sub2', '', [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3'),
  ]),
  getItem('Blog', 'blog'),

  getItem('Giới thiệu', 'about'),

  getItem('Liên hệ', 'contact'),
  getItem('SignIn/SignUp', 'sign'),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2'];
function Header() {
  const [menuToggle, setMenuToggle] = useState<Boolean>(false);
  const [openKeys, setOpenKeys] = useState(['']);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const [user, setUser] = useState<{ name: string, image: string }>({
    name: '',
    image:''
  });
  const data = useAppSelector(state => state.AuthSlice.data)
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
    setUser({
      name: localStorage.getItem('name') || '',
      image:localStorage.getItem('image') || ''
    })
   },[])
  const onChangeSize = (): void => {
    setSize(window?.innerWidth);
  };
  // const handleShowDropdown = (e: any): void => {
  //   e.children[1].classList.toggle('activebtn');
  //   e.children[2].classList.toggle('open');
  // };
  const scroll = (): void => {
    setPage(window.scrollY);
  };
  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };
  console.log('render')
  return (
    <header>
      <div className="top-header">
        <div className="top-header-container">
          <div className="nav-menu">
            <div className="icon-menu" onClick={toggleMenu}></div>
          </div>

          {menuToggle && size < 900 && (
            <div className="mobile-menu">
              <div className="mobile-wrapper">
              
                <Menu
                  mode="inline"
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  style={{ width: '100%' }}
                  items={items}
                />
              </div>
            </div>
          )}
          <div className="header-logo">
            <h1 className="text-3xl sm:text-3xl  font-bold">
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
            
            {size > 900 &&  <div className="flex">
                <span>
                  <i className="fas fa-phone fa-2x"></i>
                </span>
                <span>
                  Hotline:
                  <br />
                  0963638362
                </span>
              </div>}
           
            <div className="header-cart">
              <Link href="cart.aspx">
                <span className="cart">
                  <i className="fa fa-cart-plus fa-2x"></i>
                  <sup id="count">0</sup>
                </span>
                <span>Giỏ Hàng</span>
              </Link>
            </div>
            <div className="header-user flex" >
                <span>
                  {user?.image ? <Image priority width={50} height={50} src={user.image} alt='avt' className='rounded-full w-[50px] h-[50px] ' /> :<i className="fas fa-user fa-2x"></i>}
                </span>{' '}
                {user?.name ? <span>{user.name }</span> : <span> <Link href='signIn'>Đăng Ký/ Đăng Nhập </Link></span>}
              
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
export default memo(Header)