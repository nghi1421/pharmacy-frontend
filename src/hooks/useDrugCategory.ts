import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { DrugCategory } from '../types/DrugCategory';
import { API_DRUG_CATEGORY, API_DRUG_CATEGORY_WITH_ID } from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatCurrency } from '../utils/format';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../utils/path';
import { DrugCategoryEditForm } from '../pages/drug-category/EditDrugCategory';
import { DrugCategoryForm } from '../pages/drug-category/CreateDrugCategory';
import { defaultCatchErrorHandle, defaultOnSuccessHandle } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';

function createData({id, name, price, form, unit, vat, type, minimalUnit}: DrugCategory) {
    return {
        id, name, price, form, unit, minimalUnit,
        rawVat: vat,
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

const useGetDataDrugCategories = () => {
  return useQuery({
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
      }),
    select: (res) => res
  })
};

const useGetDrugCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (drugId: string) => axiosClient
      .get(pathToUrl(API_DRUG_CATEGORY_WITH_ID, { drugId }))
      .then((response) => {
        navigate( `/drug-categories/${drugId}/edit`,
          {
            state: { drugCategoryData: response.data.data }
          }
        )

        if (response.data.message) {
          return response.data.data
        }
        else {
          queryClient.invalidateQueries('drug-categories', { refetchInactive: true })
        }
      }),
  })
}

const useCreateDrugCategory = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: DrugCategoryForm) => {
      return await axiosClient.post(API_DRUG_CATEGORY, data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'drug-categories', '/drug-categories')
    }
  })
}

const useUpdateDrugCategory = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: DrugCategoryEditForm) => {
      return await axiosClient.put(pathToUrl(API_DRUG_CATEGORY_WITH_ID, { drugId: data.id }), data)
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error, setError)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'drug-categories', '/drug-categories')
    }
  }) 
}

const useDeleteDrugCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (drugId: string) => {
      return await axiosClient.delete(pathToUrl(API_DRUG_CATEGORY_WITH_ID, { drugId }))
        .then(response => response)
        .catch(error => {
          defaultCatchErrorHandle(error)
        }) 
    },
    onSuccess: (response: any) => {
      defaultOnSuccessHandle(queryClient, navigate, response, 'drug-categories', '/drug-categories')
    }
  }) 
}

export {
  useGetDrugCategories,
  useGetDataDrugCategories,
  useGetDrugCategory,
  useCreateDrugCategory,
  useUpdateDrugCategory,
  useDeleteDrugCategory
}