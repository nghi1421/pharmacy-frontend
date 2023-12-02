import { TypeByUse } from "./TypeByUse"

export type DrugCategory = {
    id: number
    name: string
    quantity: number;
    price: number
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

export type DrugCategoryHandled = {
    id: number
    name: string
    price: number
    form: string
    unit: string
    minimalUnit: string
    quantity: string
    rawQuantity: number
    rawVat: number
    vat: string
    use: string
    formatedPrice: string
}