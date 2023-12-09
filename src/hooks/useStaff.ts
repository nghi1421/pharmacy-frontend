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
import { defaultCatchErrorHandle, defaultOnSuccessHandle, updateSearchParams } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';
import { Query } from '../types/Query';
import { DataMetaResponse } from '../types/response/DataResponse';

function createData({id, name, gender, dob, phoneNumber, email, isWorking, position, user}: Staff) {
    return {
        id, name, phoneNumber, position,
        gender: GenderEnum[gender],
        positionName: position.name,
        email,
        dob: formatDate(dob),
        status: isWorking,
        isWorking: isWorking ? '✔️' : '❌',
        user: user ? true : false
    };
}

const useGetStaffs = (query: Query) => {
  const queryParams = updateSearchParams(query)
  
  return useQuery({
    queryKey: ['staffs', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_STAFF}?${queryParams.toString()}`)
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
          return {
            data: response.data.data.map((staff: Staff) => createData(staff)),
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

const useGetStaff = (option: number = 1) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (staffId: string) => axiosClient
      .get(pathToUrl(API_STAFF_WITH_ID, { staffId }))
      .then((response) => {
        switch (option) {
          case 1: {
            navigate( `/admin/staffs/${staffId}/edit`,
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
      defaultOnSuccessHandle(queryClient, navigate, response, 'staffs', '/admin/staffs')
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
      defaultOnSuccessHandle(queryClient, navigate,response, 'staffs', '/admin/staffs')
    }
  }) 
}

const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (staffId: string) => {
      return await axiosClient.delete(pathToUrl(API_STAFF_WITH_ID, { staffId }))
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'staffs', '/admin/staffs')
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
        .then(response => {
            defaultOnSuccessHandle(queryClient, navigate, response, 'staffs', '/admin/staffs')
        })
        .catch(error => {
          if (error.response.data.errorMessage) {
              enqueueSnackbar(error.response.data.errorMessage, {
                  autoHideDuration: 3000,
                  variant: 'error'
              }) 
          }
          else {
              enqueueSnackbar('Lỗi server.', {
                  autoHideDuration: 3000,
                  variant: 'error'
              })   
          }
        })
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