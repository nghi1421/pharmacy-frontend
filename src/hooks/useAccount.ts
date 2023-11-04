import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_USER } from '../utils/constants';
import { useQuery } from 'react-query';
import { formatDateTime } from '../utils/format';
import { User } from '../types/User';
import { DataMetaResponse } from '../types/response/DataResponse';
import { Query } from '../types/Query';

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
  const queryParams = new URLSearchParams();
  queryParams.set('page', query.page.toString())
  queryParams.set('perPage', query.perPage.toString())
  queryParams.set('orderBy', query.orderBy)
  queryParams.set('orderDirection', query.orderDirection)
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
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })

        return undefined
      }),
    enabled: !!queryParams.toString()
  })
};

export {
    useGetUsers
}