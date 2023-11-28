import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_USER } from '../utils/constants';
import { useQuery } from 'react-query';
import { formatDateTime } from '../utils/format';
import { User } from '../types/User';
import { DataMetaResponse } from '../types/response/DataResponse';
import { Query } from '../types/Query';
import { updateSearchParams } from '../utils/helper';
import { getAccessToken } from '../store/auth';
import { AxiosHeaders } from 'axios';

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
        // console.log(error.response.status)
        // console.log('Error here',error.response.status)
      }) ,
    enabled: !!queryParams.toString()
  })
};

export {
    useGetUsers
}