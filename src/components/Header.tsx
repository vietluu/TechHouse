"use client";

import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
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
  getItem("Trang chủ", "home"),
  getItem("Sản phẩm", "sub1", "", [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Product view", "sub2", "", [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3"),
  ]),
  getItem("Blog", "blog"),

  getItem("Giới thiệu", "about"),

  getItem("Liên hệ", "contact"),
  getItem("SignIN/SignUp", "sign"),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2"];
export default function Header() {
  const [menuToggle, setMenuToggle] = useState<Boolean>(false);
  const [openKeys, setOpenKeys] = useState([""]);

  useEffect(() => {
    if (menuToggle) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "static";
    }
  }, [menuToggle]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };
  return (
    <header>
      <div className="top-header">
        <div className="top-header-container">
          <div className="nav-menu">
            <div className="icon-menu" onClick={toggleMenu}></div>
          </div>

          {menuToggle && (
            <div className="mobile-menu">
              <div className="mobile-wrapper">
                {/* <ul className="menu-mobile-ul">
                    <li><a href="index.aspx">Trang chủ</a></li>
                    <li><a href="productIphone.aspx">Sản Phẩm</a>
                        <span className="dropdown"><i className="fas fa-arrow-circle-right"></i></span>
                        <ul className="sub-mobile-menu">
                            <li><a href="#">IPhone</a></li>
                            <li><a href="#">Samsung</a></li>
                            <li><a href="#">Xiaomi</a></li>
                        </ul>
                    </li>
                    <li><a href="productIphone.aspx">Product View</a>
                        <span className="dropdown"><i className="fas fa-arrow-alt-circle-right"></i></span>
                        <ul className="sub-mobile-menu">
                            <li><a href="detailCart.aspx?id=1">Iphone 13 Pro Max</a></li>
                            <li><a href="#">Xiaomi 12 Pro</a></li>
                            <li><a href="#">Samsung Galaxy S22</a></li>
                        </ul>
                    </li>
                    <li><a href="blog.aspx">Blog</a></li>
                    <li><a href="gioithieu.aspx">Giới Thiệu</a></li>
                    <li><a href="#">Liên Hệ</a></li>
                    <li><a>sign in/sigm up</a></li>
                </ul> */}
                <Menu
                  mode="inline"
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  style={{ width: "100%" }}
                  items={items}
                />
              </div>
            </div>
          )}
          <div className="header-logo">
            <h1 className="text-3xl font-bold">
              <a href="index.aspx">TechHouse</a>
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
            <div className="header-hotline">
              <span>
                <i className="fas fa-phone fa-2x"></i>
              </span>
              <span>
                Hotline:
                <br />
                0963638362
              </span>
            </div>

            <div className="header-cart">
              <a href="cart.aspx">
                <span className="cart">
                  <i className="fa fa-cart-plus fa-2x"></i>
                  <sup id="count">0</sup>
                </span>
                <span>Giỏ Hàng</span>
              </a>
            </div>
            <div className="header-user">
              <a href="./SignIn.aspx">
                <span>
                  <i className="fas fa-user fa-2x"></i>
                </span>{" "}
                <span> Đăng Ký/ Đăng Nhập </span>
              </a>
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
              <a href="index.aspx">Trang chủ</a>
            </li>
            <li>
              <a href="productIphone.aspx">Sản Phẩm</a>
              <ul className="sub-menu">
                <li>
                  <a href="productIphone.aspx">iphone</a>
                </li>
                <li>
                  <a href="#">samsung</a>
                </li>
                <li>
                  <a href="#">xiaomi</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="productIphone.aspx">Product View</a>
              <ul className="sub-menu">
                <li>
                  <a href="detailCart.aspx?id=1">iphone 13 pro max</a>
                </li>
                <li>
                  <a href="#">xiaomi 12 pro</a>
                </li>
                <li>
                  <a href="#">samsung galaxy s22</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="blog.aspx">Blog</a>
            </li>
            <li>
              <a href="gioithieu.aspx">Giới Thiệu</a>
            </li>
            <li>
              <a href="#">Liên Hệ</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
