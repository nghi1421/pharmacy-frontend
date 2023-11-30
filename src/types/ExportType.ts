import { Customer, CustomerData } from "./Customer"
import { DrugCategory } from "./DrugCategory"
import { Staff } from "./Staff"

export type ExportType = {
    id: number
    exportDate: string
    note: string
    type: number
    prescriptionId: string
    staff: Staff
    customer: Customer
    createdAt: string
    updatedAt: string
}

export type ExportTodayType = {
    id: number
    exportDate: string
    note: string
    type: number
    staff: Staff
    customer: Customer
    total: number
}

export type ExportRawData = {
    id: number
    exportDate: string
    staff: Staff
    customer: Customer
    note: string
    prescriptionId: string
    totalPriceWithVat: number
    totalPrice: number
}

export type ExportDetailRawData = {
    drug: DrugCategory
    expiryDate: string
    price: number
    quantity: number
    unitPrice: number
    vat: number
    totalPrice: number
}

export type ExportData = {
    id: number
    note: string
    prescriptionId: string
    staff: Staff
    customer: CustomerData
    exportDate: string
    totalPrice: string
    totalPriceWithVat: string
    vat: string
}

export type ExportTodayData = {
    id: number
    note: string
    prescriptionId: string
    customer: CustomerData
    exportDate: string
    total: number
    totalWithVat: number
    vat: number
}

export type ExportDetailData = {
    drugId: number
    unit: string
    drugName: string
    price: string
    unitPrice: string
    quantity: string
    vat: string
    expiryDate: string
}

export type ExportDetailPdf = {
    drugName: string
    quantity: string
    unitPrice: string
    total: string
}

export type ExportPdfData = {
    exportData: ExportData
    exportDetail: ExportDetailPdf[]
}