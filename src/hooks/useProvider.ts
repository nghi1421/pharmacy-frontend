import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_PROVIDER, API_PROVIDER_WITH_ID } from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {  formatDateTime } from '../utils/format';
import { Provider } from '../types/Provider';
import { pathToUrl } from '../utils/path';
import { useNavigate } from 'react-router-dom';
import { ProviderForm } from '../pages/provider/CreateProvider';
import { ProviderEditForm } from '../pages/provider/EditProvider';

function createData({id, name, address, createdAt, updatedAt, phoneNumber, email}: Provider) {
    return {
        id, name, phoneNumber, email, address,
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

function createDataForAutocomplete({id, name, address, phoneNumber, email}: Provider) {
    return {
        id, label: name, phoneNumber, email, address,
    };
}

const useGetProviders = (option: number = 1) => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: () => axiosClient
      .get(API_PROVIDER)
      .then((response) => {
        if (response.data.message) {
          switch (option) {
            case 1: 
              return response.data.data.map((provider: Provider) => createData(provider))
            case 2: 
              return response.data.data.map((provider: Provider) => createDataForAutocomplete(provider))
            default: response.data.data
          }
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

const useGetProvider = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (providerId: string) => axiosClient
      .get(pathToUrl(API_PROVIDER_WITH_ID, { providerId }))
      .then((response) => {
        navigate( `/providers/${providerId}/edit`,
          {
            state: { providerData: response.data.data }
          }
        )

        if (response.data.message) {
          return response.data.data
        }
        else {
          queryClient.invalidateQueries('providers', { refetchInactive: true })
        }
      }),
  })
}

const useCreateProvider = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ProviderForm) => {
      return await axiosClient.post(API_PROVIDER, data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('providers', { refetchInactive: true })
        navigate('/providers')
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })  
      }
      else {
          enqueueSnackbar(response.data.errorMessage, {
            autoHideDuration: 3000,
            variant: 'error'
          }) 
      }
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  )
}

const useUpdateProvider = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ProviderEditForm) => {
      return await axiosClient.put(pathToUrl(API_PROVIDER_WITH_ID, { providerId: data.id }), data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('providers', { refetchInactive: true })
        navigate('/providers')
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })  
      }
      else {
          enqueueSnackbar(response.data.errorMessage, {
            autoHideDuration: 3000,
            variant: 'error'
          }) 
      }
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  ) 
}

const useDeleteProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (providerId: string) => {
      return await axiosClient.delete(pathToUrl(API_PROVIDER_WITH_ID, { providerId }))
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('providers', { refetchInactive: true })
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })  
      }
      else {
          enqueueSnackbar(response.data.errorMessage, {
            autoHideDuration: 3000,
            variant: 'error'
          }) 
      }
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  ) 
}


export {
  useGetProviders,
  useGetProvider,
  useCreateProvider,
  useUpdateProvider,
  useDeleteProvider
}