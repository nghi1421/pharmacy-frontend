import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_IMPORT, API_IMPORT_WITH_ID} from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatCurrency, formatDate } from '../utils/format';
import { ImportType } from '../types/ImportType';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../utils/path';
import { ImportForm } from '../pages/import/CreateImport';
import { defaultCatchErrorHandle, defaultOnSuccessHandle, updateSearchParams } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';
import { Query } from '../types/Query';
import { DataMetaResponse } from '../types/response/DataResponse';

function createData({id, importDate, staff, provider, note, paid, maturityDate}: ImportType) {
    return {
        id, note, 
        maturityDate: formatDate(maturityDate),
        paid: formatCurrency(parseFloat(paid)),
        providerName: provider.name,
        staffName: staff.name,
        importDate: formatDate(importDate),
    };
}

const useGetImports = (query: Query) => {
  const queryParams = updateSearchParams(query)

  return useQuery({
    queryKey: ['imports', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_IMPORT}?${queryParams.toString()}`)
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
          return {
            data: response.data.data.map((myImport: ImportType) => createData(myImport)),
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

const useGetImport = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (ImportId: string) => axiosClient
      .get(pathToUrl(API_IMPORT_WITH_ID, { ImportId }))
      .then((response) => {
        navigate( `/admin/imports/${ImportId}/edit`,
          {
            state: { ImportData: response.data.data }
          }
        )

        if (response.data.message) {
          return response.data.data
        }
        else {
          queryClient.invalidateQueries('imports', { refetchInactive: true })
        }
      }),
  })
}

const useCreateImport = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ImportForm) => {
      return await axiosClient.post(API_IMPORT, data)
          .then(response => response)
          .catch(error => {
            defaultCatchErrorHandle(error, setError)
          }) 
      },
    onSuccess: (response: any) => {
        queryClient.invalidateQueries('drug-categories', { refetchInactive: true })
        defaultOnSuccessHandle(queryClient, navigate, response, 'imports', '/admin/imports')
      }
    })
}

// const useUpdateImport = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: async (data: ImportEditForm) => {
//       return await axiosClient.put(pathToUrl(API_IMPORT_WITH_ID, { ImportId: data.id }), data)
//     },
//     onSuccess: (response: any) => {
//       if (response.data.message) {
//         queryClient.invalidateQueries('Imports', { refetchInactive: true })
//         navigate('/Imports')
//         enqueueSnackbar(response.data.message, {
//           autoHideDuration: 3000,
//           variant: 'success'
//         })  
//       }
//       else {
//           enqueueSnackbar(response.data.errorMessage, {
//             autoHideDuration: 3000,
//             variant: 'error'
//           }) 
//       }
//     },
//     onError: (error: any) => {
//       enqueueSnackbar('Lỗi server.',
//         {
//           autoHideDuration: 3000,
//           variant: 'error'
//         })
//     }
//   }
//   ) 
// }

// const useDeleteImport = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (ImportId: string) => {
//       return await axiosClient.delete(pathToUrl(API_IMPORT_WITH_ID, { ImportId }))
//     },
//     onSuccess: (response: any) => {
//       if (response.data.message) {
//         queryClient.invalidateQueries('Imports', { refetchInactive: true })
//         enqueueSnackbar(response.data.message, {
//           autoHideDuration: 3000,
//           variant: 'success'
//         })  
//       }
//       else {
//           enqueueSnackbar(response.data.errorMessage, {
//             autoHideDuration: 3000,
//             variant: 'error'
//           }) 
//       }
//     },
//     onError: (error: any) => {
//       enqueueSnackbar('Lỗi server.',
//         {
//           autoHideDuration: 3000,
//           variant: 'error'
//         })
//     }
//   }
//   ) 
// }

export {
  useGetImports,
  useGetImport,
  useCreateImport,
//   useUpdateImport,
//   useDeleteImport,
}