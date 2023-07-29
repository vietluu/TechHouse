import { cart, cartAdd, product } from '@/types/productType';
import { Profile } from '@/types/profileType';
import { api } from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: cart = {
  isLoading: false,
  hasErr: false,
  data: null,
};
export const getCart = createAsyncThunk('cart/get', async (id: Number) => {
  const res: any = await api.get(`https://dummyjson.com/carts/user/${id}`);
  return res;
});
export const addCart = createAsyncThunk('cart/add', async (body: cartAdd) => {
  const res: any = await api.post(`https://dummyjson.com/carts/add`, body);
  return res;
});

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
        state.data = action.payload.data;
      })
      .addCase(getCart.rejected, (state) => {
        state.hasErr = true;
        state.isLoading = false;
      })
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
        state.hasErr = false;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasErr = false;
      })
      .addCase(addCart.rejected, (state) => {
        state.hasErr = true;
        state.isLoading = false;
      });
  },
});
export default cartSlice.reducer;
