import {
  cart,
  productDetailCartType,
} from '@/types/productType';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const SESSION_CART_KEY = 'techhouse_cart';

export const getSessionCart = () => {
  if (typeof window === 'undefined') {
    return {
      id: 1,
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: 1,
      totalProducts: 0,
      totalQuantity: 0,
    };
  }
  try {
    const raw = sessionStorage.getItem(SESSION_CART_KEY) || localStorage.getItem(SESSION_CART_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.products)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse session cart:', e);
  }
  return {
    id: 1,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 1,
    totalProducts: 0,
    totalQuantity: 0,
  };
};

export const saveSessionCart = (cartData: any) => {
  if (typeof window === 'undefined') return;
  try {
    if (!cartData || !Array.isArray(cartData.products) || cartData.products.length === 0) {
      sessionStorage.removeItem(SESSION_CART_KEY);
      localStorage.removeItem(SESSION_CART_KEY);
    } else {
      const serialized = JSON.stringify(cartData);
      sessionStorage.setItem(SESSION_CART_KEY, serialized);
      localStorage.setItem(SESSION_CART_KEY, serialized);
    }
  } catch (e) {
    console.error('Failed to save session cart:', e);
  }
};

const recalculateCart = (cartData: any) => {
  if (!cartData) return;
  if (!Array.isArray(cartData.products)) {
    cartData.products = [];
  }
  cartData.totalProducts = cartData.products.filter((p: any) => (p.quantity || 0) > 0).length;
  cartData.totalQuantity = cartData.products.reduce((acc: number, p: any) => acc + (p.quantity || 0), 0);
  cartData.total = Number(
    cartData.products
      .reduce((acc: number, p: any) => acc + (Number(p.price || 0) * (p.quantity || 0)), 0)
      .toFixed(2)
  );
  cartData.discountedTotal = Number(
    cartData.products
      .reduce((acc: number, p: any) => {
        const itemDisc = p.discountedPrice !== undefined ? Number(p.discountedPrice) : (Number(p.price || 0) * (p.quantity || 0));
        return acc + itemDisc;
      }, 0)
      .toFixed(2)
  );
};

const initialState: cart = {
  isLoading: {},
  hasErr: {},
  data: {
    id: 1,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 1,
    totalProducts: 0,
    totalQuantity: 0,
  },
};

export const getCart = createAsyncThunk('cart/get', async (id?: Number) => {
  const sessionData = getSessionCart();
  return { data: sessionData };
});

export const addCart = createAsyncThunk(
  'cart/add',
  async (body: any, { dispatch }) => {
    const item = body?.products?.[0];
    if (item) {
      dispatch(addToCart(item));
    }
    return { data: getSessionCart() };
  }
);

export const updateQualityProduct = createAsyncThunk(
  'cart/update',
  async (body: any, { dispatch }) => {
    const item = body?.data?.products?.[0];
    if (item) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity }));
    }
    return { data: getSessionCart() };
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCartFromSession: (state) => {
      const sessionCart = getSessionCart();
      state.data = sessionCart;
    },
    addToCart: (state, action: PayloadAction<any>) => {
      if (!state.data || !Array.isArray(state.data.products)) {
        state.data = {
          id: 1,
          products: [],
          total: 0,
          discountedTotal: 0,
          userId: 1,
          totalProducts: 0,
          totalQuantity: 0,
        };
      }
      const item = action.payload;
      const qty = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
      const existing = state.data.products.find((p: any) => p.id === item.id);

      const unitDiscount = item.discountPercentage && item.discountPercentage > 0
        ? Number((Number(item.price || 0) * (1 - item.discountPercentage / 100)).toFixed(2))
        : Number(item.price || 0);

      if (existing) {
        existing.quantity += qty;
        existing.total = Number((Number(existing.price || 0) * existing.quantity).toFixed(2));
        existing.discountedPrice = Number((unitDiscount * existing.quantity).toFixed(2));
      } else {
        state.data.products.push({
          id: item.id,
          title: item.title,
          price: Number(item.price || 0),
          quantity: qty,
          total: Number((Number(item.price || 0) * qty).toFixed(2)),
          discountPercentage: item.discountPercentage || 0,
          discountedPrice: Number((unitDiscount * qty).toFixed(2)),
          thumbnail: item.thumbnail || (item.images && item.images[0]) || '',
        });
      }

      recalculateCart(state.data);
      saveSessionCart(state.data);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      if (!state.data || !Array.isArray(state.data.products)) return;
      state.data.products = state.data.products.filter((p: any) => p.id !== action.payload);
      recalculateCart(state.data);
      saveSessionCart(state.data);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      if (!state.data || !Array.isArray(state.data.products)) return;
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.data.products = state.data.products.filter((p: any) => p.id !== id);
      } else {
        const existing = state.data.products.find((p: any) => p.id === id);
        if (existing) {
          existing.quantity = quantity;
          existing.total = Number((Number(existing.price || 0) * quantity).toFixed(2));
          const unitDiscount = existing.discountPercentage && existing.discountPercentage > 0
            ? Number((Number(existing.price || 0) * (1 - existing.discountPercentage / 100)).toFixed(2))
            : Number(existing.price || 0);
          existing.discountedPrice = Number((unitDiscount * quantity).toFixed(2));
        }
      }
      recalculateCart(state.data);
      saveSessionCart(state.data);
    },
    clearCart: (state) => {
      state.data = {
        id: 1,
        products: [],
        total: 0,
        discountedTotal: 0,
        userId: 1,
        totalProducts: 0,
        totalQuantity: 0,
      };
      saveSessionCart(null);
    },
    resetCart: (state) => {
      state.data = {
        id: 1,
        products: [],
        total: 0,
        discountedTotal: 0,
        userId: 1,
        totalProducts: 0,
        totalQuantity: 0,
      };
      saveSessionCart(null);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(addCart.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(updateQualityProduct.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.data = action.payload.data;
        }
      });
  },
});

export const {
  initCartFromSession,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
