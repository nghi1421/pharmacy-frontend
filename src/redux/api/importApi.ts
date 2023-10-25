import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const importApi = createApi({
  reducerPath: 'importApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getImports: builder.query<any,void>({
      query: () => `imports`,
    }),
  }),
});

export const { useGetImportsQuery } = importApi;