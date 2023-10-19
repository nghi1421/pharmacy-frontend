import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const staffApi = createApi({
  reducerPath: 'staffApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getStaffs: builder.query({
      query: () => `staffs`,
    }),
  }),
});

export const { useGetStaffsQuery } = staffApi;