'use client';
import { useAppSelector } from '@/redux/hooks';
import {
  initCartFromSession,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '@/redux/slice/cartSlice';
import { productDetailCartType } from '@/types/productType';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import SkeletonCart from '@/components/SkeletonCart';
import { useTranslation } from '@/context/I18nContext';
import Cookies from 'js-cookie';

const isValidAuthToken = (token: any): boolean => {
  return (
    typeof token === 'string' &&
    token.trim().length > 10 &&
    token !== 'undefined' &&
    token !== 'null'
  );
};

function Cart() {
  const { t } = useTranslation();
  const data = useAppSelector((state) => state.CartSlice.data);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [hasToken, setHasToken] = useState(true);

  useEffect(() => {
    setIsClient(true);
    dispatch(initCartFromSession());
    const token = localStorage.getItem('token') || Cookies.get('token');
    if (!isValidAuthToken(token)) {
      setHasToken(false);
    } else {
      setHasToken(true);
    }
  }, [dispatch]);

  const updateItemQty = (prodId: number, qty: number) => {
    if (qty <= 0) {
      handleRemove(prodId);
      return;
    }
    dispatch(updateQuantity({ id: prodId, quantity: qty }));
  };

  const handleRemove = (prodId: number) => {
    dispatch(removeFromCart(prodId));
    message.success(t('cart.removedSuccess'));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    message.success(t('cart.emptyMessage'));
  };

  if (isClient && !hasToken) {
    return (
      <div className="fluid_container py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-150 shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{t('common.requireLoginToBuy')}</h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {t('common.requireLoginToAddCart')}
          </p>
          <Link
            href="/signIn?callbackUrl=/cart"
            className="inline-block w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-md shadow-sky-600/25 transition-all"
          >
            {t('common.login')}
          </Link>
        </div>
      </div>
    );
  }

  const hasItems = isClient && data && Array.isArray(data.products) && data.products.length > 0;

  if (isClient && !hasItems) {
    return (
      <div className="body_cart fluid_container py-12 px-4">
        <div className="cart_container max-w-xl mx-auto text-center">
          <div className="bg-white rounded-3xl border border-slate-150 p-10 sm:p-6 shadow-soft">
            <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-3xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-5 text-3xl sm:text-2xl shadow-xs">
              <i className="fas fa-shopping-basket"></i>
            </div>
            <h2 className="text-2xl sm:text-xl font-bold text-slate-800 mb-2">
              {t('cart.emptyMessage')}
            </h2>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
              {t('common.emptyCart')}
            </p>
            <Link
              href="/product"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-sky-600/25 transition-all active:scale-95"
            >
              <i className="fas fa-arrow-left text-xs"></i>
              <span>{t('cart.continueShopping')}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="body_cart fluid_container py-8 px-4 sm:px-2">
      <div className="cart_container">
        <div className="cart_title mb-6 sm:mb-4 flex items-center justify-between">
          <h1 className="text-2xl sm:text-xl font-bold text-slate-800 tracking-tight">
            {t('cart.title')}
          </h1>
          {hasItems && (
            <button
              onClick={handleClearCart}
              className="text-xs sm:text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 sm:px-2 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <i className="fas fa-trash-alt"></i>
              <span>{t('cart.clearCart')}</span>
            </button>
          )}
        </div>
        <div className="cart_info w-full flex flex-row lg:flex-col gap-6">
          <div className="flex-1 w-full min-w-0">
            <div id="list_show">
              <div className="grid grid-cols-5 py-3 sm:py-2.5 px-4 sm:px-2.5 sm:grid-cols-3 bg-slate-100/90 rounded-xl mb-3 text-xs sm:text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <div className="col-span-1 sm:col-span-1">{t('cart.productCol')}</div>
                <div className="sm:hidden text-center">{t('cart.priceCol')}</div>
                <div className="text-center">{t('cart.quantityCol')}</div>
                <div className="text-center">{t('cart.totalCol')}</div>
                <div className="sm:hidden text-center">{t('cart.actionCol')}</div>
              </div>
              <div className="space-y-2">
                {!isClient ? (
                  <SkeletonCart />
                ) : (
                  data.products.map((value: productDetailCartType) => (
                    <React.Fragment key={value.id}>
                      {value.quantity > 0 && (
                        //@ts-ignore
                        <Swipeout
                          key={value.id}
                          style={{ overflow: 'visible' }}
                          left={[
                            {
                              text: t('cart.viewDetail'),
                              onPress: () =>
                                router.push(`/product/${value.id}`),
                              style: {
                                backgroundColor: '#0284c7',
                                color: 'white',
                                height: '100%',
                                borderRadius: '0.75rem 0 0 0.75rem',
                              },
                            },
                          ]}
                          right={[
                            {
                              text: t('cart.remove'),
                              onPress: () => handleRemove(value.id),
                              style: {
                                backgroundColor: '#e11d48',
                                color: 'white',
                                height: '100%',
                                borderRadius: '0 0.75rem 0.75rem 0',
                              },
                            },
                          ]}
                        >
                          <div className="grid grid-cols-5 sm:grid-cols-3 items-center py-4 sm:py-3 px-4 sm:px-2.5 bg-white rounded-xl border border-slate-150 shadow-xs hover:shadow-soft transition-all">
                            <div className="text-left font-medium text-slate-800 text-sm sm:text-xs hover:text-sky-600 transition-colors pr-1">
                              <Link href={`/product/${value.id}`} className="line-clamp-2">
                                {value.title}
                              </Link>
                            </div>
                            <div className="sm:hidden text-center text-slate-600 text-sm">{value?.price}$</div>
                            <div className="flex justify-center">
                              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
                                <button
                                  className="w-7 h-7 sm:w-6 sm:h-6 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors text-xs cursor-pointer"
                                  onClick={() =>
                                    updateItemQty(value.id, value.quantity - 1)
                                  }
                                >
                                  -
                                </button>
                                <span className="w-8 sm:w-6 text-center text-xs font-semibold text-slate-800">
                                  {value?.quantity}
                                </span>
                                <button
                                  className="w-7 h-7 sm:w-6 sm:h-6 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors text-xs cursor-pointer"
                                  onClick={() =>
                                    updateItemQty(value.id, value.quantity + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="text-center font-bold text-rose-600 text-sm sm:text-xs flex items-center justify-center gap-1">
                              <span>{value?.discountedPrice}$</span>
                              {value.total !== value.discountedPrice && (
                                <s className="text-[10px] text-slate-400 font-normal sm:hidden"> {value.total}$</s>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemove(value.id)}
                                className="hidden sm:inline-flex text-slate-400 hover:text-rose-500 p-1 transition-colors ml-1 cursor-pointer"
                                title={t('cart.remove')}
                              >
                                <i className="fas fa-trash-alt text-xs"></i>
                              </button>
                            </div>
                            <div
                              className="text-center text-rose-500 sm:hidden cursor-pointer hover:text-rose-700 text-sm font-medium transition-colors"
                              onClick={() => handleRemove(value.id)}
                            >
                              <i className="fas fa-trash-alt mr-1"></i> {t('cart.remove')}
                            </div>
                          </div>
                        </Swipeout>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="paid w-[360px] lg:w-full h-fit">
            <div className="paid_container">
              <div className="item_info mb-4">
                <h3 className="text-lg font-bold text-slate-800">{t('cart.orderSummary')}</h3>
              </div>
              <div className="money_paid py-4 border-y border-slate-100 flex items-center justify-between text-base">
                <span className="text-slate-600 font-medium">{t('cart.totalPayment')}</span>
                <span id="paid_sum" className="text-2xl font-extrabold text-rose-600">{hasItems ? (data?.discountedTotal || data?.total || 0) : 0}$</span>
              </div>
              <div className="paid_done pt-4">
                <span className="text-xs text-slate-400 block mb-6 leading-relaxed">
                  {t('cart.shippingNote')}
                </span>
                <div className="paid_submit space-y-3">
                  <button
                    type="submit"
                    disabled={!hasItems}
                    className={`w-full py-3.5 text-white font-semibold rounded-xl shadow-md transition-all ${
                      hasItems
                        ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/25 cursor-pointer'
                        : 'bg-slate-300 shadow-none cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (hasItems) {
                        message.warning({ content: t('cart.cannotCheckoutYet') });
                      }
                    }}
                  >
                    {t('cart.checkoutSubmit')}
                  </button>
                  <p className="text-center">
                    <Link href="/product" className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center justify-center gap-1">
                      <i className="fas fa-arrow-left text-xs"></i> {t('cart.continueShopping')}
                    </Link>
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
