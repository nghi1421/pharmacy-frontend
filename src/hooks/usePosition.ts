import { API_POSITION, API_POSITION_WITH_ID } from '../utils/constants';
import { pathToUrl } from '../utils/path';
import { PositionForm } from '../pages/position/CreatePosition';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosClient from '../services/axios';
import { enqueueSnackbar } from 'notistack';
import { Position } from '../types/Position';
import { formatDateTime } from '../utils/format';
import { useNavigate } from 'react-router-dom';
import { PositionEditForm } from '../pages/position/EditPosition';
import { defaultCatchErrorHandle, defaultOnSuccessHandle } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';

function createData({id, name, createdAt, updatedAt}: Position) {
    return {
        id, name,
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

const useGetPositions = () => {
  return useQuery({
    queryKey: ['positions'],
    queryFn: () => axiosClient
      .get(API_POSITION)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((position: Position) => createData(position))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

const useGetPosition = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (positionId: string) => axiosClient
      .get(pathToUrl(API_POSITION_WITH_ID, { positionId }))
      .then((response) => {
        navigate( `/positions/${positionId}/edit`,
          {
            state: { positionData: response.data.data }
          }
        )

        if (response.data.message) {
          return response.data.data
        }
        else {
          queryClient.invalidateQueries('positions', { refetchInactive: true })
        }
      }),
  })
}

const useCreatePosition = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: PositionForm) => {
      return await axiosClient.post(API_POSITION, data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'positions', '/positions')
    }
  })
}

const useUpdatePosition = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: PositionEditForm) => {
      return await axiosClient.put(pathToUrl(API_POSITION_WITH_ID, { positionId: data.id }), data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'positions', '/positions')
    }
  }) 
}

const useDeletePosition = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async (positionId: string) => {
      return await axiosClient.delete(pathToUrl(API_POSITION_WITH_ID, { positionId }))
    .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'positions', '/positions')
    }
  }) 
}

export {
  useGetPositions,
  useGetPosition,
  useCreatePosition,
  useUpdatePosition,
  useDeletePosition
}