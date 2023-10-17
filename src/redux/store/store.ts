import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit'
import counterReducer from '../countSlice';
import authSlice from '../authSlice';

// export const store = configureStore({ reducer: rootReducer })
export const store = configureStore({
  reducer: {
    counter: counterReducer,
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