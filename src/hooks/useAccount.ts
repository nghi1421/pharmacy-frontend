import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_STAFF, API_USER } from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatDateTime } from '../utils/format';
import { User } from '../types/User';
import { DataMetaResponse } from '../types/response/DataResponse';
import { Query } from '../types/Query';
import { defaultCatchErrorHandle, defaultOnSuccessHandle, updateSearchParams } from '../utils/helper';
import { getAccessToken } from '../store/auth';
import { AxiosHeaders } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { GrandAccountForm } from '../pages/staff/GrantAccount';

function createData({
    id,
    username,
    role, 
    createdAt,
    updatedAt}: User
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
  const headers = new AxiosHeaders({
    'Authorization':  `Bearer ${getAccessToken()}`,
  });
  return useQuery({
    queryKey: ['users', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_USER}?${queryParams.toString()}`, { headers })
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
          return {
            data: response.data.data.map((user: User) => createData(user)),
            meta: response.data.meta
          }
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })

        return undefined
      })
      .catch(error => {

      }) ,
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
        })
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    }
  })
}

export {
  useGetUsers,
  useCreateAccount
}