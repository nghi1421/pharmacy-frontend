import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_STAFF } from '../utils/constants';
import { useQuery } from 'react-query';
import { formatDate } from '../utils/format';
import { GenderEnum } from '../types/GenderEnum';
import { Staff } from '../types/Staff';

function createData({id, name, gender, dob, phoneNumber, email, isWorking}: Staff) {
    return {
        id, name, phoneNumber,
        gender: GenderEnum[gender],
        email,
        dob: formatDate(dob),
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

export {
    useGetStaffs
}