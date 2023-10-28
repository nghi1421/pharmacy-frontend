import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_CUSTOMER, API_CUSTOMER_WITH_ID} from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatDate } from '../utils/format';
import { Customer } from '../types/Customer';
import { GenderEnum } from '../types/GenderEnum';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../utils/path';
import { CustomerForm } from '../pages/customer/CreateCustomer';
import { CustomerEditForm } from '../pages/customer/EditCustomer';

function createData({id, name, gender, dob, phoneNumber, email}: Customer) {
    return {
        id, name, phoneNumber, email,
        gender: GenderEnum[gender],
        dob: !dob ? '_' : formatDate(dob),
    };
}

const useGetCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => axiosClient
      .get(API_CUSTOMER)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((customer: Customer) => createData(customer))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

const useGetCustomer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (customerId: string) => axiosClient
      .get(pathToUrl(API_CUSTOMER_WITH_ID, { customerId }))
      .then((response) => {
        navigate( `/customers/${customerId}/edit`,
          {
            state: { customerData: response.data.data }
          }
        )

        if (response.data.message) {
          return response.data.data
        }
        else {
          queryClient.invalidateQueries('customers', { refetchInactive: true })
        }
      }),
  })
}

const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CustomerForm) => {
      return await axiosClient.post(API_CUSTOMER, data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('customers', { refetchInactive: true })
        navigate('/customers')
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

const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CustomerEditForm) => {
      return await axiosClient.put(pathToUrl(API_CUSTOMER_WITH_ID, { customerId: data.id }), data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('customers', { refetchInactive: true })
        navigate('/customers')
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

const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customerId: string) => {
      return await axiosClient.delete(pathToUrl(API_CUSTOMER_WITH_ID, { customerId }))
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('customers', { refetchInactive: true })
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
  useGetCustomers,
  useGetCustomer,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
}