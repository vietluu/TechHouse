import {
  Listproduct,
  cart,
  cartAdd,
  product,
  productDetailCartType,
} from '@/types/productType';
import { Profile } from '@/types/profileType';
import { api } from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: cart = {
  isLoading: false,
  hasErr: false,
  data: null,
};
type productUpdateType = {
  cartId: number;
  data: {
    merge: boolean;
    products: [{ id: number; quantity: number }];
  };
};

export const getCart = createAsyncThunk('cart/get', async (id: Number) => {
  const res: any = await api.get(`https://dummyjson.com/carts/user/${id}`);
  return res;
});
export const addCart = createAsyncThunk('cart/add', async (body: cartAdd) => {
  const res: any = await api.post(`https://dummyjson.com/carts/add`, body);
  return res;
});
export const updateQualityProduct = createAsyncThunk(
  'cart/update',
  async (body: productUpdateType) => {
    console.log('cart', body.cartId);
    const res = await api.put(
      `https://dummyjson.com/carts/${body.cartId}`,
      body.data
    );
    return res;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.hasErr = false;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasErr = false;
        state.data = action.payload.data.carts[0];
      })
      .addCase(getCart.rejected, (state) => {
        state.hasErr = true;
        state.isLoading = false;
        state.data = null;
      })
      .addCase(updateQualityProduct.pending, (state) => {
        state.isLoading = true;
        state.hasErr = false;
      })
      .addCase(updateQualityProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasErr = false;
        state.data = action.payload.data;
      })
      .addCase(updateQualityProduct.rejected, (state) => {
        state.hasErr = true;
        state.isLoading = false;
        state.data = null;
      })
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
        state.hasErr = false;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasErr = false;
        action.payload.data.products.map((e: any) => {
          state.data?.products.map((x: any) => {
            if (x.id == e.id) {
              x.quantity += e.quantity;
            }
          });
          if (
            state.data?.products.filter((x: any) => x.id == e.id).length < 1
          ) {
            state.data?.products.push(e);
            state.data.totalProducts = state.data?.totalProducts + 1;
          }
        });
      })
      .addCase(addCart.rejected, (state) => {
        state.hasErr = true;
        state.isLoading = false;
      });
  },
});
export default cartSlice.reducer;
