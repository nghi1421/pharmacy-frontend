import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_RESET_PASSWORD, API_USER, API_USER_WITH_ID } from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatDateTime } from '../utils/format';
import { User } from '../types/User';
import { DataMetaResponse } from '../types/response/DataResponse';
import { Query } from '../types/Query';
import { defaultCatchErrorHandle, defaultOnSuccessHandle, updateSearchParams } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../utils/path';

function createData({
  id,
  username,
  role,
  createdAt,
  updatedAt }: User
) {
  return {
    id, username,
    role: role.name,
    createdAt: formatDateTime(createdAt),
    updatedAt: formatDateTime(updatedAt),
  };
}

const useGetUsers = (query: Query) => {
  const queryParams = updateSearchParams(query)

  return useQuery({
    queryKey: ['users', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_USER}?${queryParams.toString()}`)
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
          return {
            data: response.data.data.map((user: User) => createData(user)),
            meta: response.data.meta
          }
        }

        return undefined
      })
      .catch(error => {

      }),
    enabled: !!queryParams.toString()
  })
};

const useCreateAccount = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return await axiosClient.post(API_USER, data)
        .then(response => {
          if (response.data.message) {
            queryClient.invalidateQueries('users', { refetchInactive: true })
            queryClient.invalidateQueries('staffs', { refetchInactive: true })
            enqueueSnackbar(response.data.message, {
              autoHideDuration: 3000,
              variant: 'success'
            })
          }
          return response
        })
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        })
    }
  })
}

const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await axiosClient.delete(pathToUrl(API_USER_WITH_ID, { userId }))
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error)
        })
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'users', '/admin/users')
    }
  })
}

const useResetPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await axiosClient.post(pathToUrl(API_RESET_PASSWORD, { userId }))
        .then(response => response)
        .catch(error => {
          console.log(error.response)
          defaultCatchErrorHandle(error)
        })
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'users', '/admin/users')
    }
  })
}

export {
  useGetUsers,
  useCreateAccount,
  useDeleteAccount,
  useResetPassword
}