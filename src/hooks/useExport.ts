import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import {
  API_CANCEL_EXPORT,
  API_CREATE_CANCEL_EXPORT,
  API_EXPORT,
  API_EXPORT_TODAY,
  API_EXPORT_WITH_ID,
  API_REFUND_EXPORT_TODAY
} from '../utils/constants';
import {
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query';
import { formatCurrency, formatDate, formatNumber } from '../utils/format';
import {
  ExportRawData,
  ExportDetailRawData,
  ExportType,
  ExportData,
  ExportDetailData,
  ExportDetailPdf,
  ExportTodayType
} from '../types/ExportType';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../utils/path';
import { ExportForm } from '../pages/export/SalesExport';
import { defaultCatchErrorHandle, updateSearchParams } from '../utils/helper';
import { DataMetaResponse } from '../types/response/DataResponse';
import { Query } from '../types/Query';
import { handleAddress } from '../utils/address';
import { GenderEnum } from '../types/GenderEnum';
import globalEvent from '../utils/emitter';
import { AxiosResponse } from 'axios';
import { CancelExportForm } from '../pages/export/CancelExport';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { EditExportForm } from '../pages/export/EditSalesExport';

function createData({ id, exportDate, staff, customer, note, prescriptionId }: ExportType) {
  return {
    id, note, prescriptionId: prescriptionId ?? '_',
    customerName: customer ? customer.name : '_',
    staffName: staff.name,
    exportDate: formatDate(exportDate),
  };
}

function createDataExportToday({ id, exportDate, type, total }: ExportTodayType) {
  return {
    id,
    type,
    exportDate: dayjs(exportDate).format('HH:mm:ss'),
    total: formatCurrency(total)
  };
}

function createDataExport({
  id,
  exportDate,
  staff,
  customer,
  note,
  prescriptionId,
  totalPriceWithVat,
  totalPrice
}: ExportRawData): ExportData {
  return {
    id, note, prescriptionId,
    staff: { ...staff, address: handleAddress(staff.address) },
    customer: customer ? {
      ...customer,
      address: handleAddress(customer.address),
      gender: GenderEnum[customer.gender],
      rawAddress: customer.address
    } : null,
    exportDate: formatDate(exportDate),
    totalPrice: formatCurrency(totalPrice),
    totalPriceWithVat: formatCurrency(totalPriceWithVat),
    vat: formatCurrency(totalPriceWithVat - totalPrice)
  };
}

function createDataExportDetail({ drug, expiryDate, price, quantity, unitPrice, vat }: ExportDetailRawData): ExportDetailData {
  return {
    drugId: drug.id,
    unit: drug.minimalUnit,
    drugName: drug.name,
    price: formatCurrency(price),
    unitPrice: formatCurrency(unitPrice),
    quantity: formatNumber(quantity),
    vat: `${vat * 100}%`,
    expiryDate: formatDate(expiryDate),
  }
}

function createExportDetailPdf({ drug, unitPrice, quantity, totalPrice }: ExportDetailRawData): ExportDetailPdf {
  return {
    drugName: drug.name,
    quantity: `${formatNumber(quantity)} ${drug.minimalUnit}`,
    unitPrice: formatCurrency(unitPrice),
    total: formatCurrency(totalPrice),
  }
}

const useGetExports = (query: Query) => {
  const queryParams = updateSearchParams(query)

  return useQuery({
    queryKey: ['exports', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_EXPORT}?${queryParams.toString()}`)
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
          return {
            data: response.data.data.map((myExport: ExportType) => createData(myExport)),
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

const useGetExportsToday = () => {
  return useQuery({
    queryKey: ['exports-today'],
    queryFn: () => axiosClient
      .get(API_EXPORT_TODAY)
      .then((response) => {
        if (response.data.message) {
          const total = response.data.data.reduce((sum: number, item: any) => {
            return item.type === 1 ? sum + item.total : sum;
          }, 0)

          return {
            data: response.data.data.map((myExport: ExportTodayType) => createDataExportToday(myExport)),
            total: formatCurrency(total)
          }
        }
        return undefined
      }),
  })
};

const useGetExport = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (exportId: string) => axiosClient
      .get(pathToUrl(API_EXPORT_WITH_ID, { exportId }))
      .then((response) => {
        const handleExport = createDataExport(response.data.data.export)
        const handleExportDetail = response.data.data.exportDetail.map(
          (exportDetail: any) => createDataExportDetail(exportDetail))
        globalEvent.emit('close-sidebar')
        navigate(`/admin/exports/${exportId}/view`,
          {
            state: {
              exportData: {
                export: handleExport,
                exportDetail: handleExportDetail
              }
            }
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

const useGetExportToday = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (exportId: string) => axiosClient
      .get(pathToUrl(API_EXPORT_WITH_ID, { exportId }))
      .then((response) => {
        const handleExport = response.data.data.export
        const handleExportDetail = response.data.data.exportDetail

        navigate(`/sales/${exportId}/edit`,
          {
            state: {
              exportTodayIndex: {
                export: handleExport,
                exportDetail: handleExportDetail,

              }
            },
            replace: true
          },
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

const useCreateExport = (
  setExportData: (e: ExportData) => void,
  setExportDetailData: (e: ExportDetailPdf[]) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ExportForm) => {
      return await axiosClient.post(API_EXPORT, data)
        .then((response): AxiosResponse<any, any> => {
          return response
        })
        .catch(error => {
          console.log(error);
          defaultCatchErrorHandle(error)
        })
    },
    onSuccess: (response: any) => {
      console.log(response)
      if (response.data.message) {
        queryClient.invalidateQueries('drug-categories', { refetchInactive: true })
        queryClient.invalidateQueries('exports-today', { refetchInactive: true })
        const handleExport = createDataExport(response.data.data.export)
        const handleExportDetail = response.data.data.exportDetail.map(
          (exportDetail: ExportDetailRawData) => createExportDetailPdf(exportDetail))

        setExportData(handleExport)
        setExportDetailData(handleExportDetail)
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })
      }
      else {
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }
    }
  })
}

const useCreateCancelExport = (
  setExportData: (e: ExportData) => void,
  setExportDetailData: (e: ExportDetailPdf[]) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CancelExportForm) => {
      return await axiosClient.post(API_CREATE_CANCEL_EXPORT, data)
        .then((response): AxiosResponse<any, any> => {
          return response
        })
        .catch(error => {
          console.log(error);
          defaultCatchErrorHandle(error)
        })
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('drug-categories', { refetchInactive: true })
        const handleExport = createDataExport(response.data.data.export)
        const handleExportDetail = response.data.data.exportDetail.map(
          (exportDetail: ExportDetailRawData) => createExportDetailPdf(exportDetail))

        setExportData(handleExport)
        setExportDetailData(handleExportDetail)
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })
      }
      else {
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }
    }
  })
}

const useRefundExport = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { roleId } = useContext(AuthContext)
  return useMutation({
    mutationFn: async (exportId: string) => {
      return await axiosClient.post(pathToUrl(API_REFUND_EXPORT_TODAY, { exportId: exportId }))
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('exports-today', { refetchInactive: true })
        queryClient.invalidateQueries('drug-categories', { refetchInactive: true })
        navigate(roleId === 1 ? '/exports' : '/sales/create')
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })
      }
      else {
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }
    },
    onError: () => {
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  )
}

const useRefundAndCreateNewExport = (
  setExportData: (e: ExportData) => void,
  setExportDetailData: (e: ExportDetailPdf[]) => void
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { roleId } = useContext(AuthContext)
  return useMutation({
    mutationFn: async (data: EditExportForm) => {
      return await axiosClient.post(pathToUrl(API_EXPORT_WITH_ID, { exportId: data.id }), data)
    },
    onSuccess: (response: any) => {
      if (response.data.message) {
        queryClient.invalidateQueries('drug-categories', { refetchInactive: true })
        queryClient.invalidateQueries('exports-today', { refetchInactive: true })
        navigate(roleId === 1 ? '/exports' : '/sales/create')
        const handleExport = createDataExport(response.data.data.export)
        const handleExportDetail = response.data.data.exportDetail.map(
          (exportDetail: ExportDetailRawData) => createExportDetailPdf(exportDetail))
        setExportData(handleExport)
        setExportDetailData(handleExportDetail)
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: 'success'
        })
      }
      else {
        enqueueSnackbar(response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }
    },
    onError: () => {
      enqueueSnackbar('Lỗi server.',
        {
          autoHideDuration: 3000,
          variant: 'error'
        })
    }
  }
  )
}

export {
  useGetExports,
  useGetExport,
  useCreateExport,
  useRefundAndCreateNewExport,
  useGetExportsToday,
  useCreateCancelExport,
  useRefundExport,
  useGetExportToday
}