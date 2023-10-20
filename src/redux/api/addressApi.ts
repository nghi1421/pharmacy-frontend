import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addressApiUrl } from '../../config/config';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({ baseUrl: addressApiUrl }),
  endpoints: (builder) => ({
    getProvinces: builder.query<any,void>({
      query: () => `provinces/getAll?limit=-1`,
    }), 
    getDistricts: builder.query<any,void>({
      query: () => `districts/getAll?limit=-1`,
    }),
    getDistrictsByProvince: builder.query<any,number>({
      query: (provinceCode) => `districts/getByProvince?provinceCode=${provinceCode}&limit=-1`,
    }),
    getWards: builder.query<any,void>({
      query: () => `wards/getAll?limit=-1`,
    }),
    getWardsByDistrict: builder.query<any,number>({
      query: (districtCode) => `wards/getByDistrict?districtCode=${districtCode}&limit=-1`,
    }),

  }),
});

export const {
    useGetProvincesQuery,
    useGetDistrictsQuery,
    useGetDistrictsByProvinceQuery,
    useGetWardsQuery,
    useGetWardsByDistrictQuery
} = addressApi;