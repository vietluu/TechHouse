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
  isLoading: {},
  hasErr: {},
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
  reducers: {
    resetCart: (state) => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading[getCart.typePrefix] = true;
        state.hasErr[getCart.typePrefix] = undefined;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading[getCart.typePrefix] = false;
        state.hasErr[getCart.typePrefix] = undefined;
        state.data = action.payload.data?.carts[0] || null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.hasErr[getCart.typePrefix] = action.error.message;
        state.isLoading[getCart.typePrefix] = false;
        state.data = null;
      })
      .addCase(updateQualityProduct.pending, (state) => {
        state.isLoading[updateQualityProduct.typePrefix] = true;
        state.hasErr[updateQualityProduct.typePrefix] = undefined;
      })
      .addCase(updateQualityProduct.fulfilled, (state, action) => {
        state.isLoading[updateQualityProduct.typePrefix] = false;
        state.hasErr[updateQualityProduct.typePrefix] = undefined;
        state.data = action.payload.data;
      })
      .addCase(updateQualityProduct.rejected, (state, action) => {
        state.hasErr[updateQualityProduct.typePrefix] = action.error.message;
        state.isLoading[updateQualityProduct.typePrefix] = false;
        state.data = null;
      })
      .addCase(addCart.pending, (state) => {
        state.isLoading[addCart.typePrefix] = true;
        state.hasErr[addCart.typePrefix] = undefined;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading[addCart.typePrefix] = false;
        state.hasErr[addCart.typePrefix] = undefined;
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
      .addCase(addCart.rejected, (state, action) => {
        state.hasErr[addCart.typePrefix] = action.error.message;
        state.isLoading[addCart.typePrefix] = false;
      });
  },
});
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
