import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const positionApi = createApi({
  reducerPath: 'positionApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getPositions: builder.query<any,void>({
      query: () => `positions`,
    }),
  }),
});

export const { useGetPositionsQuery } = positionApi;