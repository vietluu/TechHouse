import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slice/profile';
import CartSlice from './slice/cartSlice';
export const store = configureStore({
  reducer: {
    AuthSlice,
    CartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
