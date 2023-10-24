import { createApi } from '@reduxjs/toolkit/query/react';
import { deFaultFetchBaseQuery } from './defaultFetchBaseQuery';
import { MutationResponse } from '../../types/response.ts/MutationResponse';

export const typeByUseApi = createApi({
  reducerPath: 'typeByUseApi',
  baseQuery: deFaultFetchBaseQuery,
  endpoints: (builder) => ({
    getTypes: builder.query<any,void>({
      query: () => `type-by-uses`,
    }),

    createType: builder.mutation<MutationResponse, void>({
      query: (data: any) => ({
        url: 'type-by-uses',
        method: 'POST',
        body: data
      })
    })
    
  }),
});

export const {
  useGetTypesQuery,
  useCreateTypeMutation
} = typeByUseApi;