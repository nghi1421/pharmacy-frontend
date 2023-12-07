import { ImportType } from "./ImportType"

export interface Inventory {
    drugId: number
    name: string
    minimalUnit: string
    inventory: number
    salesQuantity: number
    brokenQuantity: number
    importQuantity: number
    importSelling: ImportType
    expiryDateSelling: string
}