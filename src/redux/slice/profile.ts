import { Profile } from '@/types/profileType';
import { api } from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Sign } from 'crypto';
// type State = {
//   isLoading: boolean;
//     hasErr: boolean;
//     data:Profile
// };
const initialState = {
  isLoading: false,
    hasErr: false,
    data:{}
};
export const SignIn = createAsyncThunk('/auth/login', async (body: any) => {
    const res: any = await api.post('auth/login', body);
    return res;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
    reducers: {
        signOut: (state) => {
            state.data = {}
      }
  },
  extraReducers(builder) {
    builder
      .addCase(SignIn.pending, (state) => {
        state.isLoading = true;
        state.hasErr = false;
      })
      .addCase(SignIn.fulfilled, (state,action) => {
        state.isLoading = false;
          state.hasErr = false;
          state.data = action.payload.data
      })
      .addCase(SignIn.rejected, (state) => {
        state.hasErr = true;
        state.isLoading = false;
      });
  },
});
export const signOut =  authSlice.caseReducers.signOut
export default authSlice.reducer;
