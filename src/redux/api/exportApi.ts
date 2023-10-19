import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const exportApi = createApi({
  reducerPath: 'exportApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getExports: builder.query<any,void>({
      query: () => `exports`,
    }),
  }),
});

export const { useGetExportsQuery } = exportApi;