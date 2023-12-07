import { useMutation } from "react-query";
import axiosClient from "../services/axios";
import { API_SEARCH_TROUBLE } from "../utils/constants";
import { enqueueSnackbar } from "notistack";
import { TroubleForm } from "../pages/trouble/TroublePage";
import { pathToUrl } from "../utils/path";
import { Provider } from "../types/Provider";
import { Customer } from "../types/Customer";
import { DrugCategory } from "../types/DrugCategory";
import { handleAddress } from "../utils/address";
import { formatDateTime, formatNumber } from "../utils/format";

export type HistorySales = {
    exportId: number,
    customer: Customer,
    quantity: number,
    drug: DrugCategory,
}

type InventoryImport = {
    importId: number
    importDate: string,
    inventory: number
}

export interface DataResponse {
    provider: Provider
    historySales: HistorySales[]
    inventoryImport: InventoryImport[]
}

export interface HandledData {
    exportId: number
    name: string
    phoneNumber: string
    email: string
    address: string
    quantity: number
    formatedQuantity: string
}

const createHistorySalesData = (historySales: HistorySales) => {
    return {
        exportId: historySales.exportId,
        name: historySales.customer.name,
        phoneNumber: historySales.customer.phoneNumber,
        email: historySales.customer.email,
        address: handleAddress(historySales.customer.address),
        quantity: formatNumber(historySales.quantity),
        formatedQuantity: `${formatNumber(historySales.quantity)} ${historySales.drug.minimalUnit}`,
    }
}

const createInventoryImport = (inventoryImport: InventoryImport) => {
    return {
        importId: inventoryImport.importId,
        importDate: formatDateTime(inventoryImport.importDate),
        inventory: formatNumber(inventoryImport.inventory),
    }
}

const createProviderData = (provider: Provider) => {
    return {
        id: provider.id,
        name: provider.name,
        phoneNumber: provider.phoneNumber,
        email: provider.email,
        address: handleAddress(provider.address),
    }
}
const useSeachTrouble = () => {

  return useMutation({
    mutationFn: (data: TroubleForm) => axiosClient
      .get(pathToUrl(API_SEARCH_TROUBLE, { batchId: data.batchId, drugId: data.drugId }))
      .then((response) => {
        if (response.data.message) {
            enqueueSnackbar(response.data.message, {
                autoHideDuration: 3000,
                variant: 'success'
            })
            const data = response.data.data
            console.log(data);
            return {
                provider: createProviderData(data.provider),
                historySales: data.historySales.map((historySales: HistorySales) => createHistorySalesData(historySales)),
                inventoryImports: data.inventoryImport.map((inventoryImport: InventoryImport) => createInventoryImport(inventoryImport)),
            }
        }
       
        return response
      })
      .catch ((error) => {
          console.log(error);
         enqueueSnackbar(error.response.data.errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }),
  })
};

export {
    useSeachTrouble
}