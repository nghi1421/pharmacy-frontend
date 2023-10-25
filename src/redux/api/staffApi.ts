import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';

export const staffApi = createApi({
  reducerPath: 'staffApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getStaffs: builder.query<any,void>({
      query: () => `staffs`,
    }),
  }),
});

export const { useGetStaffsQuery } = staffApi;