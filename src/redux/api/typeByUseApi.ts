import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const typeByUseApi = createApi({
  reducerPath: 'typeByUseApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getTypes: builder.query<any,void>({
      query: () => `type-by-uses`,
    }),
  }),
});

export const { useGetTypesQuery } = typeByUseApi;