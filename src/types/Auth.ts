import { User } from "./User"

export type Auth = {
    message: string
    data: User | null
    accessToken: string
    refreshToken: string
}