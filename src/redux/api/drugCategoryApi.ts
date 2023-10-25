import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const drugCategoryApi = createApi({
  reducerPath: 'drugCategoryApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getDrugs: builder.query<any,void>({
      query: () => `drug-categories`,
    }),
  }),
});

export const { useGetDrugsQuery } = drugCategoryApi;