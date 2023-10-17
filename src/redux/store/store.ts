import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    login: authSlice
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;