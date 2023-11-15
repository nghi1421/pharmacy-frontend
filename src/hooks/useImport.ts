import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_IMPORT, API_IMPORT_WITH_ID} from '../utils/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatCurrency, formatDate, formatNumber } from '../utils/format';
import { ImportType } from '../types/ImportType';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../utils/path';
import { ImportForm } from '../pages/import/CreateImport';
import { defaultCatchErrorHandle, defaultOnSuccessHandle, updateSearchParams } from '../utils/helper';
import { UseFormSetError } from 'react-hook-form';
import { Query } from '../types/Query';
import { DataMetaResponse } from '../types/response/DataResponse';
import { handleAddress } from '../utils/address';
import globalEvent from '../utils/emitter';

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

// @ts-ignore
function createDataImport({id, importDate, staff, provider, note, paid, maturityDate, totalPriceWithVat, totalPrice, vatValue}) {
    return {
        id, note,
        staff: {...staff, address: handleAddress(staff.address)},
        provider: {...provider, address: handleAddress(provider.address)},
        importDate: formatDate(importDate),
        maturityDate: formatDate(maturityDate),
        rawPaid: paid,
        rawMaturityDate: maturityDate,
        paid: formatCurrency(paid),
        totalPrice: formatCurrency(totalPrice),
        totalPriceWithVat: formatCurrency(totalPriceWithVat),
        vat: formatCurrency(vatValue)
    };
}

 // @ts-ignore
function createDataImportDetail({ drug, expiryDate, quantity, unitPrice, vat, batchId }) {
  return {
    drugId: drug.id,
    unit: drug.unit,
    drugName: drug.name,
    unitPrice: formatNumber(unitPrice),
    quantity: formatNumber(quantity),
    vat: `${vat * 100}%`,
    expiryDate: formatDate(expiryDate),
    batchId: batchId,
  }
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
    mutationFn: (importId: number) => axiosClient
      .get(pathToUrl(API_IMPORT_WITH_ID, { importId }))
      .then((response) => {
        const handleImport = createDataImport(response.data.data.import)
        const handleImportDetail = response.data.data.importDetail.map(
          (importDetail: any) => createDataImportDetail(importDetail))
        globalEvent.emit('close-sidebar')
        navigate( `/admin/imports/${importId}/view`,
          {
            state: {
              importData: {
                import: handleImport,
                importDetail: handleImportDetail
              }
            }
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