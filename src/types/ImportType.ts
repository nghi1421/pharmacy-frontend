import { Staff } from "./Staff"
import { Provider } from "./Provider"

export type ImportType = {
    id: number
    importDate: string
    note: string
    staff: Staff
    provider: Provider
    createdAt: string
    updatedAt: string
}