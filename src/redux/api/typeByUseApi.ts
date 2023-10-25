import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';
import { MutationResponse } from '../../types/response.ts/MutationResponse';
import { PositionForm } from '../../pages/type-by-use/CreateType';

export const typeByUseApi = createApi({
  reducerPath: 'typeByUseApi',
  baseQuery: defaultFetchBaseQuery,
  endpoints: (builder) => ({
    getTypes: builder.query<any,void>({
      query: () => `type-by-uses`,
    }),

    createType: builder.mutation<MutationResponse, PositionForm>({
      query: (data: any) => ({
        url: 'type-by-uses',
        method: 'POST',
        body: data
      }),
       transformResponse: (rawResult: MutationResponse) => {
        return rawResult
      },
    })

  }),
});

export const {
  useGetTypesQuery,
  useCreateTypeMutation
} = typeByUseApi;