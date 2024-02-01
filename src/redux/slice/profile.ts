import { Profile, ProfileData } from '@/types/profileType';
import { api } from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Sign } from 'crypto';

const initialState: ProfileData = {
  isLoading: {},
  hasErr: {},
  data: null,
};
export const signIn = createAsyncThunk('auth/login', async (body: any) => {
  const res: any = await api.post('auth/login', body);
  return res;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading[signIn.typePrefix] = true;
        state.hasErr[signIn.typePrefix] = undefined;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading[signIn.typePrefix] = false;
        state.hasErr[signIn.typePrefix] = undefined;
        state.data = action.payload.data;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.hasErr[signIn.typePrefix] = action.error.message;
        state.isLoading[signIn.typePrefix] = false;
      });
  },
});
export const { signOut } = authSlice.actions;
export default authSlice.reducer;
