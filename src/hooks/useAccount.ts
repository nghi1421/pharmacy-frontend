import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_USER } from '../utils/constants';
import { useQuery } from 'react-query';
import { formatDateTime } from '../utils/format';
import { User } from '../types/User';

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

const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => axiosClient
      .get(API_USER)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((user: User) => createData(user))
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
    useGetUsers
}