import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const drugCategoryApi = createApi({
  reducerPath: 'drugCategoryApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getDrugs: builder.query<any,void>({
      query: () => `drug-categories`,
    }),
  }),
});

export const { useGetDrugsQuery } = drugCategoryApi;