import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { DrugCategory } from '../types/DrugCategory';
import { API_DRUG_CATEGORY } from '../utils/constants';
import { useQuery } from 'react-query';
import { formatCurrency } from '../utils/format';

function createData({id, name, price, form, unit, vat, type, minimalUnit}: DrugCategory) {
    return {
        id, name, price, form, unit, minimalUnit,
        vat: `${vat*100}%`,
        use: type.name,
        formatedPrice: formatCurrency(parseFloat(price))
    };
}

const useGetDrugCategories = () => {
  return useQuery({
    queryKey: ['drug-categories'],
    queryFn: () => axiosClient
      .get(API_DRUG_CATEGORY)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((drugCategory: DrugCategory) => createData(drugCategory))
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
    useGetDrugCategories
}