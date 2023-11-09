import { TypeByUse } from "./TypeByUse"

export type DrugCategory = {
    id: number
    name: string
    price: string
    form: string
    unit: string
    vat: number
    type: TypeByUse
    minimalUnit: string
    instruction: string
    preserved: string
    conversionQuantity: number
    createdAt: string
    updatedAt: string
}