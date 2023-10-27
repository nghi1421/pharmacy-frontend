import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_CUSTOMER } from '../utils/constants';
import { useQuery } from 'react-query';
import { formatDate } from '../utils/format';
import { Customer } from '../types/Customer';
import { GenderEnum } from '../types/GenderEnum';

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

export {
    useGetCustomers
}