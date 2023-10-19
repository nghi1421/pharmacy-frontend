import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice';
import { userApi } from '../api/userApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { staffApi } from '../api/staffApi';
import { customerApi } from '../api/customerApi';
import { providerApi } from '../api/providerApi';
import { drugCategoryApi } from '../api/drugCategoryApi';
import { importApi } from '../api/importApi';
import { exportApi } from '../api/exportApi';
import { positionApi } from '../api/positionApi';

export const store = configureStore({
  reducer: {
    login: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [providerApi.reducerPath]: providerApi.reducer,
    [positionApi.reducerPath]: positionApi.reducer,
    [drugCategoryApi.reducerPath]: drugCategoryApi.reducer,
    [importApi.reducerPath]: importApi.reducer,
    [exportApi.reducerPath]: exportApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(staffApi.middleware)
      .concat(customerApi.middleware)
      .concat(providerApi.middleware)
      .concat(positionApi.middleware)
      .concat(drugCategoryApi.middleware)
      .concat(importApi.middleware)
      .concat(exportApi.middleware)
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;