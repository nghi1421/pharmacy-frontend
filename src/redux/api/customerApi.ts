import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => `customers`,
    }),
  }),
});

export const { useGetCustomersQuery } = customerApi;