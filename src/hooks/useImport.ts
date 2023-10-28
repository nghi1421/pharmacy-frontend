import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_IMPORT, API_IMPORT_WITH_ID} from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatCurrency, formatDate } from '../utils/format';
import { ImportType } from '../types/ImportType';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../utils/path';

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

const useGetImports = () => {
  return useQuery({
    queryKey: ['imports'],
    queryFn: () => axiosClient
      .get(API_IMPORT)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((myImport: ImportType) => createData(myImport))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

const useGetImport = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (ImportId: string) => axiosClient
      .get(pathToUrl(API_IMPORT_WITH_ID, { ImportId }))
      .then((response) => {
        navigate( `/imports/${ImportId}/edit`,
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

// const useCreateImport = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: async (data: ImportForm) => {
//       return await axiosClient.post(API_IMPORT, data)
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
//       console.log(error)
//       enqueueSnackbar('Lỗi server.',
//         {
//           autoHideDuration: 3000,
//           variant: 'error'
//         })
//     }
//   }
//   )
// }

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
//       console.log(error)
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
//       console.log(error)
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
//   useCreateImport,
//   useUpdateImport,
//   useDeleteImport,
}