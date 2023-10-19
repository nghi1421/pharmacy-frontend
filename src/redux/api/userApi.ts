import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<any,void>({
      query: () => `users`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;