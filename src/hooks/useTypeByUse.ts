import { API_TYPE_BY_USE, API_TYPE_BY_USE_WITH_ID } from '../utils/constants';
import { pathToUrl } from '../utils/path';
import { TypeByUseForm } from '../pages/type-by-use/CreateType';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosClient from '../services/axios';
import { enqueueSnackbar } from 'notistack';
import { TypeByUse } from '../types/TypeByUse';
import { formatDateTime } from '../utils/format';
import { useNavigate } from 'react-router-dom';
import { TypeByUseEditForm } from '../pages/type-by-use/EditType';
import { defaultCatchErrorHandle, defaultOnSuccessHandle, updateSearchParams } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';
import { Query } from '../types/Query';
import { DataMetaResponse } from '../types/response/DataResponse';

function createData({id, name, detail, createdAt, updatedAt}: TypeByUse) {
    return {
        id, name, detail, 
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

const useGetTypeByUses = (query: Query) => {
  const queryParams = updateSearchParams(query)

  return useQuery({
    queryKey: ['type-by-uses', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_TYPE_BY_USE}?${queryParams.toString()}`)
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
          return {
            data: response.data.data.map((type: TypeByUse) => createData(type)),
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

const useGetDataTypeByUses = () => {
  return useQuery({
    queryKey: ['type-by-uses'],
    queryFn: () => axiosClient
      .get(API_TYPE_BY_USE)
      .then((response)=> {
        if (response.data.message) {
          return response.data.data.map((type: TypeByUse) => createData(type))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      }),
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

const useCreateTypeByUse = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: TypeByUseForm) => {
      return await axiosClient.post(API_TYPE_BY_USE, data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'type-by-uses', '/type-by-uses')
    }
  })
}

const useUpdateTypeByUse = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: TypeByUseEditForm) => {
      return await axiosClient.put(pathToUrl(API_TYPE_BY_USE_WITH_ID, { typeId: data.id }), data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'type-by-uses', '/type-by-uses')
    }
  }) 
}

const useDeleteTypeByUse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (typeId: string) => {
      return await axiosClient.delete(pathToUrl(API_TYPE_BY_USE_WITH_ID, { typeId }))
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'type-by-uses', '/type-by-uses')
    }
  }) 
}

export {
  useGetTypeByUses,
  useGetDataTypeByUses,
  useGetTypeByUse,
  useCreateTypeByUse,
  useUpdateTypeByUse,
  useDeleteTypeByUse
}