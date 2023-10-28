import { Staff } from "./Staff"
import { Provider } from "./Provider"

export type ImportType = {
    id: number
    importDate: string
    note: string
    staff: Staff
    provider: Provider
    maturityDate: string
    paid: string
    createdAt: string
    updatedAt: string
}