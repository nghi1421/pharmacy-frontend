import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_PROVIDER } from '../utils/constants';
import { useQuery } from 'react-query';
import {  formatDateTime } from '../utils/format';
import { Provider } from '../types/Provider';

function createData({id, name, address, createdAt, updatedAt, phoneNumber, email}: Provider) {
    return {
        id, name, phoneNumber, email, address,
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

const useGetProviders = () => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: () => axiosClient
      .get(API_PROVIDER)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((provider: Provider) => createData(provider))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

export {
    useGetProviders
}