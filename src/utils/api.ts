import axiosClient from '../services/axios';
import Cookies from 'js-cookie';

export const api = {
  get: <T>(url: string, params?: object) =>
    axiosClient.get<T>(url, {
      headers: {
        token: Cookies.get('token'),
      },
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axiosClient.post<T>(url, data, {
      headers: {
        token: Cookies.get('token'),
      },
    }),
  patch: <T>(url: string, data: any) =>
    axiosClient.patch<T>(url, data, {
      headers: {
        token: Cookies.get('token'),
      },
    }),
  delete: <T>(url: string) =>
    axiosClient.delete<T>(url, {
      headers: {
        token: Cookies.get('token'),
      },
    }),
};