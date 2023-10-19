import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const positionApi = createApi({
  reducerPath: 'positionApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getPositions: builder.query<any,void>({
      query: () => `positions`,
    }),
  }),
});

export const { useGetPositionsQuery } = positionApi;