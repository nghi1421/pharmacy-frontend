import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getCustomers: builder.query<any,void>({
      query: () => `customers`,
    }),
  }),
});

export const { useGetCustomersQuery } = customerApi;