import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const importApi = createApi({
  reducerPath: 'importApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getImports: builder.query<any,void>({
      query: () => `imports`,
    }),
  }),
});

export const { useGetImportsQuery } = importApi;