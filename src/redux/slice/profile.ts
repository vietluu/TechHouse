import { Profile, ProfileData } from '@/types/profileType';
import { api } from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Sign } from 'crypto';

const initialState: ProfileData = {
  isLoading: false,
  hasErr: false,
  data: null,
};
export const signIn = createAsyncThunk('/auth/login', async (body: any) => {
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
        state.isLoading = true;
        state.hasErr = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasErr = false;
        state.data = action.payload.data;
      })
      .addCase(signIn.rejected, (state) => {
        state.hasErr = true;
        state.isLoading = false;
      });
  },
});
export const { signOut } = authSlice.actions;
export default authSlice.reducer;
