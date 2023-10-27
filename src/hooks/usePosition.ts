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
            state: { PositionData: response.data.data }
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

const useCreatePosition = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: PositionForm) => {
      return await axiosClient.post(API_POSITION, data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('positions', { refetchInactive: true })
        navigate('/positions')
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })  
      }
      else {
          enqueueSnackbar(response.data.errorMesage, {
            autoHideDuration: 3000,
            variant: 'error'
          }) 
      }
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Error here ',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  )
}

const useUpdatePosition = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: PositionEditForm) => {
      return await axiosClient.put(pathToUrl(API_POSITION_WITH_ID, { positionId: data.id }), data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('positions', { refetchInactive: true })
        navigate('/positions')
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })  
      }
      else {
          enqueueSnackbar(response.data.errorMesage, {
            autoHideDuration: 3000,
            variant: 'error'
          }) 
      }
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Error here.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  ) 
}

const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (positionId: string) => {
      return await axiosClient.delete(pathToUrl(API_POSITION_WITH_ID, { positionId }))
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('positions', { refetchInactive: true })
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })  
      }
      else {
          enqueueSnackbar(response.data.errorMesage, {
            autoHideDuration: 3000,
            variant: 'error'
          }) 
      }
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Error here.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  ) 
}

export {
  useGetPositions,
  useGetPosition,
  useCreatePosition,
  useUpdatePosition,
  useDeletePosition
}