import { useQuery } from "react-query";
import { formatDateTime, formatNumber } from "../utils/format";
import axiosClient from "../services/axios";
import { DataMetaResponse } from "../types/response/DataResponse";
import { enqueueSnackbar } from "notistack";
import { updateSearchParams } from "../utils/helper";
import { API_INVENTORY } from "../utils/constants";
import { Inventory } from "../types/Inventory";
import { Query } from "../types/Query";

function createData({
    drugId,
    name,
    minimalUnit,
    inventory,
    salesQuantity,
    brokenQuantity,
    importQuantity,
    importSelling,
    expiryDateSelling
}: Inventory) {
    return {
        drugId: drugId,
        name: name,
        minimalUnit: minimalUnit,
        inventory: `${formatNumber(inventory)} ${minimalUnit}`,
        salesQuantity: `${formatNumber(salesQuantity)} ${minimalUnit}`,
        brokenQuantity: `${formatNumber(brokenQuantity)} ${minimalUnit}`,
        importQuantity: `${formatNumber(importQuantity)} ${minimalUnit}`,
        importId: `${importSelling.id}`,
        importDate: formatDateTime(importSelling.importDate),
        expiryDateSelling: expiryDateSelling
    };
}

const useInventories = (query: Query) => {
  const queryParams = updateSearchParams(query)
  return useQuery({
    queryKey: ['inventories', queryParams.toString()],
    queryFn: () => axiosClient
      .get(`${API_INVENTORY}?${queryParams.toString()}`)
      .then((response): DataMetaResponse | undefined => {
        if (response.data.message) {
          return {
            data: response.data.data.map((position: Inventory) => createData(position)),
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

export {
    useInventories
}