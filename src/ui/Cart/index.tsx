'use client';
import { useAppSelector } from '@/redux/hooks';
import { updateQualityProduct } from '@/redux/slice/cartSlice';
import { productDetailCartType } from '@/types/productType';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

function Cart() {
  const data = useAppSelector((state) => state.CartSlice.data);
  const dispatch = useDispatch();
  const router = useRouter();
  const updateQuality = async (prodId: number, quantity: number) => {
    const body = {
      cartId: data.id,
      data: {
        merge: true,
        products: [{ id: prodId, quantity: quantity }],
      },
    };
    //@ts-ignore
    dispatch(updateQualityProduct(body));
  };
  return (
    <div className="body_cart fluid_container !bg-transparent">
      <div className="cart_container">
        <div className="cart_title">
          <h2 className="text-sky-500 font-bold text-2xl py-4">
            Giỏ hàng của bạn
          </h2>
        </div>
        <div className="cart_info w-full">
          <div className="mr-5 mt-0 h-full w-full ">
            <div className="" id="list_show">
              <div className="grid grid-cols-5 py-4 sm:grid-cols-3 bg-white mb-2">
                <div>Sản phẩm</div>
                <div className="sm:hidden ">Đơn giá</div>
                <div>Số lượng</div>
                <div>Giá</div>
                <div className="sm:hidden">Thao tác</div>
              </div>
              {data &&
                data.products.map((value: productDetailCartType) => (
                  //@ts-ignore
                  <Swipeout
                    style={{ overflow: 'visible' }}
                    left={[
                      {
                        text: 'Thêm thông tin',
                        onPress: () => router.push(`/product/${value.id}`),
                        style: {
                          backgroundColor: 'orange',
                          color: 'white',
                          height: '100%',
                        },
                      },
                    ]}
                    right={[
                      {
                        text: 'Xóa',
                        onPress: () =>
                          message.warning({
                            content: 'Tạm thời chưa thể xóa!',
                          }),
                        style: {
                          backgroundColor: 'red',
                          color: 'white',
                          height: '100%',
                        },
                      },
                    ]}
                  >
                    <div className="grid grid-cols-5 sm:grid-cols-3 py-3 px-2 bg-white mb-2 min-h-[100px] rounded-sm">
                      <div className="md:w-full  w-3/4 text-left text-sky-500">
                        {value.title}
                      </div>
                      <div className="sm:hidden">{value?.price}$</div>
                      <div>
                        <button
                          className="bg-[#eee] w-[25px] mr-1"
                          onClick={() =>
                            updateQuality(value.id, value.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="text-center w-[20px] inline-block">
                          {value?.quantity}
                        </span>
                        <button
                          className="bg-[#eee] w-[25px] ml-1"
                          onClick={() =>
                            updateQuality(value.id, value.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="text-left text-slate-600">
                        {value?.discountedPrice}
                        {''}$ <s> {value.total}$</s>
                      </div>
                      <div
                        className="text-red-500 sm:hidden cursor-pointer hover:text-blue"
                        onClick={() =>
                          message.warning({ content: 'Tạm thời chưa thể xóa!' })
                        }
                      >
                        xóa
                      </div>
                    </div>
                  </Swipeout>
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
                <span id="paid_sum">{data?.total ?? 0}$</span>
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
export default Cart;
