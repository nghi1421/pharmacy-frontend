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
import { defaultCatchErrorHandle, defaultOnSuccessHandle } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';

function createData({id, name, gender, dob, address,  phoneNumber, email}: Customer) {
    return {
        id, name, phoneNumber, email, address,
        gender: GenderEnum[gender],
        dob: !dob ? '_' : formatDate(dob),
    };
}

function createDataForAutocomplete({id, name, address, phoneNumber, email}: Customer) {
    return {
        id, label: name, phoneNumber, email, address,
    };
}

const useGetCustomers = (option: number = 1) => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => axiosClient
      .get(API_CUSTOMER)
      .then((response) => {
        if (response.data.message) {
          switch (option) {
            case 1: 
              return response.data.data.map((customer: Customer) => createData(customer))
            case 2: 
              return response.data.data.map((customer: Customer) => createDataForAutocomplete(customer))
            default: response.data.data
          }
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

const useGetDataCustomers = () => {
  return useQuery({
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
      }),
    select: (res) => res
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

const useCreateCustomer = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CustomerForm) => {
      return await axiosClient.post(API_CUSTOMER, data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'customers', '/customers')
    }
  })
}

const useUpdateCustomer = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CustomerEditForm) => {
      return await axiosClient.put(pathToUrl(API_CUSTOMER_WITH_ID, { customerId: data.id }), data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'customers', '/customers')
    }
  }) 
}

const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (customerId: string) => {
      return await axiosClient.delete(pathToUrl(API_CUSTOMER_WITH_ID, { customerId }))
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'customers', '/customers')
    }
  }) 
}

export {
  useGetCustomers,
  useGetDataCustomers,
  useGetCustomer,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
}