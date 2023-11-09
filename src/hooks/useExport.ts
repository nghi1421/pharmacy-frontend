import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_EXPORT, API_EXPORT_WITH_ID} from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatDate } from '../utils/format';
import { ExportType } from '../types/ExportType';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../utils/path';

function createData({id, exportDate, staff, customer, note, prescriptionId}: ExportType) {
    return {
        id, note, prescriptionId,
        customerName: customer.name,
        staffName: staff.name,
        exportDate: formatDate(exportDate),
    };
}

const useGetExports = () => {
  return useQuery({
    queryKey: ['exports'],
    queryFn: () => axiosClient
      .get(API_EXPORT)
      .then((response) => {
        if (response.data.message) {
          return response.data.data.map((myExport: ExportType) => createData(myExport))
        }
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
        return []
      })
  })
};

const useGetExport = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (exportId: string) => axiosClient
      .get(pathToUrl(API_EXPORT_WITH_ID, { exportId }))
      .then((response) => {
        navigate( `/admin/exports/${exportId}/edit`,
          {
            state: { ExportData: response.data.data }
          }
        )

        if (response.data.message) {
          return response.data.data
        }
        else {
          queryClient.invalidateQueries('exports', { refetchInactive: true })
        }
      }),
  })
}

// const useCreateExport = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: async (data: ExportForm) => {
//       return await axiosClient.post(API_EXPORT, data)
//     },
//     onSuccess: (response: any) => {
//       if (response.data.message) {
//         queryClient.invalidateQueries('Exports', { refetchInactive: true })
//         navigate('/Exports')
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

// const useUpdateExport = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: async (data: ExportEditForm) => {
//       return await axiosClient.put(pathToUrl(API_EXPORT_WITH_ID, { exportId: data.id }), data)
//     },
//     onSuccess: (response: any) => {
//       if (response.data.message) {
//         queryClient.invalidateQueries('Exports', { refetchInactive: true })
//         navigate('/Exports')
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

// const useDeleteExport = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (exportId: string) => {
//       return await axiosClient.delete(pathToUrl(API_EXPORT_WITH_ID, { exportId }))
//     },
//     onSuccess: (response: any) => {
//       if (response.data.message) {
//         queryClient.invalidateQueries('Exports', { refetchInactive: true })
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
  useGetExports,
  useGetExport,
//   useCreateExport,
//   useUpdateExport,
//   useDeleteExport,
}