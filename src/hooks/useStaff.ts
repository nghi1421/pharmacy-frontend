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

function createData({id, name, gender, dob, phoneNumber, email, isWorking}: Staff) {
    return {
        id, name, phoneNumber,
        gender: GenderEnum[gender],
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

const useGetStaff = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (staffId: string) => axiosClient
      .get(pathToUrl(API_STAFF_WITH_ID, { staffId }))
      .then((response) => {
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
      }),
  })
}

const useCreateStaff = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: StaffForm) => {
      return await axiosClient.post(API_STAFF, data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('staffs', { refetchInactive: true })
        navigate('/staffs')
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
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  )
}

const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: StaffEditForm) => {
      return await axiosClient.put(pathToUrl(API_STAFF_WITH_ID, { staffId: data.id }), data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('staffs', { refetchInactive: true })
        navigate('/staffs')
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
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  ) 
}

const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (staffId: string) => {
      return await axiosClient.delete(pathToUrl(API_STAFF_WITH_ID, { staffId }))
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('staffs', { refetchInactive: true })
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
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  ) 
}

const useUpdateStaffStatus = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: StaffEditForm) => {
      return await axiosClient.post(pathToUrl(API_STAFF_UPDATE_STATUS, { staffId: data.id }))
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('staffs', { refetchInactive: true })
        navigate('/staffs')
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
    },
    onError: (error: any) => {
      console.log(error)
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  ) 
}

export {
  useGetStaffs,
  useGetStaff,
  useUpdateStaffStatus,
  useCreateStaff,
  useUpdateStaff,
  useDeleteStaff,
}