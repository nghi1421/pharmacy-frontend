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
import { defaultCatchErrorHandle, defaultOnSuccessHandle, updateSearchParams } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';
import { Query } from '../types/Query';
import { DataMetaResponse } from '../types/response/DataResponse';
import { handleAddress } from '../utils/address';

function createData({ id, name, gender, dob, address, phoneNumber, email }: Customer) {
    return {
      id, name, phoneNumber, email,
        address: handleAddress(address),
        gender: GenderEnum[gender],
        dob: !dob ? '_' : formatDate(dob),
    };
}

function createDataForAutocomplete({id, name, address, phoneNumber, email}: Customer) {
    return {
        id, label: name, phoneNumber, email, address: handleAddress(address),
    };
}

const useGetCustomers = (query: Query) => {
  const queryParams = updateSearchParams(query)

  return useQuery({
    queryKey: ['customers', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_CUSTOMER}?${queryParams.toString()}`)
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
          return {
              data: response.data.data.map((customer: Customer) => createData(customer)),
              meta: response.data.meta
          }
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })

        return undefined;
      }),
    enabled: !!queryParams.toString()
  })
};

const useGetDataCustomers = () => {
  return useQuery({
    queryKey: ['cusotmer'],
    queryFn: () => axiosClient
      .get(API_CUSTOMER)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((customer: Customer) => createDataForAutocomplete(customer))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
}

const useGetCustomer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (customerId: string) => axiosClient
      .get(pathToUrl(API_CUSTOMER_WITH_ID, { customerId }))
      .then((response) => {
        navigate( `/admin/${customerId}/edit`,
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
      defaultOnSuccessHandle(queryClient, navigate, response, 'customers', '/admin')
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
      defaultOnSuccessHandle(queryClient, navigate, response, 'customers', '/admin')
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
      defaultOnSuccessHandle(queryClient, navigate, response, 'customers', '/admin')
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