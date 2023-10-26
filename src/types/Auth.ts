import { Role } from "./Role"
import { Staff } from "./Staff"

export type Auth = {
    message: string
    data: {
        id: number
        username: string
        staff: Staff
        role: Role
    }
    accessToken: string
}