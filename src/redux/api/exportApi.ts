import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const exportApi = createApi({
  reducerPath: 'exportApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getExports: builder.query<any,void>({
      query: () => `exports`,
    }),
  }),
});

export const { useGetExportsQuery } = exportApi;