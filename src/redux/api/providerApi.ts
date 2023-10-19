import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getProviders: builder.query({
      query: () => `providers`,
    }),
  }),
});

export const { useGetProvidersQuery } = providerApi;