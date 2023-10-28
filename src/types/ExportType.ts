import { Customer } from "./Customer"
import { Staff } from "./Staff"

export type TypeExport = {
    id: number
    exportDate: string
    note: string
    prescriptionId: string
    staff: Staff
    customer: Customer
    createdAt: string
    updatedAt: string
}