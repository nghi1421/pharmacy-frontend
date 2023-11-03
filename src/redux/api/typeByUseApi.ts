import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultFetchBaseQuery } from './defaultFetchBaseQuery';
import { MutationResponse } from '../../types/response/MutationResponse';
import { TypeByUseForm } from '../../pages/type-by-use/CreateType';

export const typeByUseApi = createApi({
  reducerPath: 'typeByUseApi',
  baseQuery: defaultFetchBaseQuery,
  tagTypes: ['TypeByUse'],
  endpoints: (builder) => ({
    getTypes: builder.query<any,void>({
      query: () => `type-by-uses`,
      providesTags: ["TypeByUse"]
    }),

    getType: builder.query<MutationResponse, string>({
      query: (typeId) => `type-by-uses/${typeId}`,
    }),

    createType: builder.mutation<MutationResponse, TypeByUseForm>({
      query: (data: any) => ({
        url: 'type-by-uses',
        method: 'POST',
        body: data
      }),
       transformResponse: (rawResult: MutationResponse) => {
        return rawResult
      },
      invalidatesTags: ["TypeByUse"]
    }),

    updateType: builder.mutation<MutationResponse, TypeByUseForm>({
      query: (data) => ({
        url: `type-by-uses/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    })

  }),
});

export const {
  useGetTypesQuery,
  useGetTypeQuery,
  // useLazyTypeQuery,
  useCreateTypeMutation
} = typeByUseApi;