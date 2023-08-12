'use client';
import { useAppSelector } from '@/redux/hooks';
import { product } from '@/types/productType';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';

function Cart() {
  const data = useAppSelector((state) => state.CartSlice.data);
  return (
    <div className="body_cart">
      <div className="cart_container">
        <div className="cart_title">
          <h2 className="text-sky-500 font-bold text-2xl py-4">
            Giỏ hàng của bạn
          </h2>
        </div>
        <div className="cart_info w-full">
          <div className="mr-5 mt-0 h-full w-full bg-white">
            <div className="" id="list_show">
              <div className="grid grid-cols-3 py-4">
                <div>Tên</div>
                <div>Số lượng</div>
                <div>Giá</div>
              </div>
              {data &&
                data.carts[0].products.map((value: any) => (
                  <div className="grid grid-cols-3 py-3 px-2">
                    <div className="md:w-full  w-3/4 text-left text-sky-500">
                      {value.title}
                    </div>
                    <div>{value?.quantity}</div>
                    <div className="text-slate-600">{value.price}$</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="paid">
            <div className="paid_container">
              <div className="item_info">
                <h3>Thông tin đơn hàng</h3>
              </div>
              <div className="money_paid">
                <span>Tổng tiền</span>
                <span id="paid_sum">
                  {data?.carts?.length ? data?.carts[0].total : 0}$
                </span>
              </div>
              <div className="paid_done">
                <span>
                  Phí vận chuyển tính ở trang thanh toán <br />
                  Bạn cũng có thể nhập mã giảm giá ở trang thanh toán
                </span>
                <div className="paid_submit">
                  <button type="submit">Thanh toán</button>
                  <p>
                    <Link href="/product">Tiếp tục mua hàng</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Cart);
