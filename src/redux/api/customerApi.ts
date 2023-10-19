import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getCustomers: builder.query<any,void>({
      query: () => `customers`,
    }),
  }),
});

export const { useGetCustomersQuery } = customerApi;