import { useMutation } from "react-query";
import axiosClient from "../services/axios";
import { API_BACK_DRUG_CATEGORY, API_SEARCH_TROUBLE, API_TROUBLE } from "../utils/constants";
import { enqueueSnackbar } from "notistack";
import { BackDrugCategory, CreateTroubleForm, TroubleForm } from "../pages/trouble/TroublePage";
import { pathToUrl } from "../utils/path";
import { Provider } from "../types/Provider";
import { Customer } from "../types/Customer";
import { DrugCategory } from "../types/DrugCategory";
import { handleAddress } from "../utils/address";
import { formatDateTime, formatNumber } from "../utils/format";
import { AxiosResponse } from "axios";
import { defaultCatchErrorHandle } from "../utils/helper";

export type HistorySales = {
    exportId: number,
    customer: Customer,
    quantity: number,
    drug: DrugCategory,
    quantityBack: number | undefined,
    recoveryTime: string | undefined
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
        quantity: historySales.quantity,
        formatedQuantity: `${formatNumber(historySales.quantity)} ${historySales.drug.minimalUnit}`,
        quantityBack: historySales.quantityBack,
        formatedQuantityBack: `${formatNumber(historySales.quantityBack ?? 0)} ${historySales.drug.minimalUnit}`,
        recoveryTime: historySales.recoveryTime ? new Date(historySales.recoveryTime) : undefined,
        formatRecoveryTime: historySales.recoveryTime ? formatDateTime(historySales.recoveryTime) : undefined
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

                    if (data.trouble) {
                        return {
                            provider: createProviderData(data.provider),
                            historySales: data.historySales.map((historySales: HistorySales) => createHistorySalesData(historySales)),
                            inventoryImports: data.inventoryImport.map((inventoryImport: InventoryImport) => createInventoryImport(inventoryImport)),
                            drugCategory: data.drugCategory,
                            trouble: data.trouble
                        }
                    }
                    return {
                        provider: createProviderData(data.provider),
                        historySales: data.historySales.map((historySales: HistorySales) => createHistorySalesData(historySales)),
                        inventoryImports: data.inventoryImport.map((inventoryImport: InventoryImport) => createInventoryImport(inventoryImport)),
                        drugCategory: data.drugCategory
                    }
                }

                return response
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar(error.response.data.errorMessage, {
                    autoHideDuration: 3000,
                    variant: 'error'
                })
            }),
    })
};

const useCreateTrouble = () => {
    return useMutation({
        mutationFn: async (data: CreateTroubleForm) => {
            return await axiosClient.post(API_TROUBLE, data)
                .then((response): AxiosResponse<any, any> => {
                    if (response.data.message) {
                        enqueueSnackbar(response.data.message, {
                            autoHideDuration: 3000,
                            variant: 'success'
                        })
                        return response.data.data
                    }
                    return response
                })
                .catch(error => {
                    console.log(error);
                    defaultCatchErrorHandle(error)
                })
        },
    }
    )
}

const useBackDrugCategory = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            return await axiosClient.post(API_BACK_DRUG_CATEGORY, data)
                .then((response): AxiosResponse<any, any> => {
                    if (response.data.message) {
                        enqueueSnackbar(response.data.message, {
                            autoHideDuration: 3000,
                            variant: 'success'
                        })
                        return response.data.data
                    }
                    return response
                })
                .catch(error => {
                    console.log(error);
                    defaultCatchErrorHandle(error)
                })
        },
    }
    )
}


export {
    useBackDrugCategory,
    useSeachTrouble,
    useCreateTrouble
}