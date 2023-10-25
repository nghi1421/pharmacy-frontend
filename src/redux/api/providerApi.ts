import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getProviders: builder.query<any,void>({
      query: () => `providers`,
    }),
  }),
});

export const { useGetProvidersQuery } = providerApi;