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
import { defaultCatchErrorHandle, defaultOnSuccessHandle, updateSearchParams } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';
import { Query } from '../types/Query';
import { DataMetaResponse } from '../types/response/DataResponse';
import { handleAddress } from '../utils/address';

function createData({id, name, address, createdAt, updatedAt, phoneNumber, email}: Provider) {
    return {
      id, name, phoneNumber, email,
        address: handleAddress(address),
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

function createDataForAutocomplete({id, name, address, phoneNumber, email}: Provider) {
    return {
        id, label: name, phoneNumber, email, address: handleAddress(address),
    };
}

const useGetProviders = (query: Query) => {
  const queryParams = updateSearchParams(query)

  return useQuery({
    queryKey: ['providers', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_PROVIDER}?${queryParams.toString()}`)
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
            return {
              data: response.data.data.map((provider: Provider) => createData(provider)),
              meta: response.data.meta
            }
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return undefined
      }),
    enabled: !!queryParams.toString()
  })
};

const useGetDataProviders = () => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: () => axiosClient
      .get(API_PROVIDER)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((provider: Provider) => createDataForAutocomplete(provider))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
}

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

const useCreateProvider = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ProviderForm) => {
      return await axiosClient.post(API_PROVIDER, data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        })
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'providers', '/providers')
    }
  })
}

const useUpdateProvider = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ProviderEditForm) => {
      return await axiosClient.put(pathToUrl(API_PROVIDER_WITH_ID, { providerId: data.id }), data)
          .then(response => response)
          .catch(error => {
            defaultCatchErrorHandle(error, setError)
          })
      },
      onSuccess: (response: any) => {
        defaultOnSuccessHandle(queryClient, navigate, response, 'providers', '/providers')
      }
  }) 
}

const useDeleteProvider = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (providerId: string) => {
      return await axiosClient.delete(pathToUrl(API_PROVIDER_WITH_ID, { providerId }))
          .then(response => response)
          .catch(error => {
            defaultCatchErrorHandle(error)
          })
      },
      onSuccess: (response: any) => {
        defaultOnSuccessHandle(queryClient, navigate, response, 'providers', '/providers')
      }
  }
  ) 
}


export {
  useGetProviders,
  useGetDataProviders,
  useGetProvider,
  useCreateProvider,
  useUpdateProvider,
  useDeleteProvider
}