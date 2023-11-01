import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_STAFF, API_STAFF_UPDATE_STATUS, API_STAFF_WITH_ID } from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatDate } from '../utils/format';
import { GenderEnum } from '../types/GenderEnum';
import { Staff } from '../types/Staff';
import { pathToUrl } from '../utils/path';
import { useNavigate } from 'react-router-dom';
import { StaffForm } from '../pages/staff/CreateStaff';
import { StaffEditForm } from '../pages/staff/EditStaff';
import { defaultCatchErrorHandle, defaultOnSuccessHandle } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';

function createData({id, name, gender, dob, phoneNumber, email, isWorking, position}: Staff) {
    return {
        id, name, phoneNumber, position,
        gender: GenderEnum[gender],
        positionName: position.name,
        email,
        dob: formatDate(dob),
        status: isWorking,
        isWorking: isWorking ? '✔️' : '❌'
    };
}

const useGetStaffs = () => {
  return useQuery({
    queryKey: ['staffs'],
    queryFn: () => axiosClient
      .get(API_STAFF)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((staff: Staff) => createData(staff))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

const useGetStaff = (option: number = 1) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (staffId: string) => axiosClient
      .get(pathToUrl(API_STAFF_WITH_ID, { staffId }))
      .then((response) => {
        switch (option) {
          case 1: {
            navigate( `/staffs/${staffId}/edit`,
              {
                state: { staffData: response.data.data }
              }
            )

            if (response.data.message) {
              return response.data.data
            }
            else {
              queryClient.invalidateQueries('staffs', { refetchInactive: true })
            }
            break;
          }
            
          case 2: {
              if (response.data.message) {
                return response.data.data
              }
              else {
                queryClient.invalidateQueries('staffs', { refetchInactive: true })
            } 
            break;
          }
        }

        return {}
      }),
  })
}

const useCreateStaff = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: StaffForm) => {
      return await axiosClient.post(API_STAFF, data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'staffs', '/staffs')
    }
  })
}

const useUpdateStaff =
  (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: StaffEditForm) => {
      return await axiosClient.put(pathToUrl(API_STAFF_WITH_ID, { staffId: data.id }), data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate,response, 'staffs', '/staffs')
    }
  }) 
}

const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (staffId: string) => {
      return await axiosClient.delete(pathToUrl(API_STAFF_WITH_ID, { staffId }))
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'staffs', '/staffs')
    }
  }) 
}

const useUpdateStaffStatus = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (staffId: string) => {
      return await axiosClient
        .post(pathToUrl(API_STAFF_UPDATE_STATUS, { staffId }))
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'staffs', '/staffs')
    }
  }) 
}

export {
  useGetStaffs,
  useGetStaff,
  useUpdateStaffStatus,
  useCreateStaff,
  useUpdateStaff,
  useDeleteStaff,
}