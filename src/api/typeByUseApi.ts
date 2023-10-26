import { API_TYPE_BY_USE, API_TYPE_BY_USE_WITH_ID } from '../utils/constants';
import { pathToUrl } from '../utils/path';
import { TypeByUseForm } from '../pages/type-by-use/CreateType';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosClient from '../services/axios';
import { enqueueSnackbar } from 'notistack';
import { TypeByUse } from '../types/TypeByUse';
import { formatDateTime } from '../utils/format';
import { useNavigate } from 'react-router-dom';

function createData({id, name, detail, createdAt, updatedAt}: TypeByUse) {
    return {
        id, name, detail, 
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

const useGetTypeByUses = () => {
  return useQuery({
    queryKey: ['type-by-uses'],
    queryFn: () => axiosClient
      .get(API_TYPE_BY_USE)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((type: TypeByUse) => createData(type))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

const useGetTypeByUse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (typeId: string) => axiosClient
      .get(pathToUrl(API_TYPE_BY_USE_WITH_ID, { typeId }))
      .then((response) => {
        navigate( `/type-by-uses/${typeId}/edit`,
          {
            state: { typeByUseData: response.data.data }
          }
        )

        if (response.data.message) {
          return response.data.data
        }
        else {
          queryClient.invalidateQueries('type-by-uses', { refetchInactive: true })
        }
      }),
  })
}

const useCreateTypeByUse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: TypeByUseForm) => {
      return await axiosClient.post(API_TYPE_BY_USE, data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('type-by-uses', { refetchInactive: true })
        navigate('/type-by-uses')
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })  
      }
      else {
          enqueueSnackbar(response.data.errorMesage, {
            autoHideDuration: 3000,
            variant: 'success'
          }) 
      }
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('That bai roi thang lon',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  )
}

export {
  useGetTypeByUses,
  useGetTypeByUse,
  useCreateTypeByUse
}