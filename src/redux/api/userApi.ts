import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<any,void>({
      query: () => `users`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;